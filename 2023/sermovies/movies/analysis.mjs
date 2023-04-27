import * as cheerio from "cheerio";
import * as fs from "fs";
import { data } from "./data/extra_movie_name_2.js";
const got = (...args) => import("got").then(({ default: got }) => got(...args));

const destFile = "./data/extra_movie_link.js";
const extraFile = "./data/extra_2.js";

var count = 5210;
const extractLinks = async (obj) => {
  try {
    const response = await got(obj.href);
    const html = response.body;
    const $ = cheerio.load(html);
    const linkObjects = $("a");
    const sizeObj = $(".size");

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
                      movieId:${obj.id},
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
            `{
              movieId:${obj.id},
              name:"${obj.name}",
              year:${obj.year},
              href:"${obj.href + $(element).attr("href")}"
            },\n`
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
