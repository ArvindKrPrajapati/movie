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
