//find movie link from each folder

//const destFile="./data/years.js"
//const destFile="./data/movie_name.js"
const destFile = "./data/movie_link.js";
const extraFile = "./data/extra.js";
import * as cheerio from "cheerio";
import * as fs from "fs";
//import {data} from "./data/years.js"
import { data } from "./data/movie_name.js";
const got = (...args) => import("got").then(({ default: got }) => got(...args));

var count = 0;
const extractLinks = async (obj) => {
  try {
    const response = await got(obj.href);
    const html = response.body;
    const $ = cheerio.load(html);
    const linkObjects = $("a");
    const sizeObj = $(".size");

    const links = [];
    linkObjects.each((index, element) => {
      if (![0, 1, 2, 3, 4, 5, 6].includes(index)) {
        const text = $(element).text();
        let reso = "";

        if (text.endsWith(".mp4") || text.endsWith(".mkv")) {
          if (text.includes("1080p")) {
            reso = "1080p";
          } else if (text.includes("720p")) {
            reso = "720p";
          } else if (text.includes("480p")) {
            reso = "480p";
          } else if (text.includes("360p")) {
            reso = "360p";
          } else {
            reso = "";
          }
          count++;
          const size = sizeObj.eq(index - 6)?.text() || "";
          console.log(count);
          fs.appendFileSync(
            destFile,
            `{
                      id:${count},
                       name:"${obj.name}", 
                      year:${obj.year},
                      resolution:"${reso}",
                      size:"${size}",
                      href:"${obj.href + $(element).attr("href")}"
                       },\n`
          );
        } else {
          fs.appendFileSync(
            extraFile,
            `{link:"${obj.href + $(element).attr("href")}"},\n`
          );
        }
      }
    });

    console.log("done : ", obj.year);
  } catch (error) {
    console.log("err " + error.response);
  }
};

var i = 0;
fs.writeFileSync(destFile, "const data = [\n");
fs.writeFileSync(extraFile, "const data = [\n");

const writeInFile = async () => {
  if (i >= data.length) {
    fs.appendFileSync(destFile, "]\n module.exports={data}");
    fs.appendFileSync(extraFile, "]\n module.exports={data}");
    return;
  }
  await extractLinks(data[i]);
  i++;
  writeInFile();
};

writeInFile();

/*
-----------------------------start-------------------
const extractLinks = async (url,i) => {
  //console.log("------loading------")
    try {
        const response = await got(url);
       // console.log("-----loaded-----")
        const html = response.body;
        const $ = cheerio.load(html);
        const linkObjects = $('a');
        const links = [];
         linkObjects.each((index, element) => {
                if(!([0,1,2,3,4,5,6].includes(index))){
                     fs.appendFileSync(destFile,`{
                       year:"${$(element).text().replace("/","")}", 
                      href:"${url +  $(element).attr('href')}"
                       },\n`)
               }
                
         });
    
        
        
        
        
        console.log("done")
     } catch (error) {
        console.log(error.response);
    }
};
const writeInFile=async()=>{
fs.writeFileSync(destFile,"const data = [\n")
await extractLinks("http://dl6.sermovie.xyz/Movie/")
fs.appendFileSync(destFile ,"]\n module.exports={data}")
}

//---------------------end----------------
*/

/*
//----------------------------------start-----------------------------
var count=0
const extractLinks = async (obj) => {
    try {
        const response = await got(obj.href);
        const html = response.body;
        const $ = cheerio.load(html);
        const linkObjects = $('a');
        const links = [];
         linkObjects.each((index, element) => {
                if(!([0,1,2,3,4,5,6].includes(index))){
                    count++
                    console.log(count)
                     fs.appendFileSync(destFile,`{
                      id:${count},
                       name:"${$(element).text().replaceAll("."," ").replace("/","")}", 
                      year:${obj.year},
                      href:"${obj.href +  $(element).attr('href')}"
                       },\n`)
               }
                
         });
        
        console.log("done : ",obj.year)
     } catch (error) {
        console.log(error.response);
    }
};


  
var i=0
fs.writeFileSync(destFile,"const data = [\n")

const writeInFile=async ()=>{
  if(i>=data.length){
    fs.appendFileSync(destFile ,"]\n module.exports={data}")
    return
  }
  await extractLinks(data[i])
  i++
  writeInFile()
}

writeInFile()
//-----------------end--------------------------
*/
