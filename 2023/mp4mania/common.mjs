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
        links = [];
        linkObjects.each((index, element) => {
            if (!(skip.includes(index))) {
                links.push({
                    text: $(element).text(), // get the text
                    href: url+$(element).attr('href'), // get the href attribute
                });
            }
        })
        return link
    }

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