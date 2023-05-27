import {
    getCheerio,
    extractInfo
} from "./common.mjs"

var data=[]
const getMovies = async(id)=> {
    console.log("counter : ",id)
    const url = "https://hdmp4mania2.com/showmovie.php?id="+id
    const $ = await getCheerio(url)
    const skip = [0,
        4,
        5]
    const info = extractInfo($, "description", skip, ":", 3, "http:")
    if (info["Title"]) {
        const cat = info["Category"].replaceAll(" ", "%20")
        const name = info["Title"].replaceAll(" ", "%20")
        info["id"] = id
        if (Number(info["Total_Part(s)"]) > 1) {
            const encoded_url_one = "http://hd1.dlmania.com/"+cat+"/"+name+"/"+name+"%20HD%201.mp4"
            const encoded_url_two = "http://hd1.dlmania.com/"+cat+"/"+name+"/"+name+"%20HD%202.mp4"
            info["url_one"] = encoded_url_one
            info["url_two"] = encoded_url_two
        } else {
            const encoded_url = "http://hd1.dlmania.com/"+cat+"/"+name+"/"+name+"%20HD%20(HDMp4Mania).mp4"
            info["url_one"] = encoded_url
        }
        data.push(info)
    }else{
    console.log("movie not found")
    return
    }
}
getCheerio("https://www.filmywap.com/download/14351/server_4")
.then((data)=>{
    console.log(data)
})
.catch(e=>{
    console.log(e)
})
/*
import * as cheerio from "cheerio";
import * as fs from "fs";
const got = (...args) => import("got").then(({ default: got }) => got(...args));

// ==============extract link fn=========================
var count = 0;
const extractLinks = async (url, page, cat) => {
  try {
    const response = await got(url + page);
    const html = response.body;
    const $ = cheerio.load(html);
    const linkObjects = $("a");

    linkObjects.each((index, element) => {
      const href = $(element).attr("href");
      if (href.includes(".php?id")) {
        count++;
        const name = $(element).text();
        console.log("done : ", count, " page: ", page);
        const l = name.replaceAll(" ", "%20");
        const href = `http://hd1.dlmania.com/${cat}/${l}/${l}%20HD%20(HDMp4Mania).mp4`;
        fs.appendFileSync(
          destFile,
          `{
              count:${count},
              name:"${name}",
              href:"${href}"
           },\n`
        );
      }
    });
  } catch (error) {
    console.log("err " + error.response);
  }
};
// ====================end================================
const cat_no = 3;
const url = "https://hdmp4mania2.com/showcat.php?catid=" + cat_no + "&page=";
const last = 71;
const cat = "Hollywood%20(Hindi%20Dubbed)";
const destFile = "./data/hindi_hollywood.js";
var i = 0;

fs.writeFileSync(destFile, "const data = [\n");

const writeInFile = async () => {
  if (i >= last) {
    fs.appendFileSync(destFile, "]\n module.exports={data}");
    return;
  }
  i++;
  await extractLinks(url, i, cat);
  writeInFile();
};

writeInFile();
*/