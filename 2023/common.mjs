import * as cheerio from "cheerio";
import * as fs from "fs";
const got = (...args) => import("got").then(({
    default: got
    }) => got(...args));


    export const getCheerio = async (url)=> {
        console.log("--------loading---------")
        const response = await got(url);
        const html = response.body;
        return cheerio.load(html);
    }

    export const extractLinks = ($, skip = [], url = "")=> {
        const linkObjects = $("a");
        const links = [];
        linkObjects.each((index, element) => {
            if (!(skip.includes(index))) {
                links.push({
                    text: $(element).text(), // get the text
                    href: url+$(element).attr('href'), // get the href attribute
                });
            }
        })
        return {length:links.length,links}
    }

export function extractLinksUsingClass($,className, skip=[],url="") {
  const divs = $("div." + className); // Assuming $ is a valid reference to the Cheerio object
  const links = [];
  divs.each((i, div) => {
    if(!skip.includes(i)){
    const anchorTags = $(div).find("a");
      if (anchorTags.length > 0) {
      const selectedTag=anchorTags.first()
      links.push({
               text: selectedTag.text(), 
               href:url+selectedTag.attr("href"), 
            });
      }
    }
  });

  return links;
}




export const exportAsCsv = (data,file) => {
  data = JSON.stringify(data);
  fs.writeFileSync("./data/"+file, data);
  console.log("exported in "+file);
};


    export const extractInfo = ($, classNsme, skip, separator, imgIndex, imgUrl)=> {
        let obj = {}
        if (imgIndex >= 0) {
            obj["img"] = imgUrl+$("img").eq(imgIndex).attr("src")
        }
        const description = $(".description")
        description.each((index, element)=> {
            if (!(skip.includes(index))) {
                const text = $(element).text().split(separator)
                obj[text[0].replaceAll(" ","_")]=text[1].trim()
            }
        })
        return obj
    }
    
    
export function extractSermoviesLink($, skip_array = [], url = "") {
  const data = [];

  const rows = $("tr");
  rows.each((i, row) => {
    if (skip_array.includes(i)) {
      return;
    }

    const td_elements = $(row).find("td");

    const row_data = {};
    td_elements.each((index, td) => {
      const class_name = $(td).attr("class");
const text = $(td).text().trim();
      if (class_name) {
        row_data[class_name] = text;
      } else {
        row_data["value"] = text;
      }

        const a_tag = $(td).find("a");
        if (a_tag.length > 0) {
          const href = $(a_tag).attr("href");
          if (href) {
            const text = $(a_tag).text().trim();
            row_data["text"] = text;
            row_data["link"] = url + href;
          }
        }
    
    });

    data.push(row_data);
  });
  return data;
}
