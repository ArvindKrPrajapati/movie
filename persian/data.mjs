//find folders where movie links resides

import * as cheerio from 'cheerio';
const got = (...args) => import('got').then(({ default: got }) => got(...args));
import * as fs from 'fs';
var index=0
var length=0
const extractLinks = async () => {
    if(index==url.length){
        fs.appendFileSync(destFile,"\n]\n module.exports={data}")
         console.log(length," links found successfully")
       return
    }

    
    try {
       console.log("finding all links")
        const response = await got(url[index]);
        const html = response.body;
        const $ = cheerio.load(html);
        const linkObjects = $('a');
        const firstLink = $(linkObjects[0]).attr('href');
       console.log("excluded",firstLink)
         const links = [];
         
         linkObjects.each((i, element) => {
                if(i!=0){
                     length++;
                      fs.appendFileSync(destFile,`{
                       text:"${$(element).text()}", 
                      href:"${url[index]+$(element).attr('href')}"
                       },\n`)
             }
         });
         index++;
         extractLinks()

        // collect only one link at index 1 in this case because i only need 2nd link
   } catch (error) {
        console.log(error);
    }
};








var url=[
   "https://ir2.papionvod.ir/Media/Movies/1933/",
   "https://ir2.papionvod.ir/Media/Movies/1951/",
   "https://ir2.papionvod.ir/Media/Movies/1980/",
   "https://ir2.papionvod.ir/Media/Movies/1996/",
   "https://ir2.papionvod.ir/Media/Movies/1997/",
   "https://ir2.papionvod.ir/Media/Movies/1998/",
   "https://ir2.papionvod.ir/Media/Movies/2000/",
   "https://ir2.papionvod.ir/Media/Movies/2001/",
   "https://ir2.papionvod.ir/Media/Movies/2002/",
   "https://ir2.papionvod.ir/Media/Movies/2003/",
   "https://ir2.papionvod.ir/Media/Movies/2004/",
   "https://ir2.papionvod.ir/Media/Movies/2005/",
   "https://ir2.papionvod.ir/Media/Movies/2006/",
   "https://ir2.papionvod.ir/Media/Movies/2007/",
   "https://ir2.papionvod.ir/Media/Movies/2008/",
   "https://ir2.papionvod.ir/Media/Movies/2009/",
   "https://ir2.papionvod.ir/Media/Movies/2010/",
   "https://ir2.papionvod.ir/Media/Movies/2011/",
   "https://ir2.papionvod.ir/Media/Movies/2012/",
   "https://ir2.papionvod.ir/Media/Movies/2013/",
   "https://ir2.papionvod.ir/Media/Movies/2014/",
   "https://ir2.papionvod.ir/Media/Movies/2015/",
   "https://ir2.papionvod.ir/Media/Movies/2016/",
   "https://ir2.papionvod.ir/Media/Movies/2017/",
   "https://ir2.papionvod.ir/Media/Movies/2018/",
   "https://ir2.papionvod.ir/Media/Movies/2019/",
   "https://ir2.papionvod.ir/Media/Movies/Dubbed/",
   "https://ir2.papionvod.ir/Media/Movies/New/",
   "https://ir2.papionvod.ir/Media/Movies/New2/",
   ]
const destFile="./data.js"
fs.writeFileSync(destFile,"const data=[\n")
extractLinks()


