




//find movie link from each folder


import { data } from "./data.js"
const destFile="./links.js"

import * as cheerio from 'cheerio';

const got = (...args) => import('got').then(({ default: got }) => got(...args));

import * as fs from 'fs';
var notAvailable =0;
var totalLinkFound=0

const extractLinks = async (url, text) => {
  
    try {
        const response = await got(url);
        const html = response.body;

        // Using cheerio to extract <a> tags
        const $ = cheerio.load(html);


        const linkObjects = $('a');
        // this is a mass object, not an array
        const firstLink = $(linkObjects[0]).attr('href');
       
        console.log("excluded",firstLink,totalLinkFound)
        // Collect the "href" and "title" of each link and add them to an array
         
         //check amount of links in each folder
         links = [];
         linkObjects.each((index, element) => {
                if(index!=0){
                  totalLinkFound++;
                      fs.appendFileSync(destFile,`{
                       text:"${text}", 
                      href:"${url +  $(element).attr('href')}"
                       },\n`)
               }
                links.push({
                 text: $(element).text(), // get the text
                 href: $(element).attr('href'), // get the href attribute
              });
         });
     if(links.length==1){
        notAvailable++;
     }
        // collect only one link at index 1 in this case because i only need 2nd link
   } catch (error) {
        console.log(error.response);
    }
};



const fetchLinks = async () => {
    var i = 0
    console.log("findings links from inside each folder");
    await fs.writeFileSync(destFile,"const data = [\n")
    await data.map(async (o) => {
        await extractLinks(o.href, o.text)
        i = i + 1
       // console.log(i,data.length)
        if (data.length == i) {
            await fs.appendFileSync(destFile ,"]\n module.exports={data}")
            
           console.log("saved and exprted from links.js file with variable name  'data'")
           console.log("available : ",data.length - notAvailable)
           console.log("movie link not available : ",notAvailable)
           console.log("total links generated ( more than 1 link for single movie) : ",totalLinkFound)
           console.log("total movie : ",data.length)
        }
    })
}
fetchLinks()