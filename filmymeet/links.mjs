




//find movie link from each folder


import { data } from "./data.js"
const destFile="./links.js"

import * as cheerio from 'cheerio';

const got = (...args) => import('got').then(({ default: got }) => got(...args));

import * as fs from 'fs';
var notAvailable =0;
var totalLinkFound=0

const extractLinks =async (text,url)=>{
  try {
    const response = await got(url);
     const html = response.body;
     const cheerioLoad = cheerio.load(html);
     const linkObjects = cheerioLoad('a');
    const requiredLink=cheerioLoad(linkObjects[13]).attr('href')
    fs.appendFileSync(destFile,`{
       text:"${text}", 
       href:"${requiredLink}"
      },\n`)
    
  } catch (e) {
    console.log(e)
  }
}


const fetchLinks = async () => {
    var i = 0
    console.log("findings links from inside each folder");
     fs.writeFileSync(destFile,"const data = [\n")
    await data.map(async (o) => {
        await extractLinks(o.text,o.href)
        i = i + 1
        if(i==data.length){
              fs.appendFileSync(destFile,"\n]\n module.exports={data}")
          console.log("links saved in links.js")
        }
    })
       
}
fetchLinks()
//fetchLinks()