

//find movie link from each folder


import { data } from "./links.js"
const destFile="./real-link.js"

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
    
      const links = [];
     linkObjects.each((i, element) => {
                const rl=cheerioLoad(element).text().search("Server")
                const requiredLink=cheerioLoad(element).attr('href')
                if(rl>0){
                  if(requiredLink.search(".mp4")>1 || requiredLink.search(".mkv")>1){
                  const reso=cheerioLoad(element).text().split("(")[1].split(" ")[1].replace(")","")
                  const resolution= (reso.length==4) ? reso : "480p"
                  fs.appendFileSync(destFile,`{
                    text:"${text}", 
                    reso : "${resolution}",
                    href:"${requiredLink}"
                    },\n`)
                  }
                }
               
                     links.push({
                       text:cheerioLoad(element).text(), 
                      href:cheerioLoad(element).attr('href')
                       })
         });
   // console.log(links)
  } catch (e) {
    console.log(e)
  }
}


const fetchLinks = async () => {
    var i = 0
    console.log("findings links from inside each folder");
     fs.writeFileSync(destFile,"const data = [\n")
           //await extractLinks(data[0].text,data[0].href)
      
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