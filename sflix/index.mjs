


import * as cheerio from 'cheerio';

const got = (...args) => import('got').then(({ default: got }) => got(...args));
import * as fs from 'fs';
const destFile="./data.js"
const extractHome = async (url) => {
    try {
        console.log("loading...")
        const response = await got(url);
        const html = response.body;
        const cheerioHtml = cheerio.load(html);
       
       const linkObjects = cheerioHtml("#body > .container > section").find('img');

        const links = [];
        // fs.writeFileSync(destFile,"const data=[\n")
        linkObjects.each((i, element) => {
            const src=cheerioHtml(element).attr("src");
           const text= cheerioHtml(element).parent().attr("title")
           const href= "https://sflix.pro"+cheerioHtml(element).parent().attr('href')
           text.trim() && links.push({text,href,src})
            // fs.appendFileSync(destFile,`{
            //            text:"${text}", 
            //           href:"${href}",
            //           src:"${src}"
            //            },\n`)
        });
        // fs.appendFileSync(destFile,"\n]\n module.exports={data}")
       console.log(links);
    } catch (error) {
        console.log(error);
    }
};

const extractMovie = async (url) => {
    try {
        console.log("loading...")
        const response = await got(url);
        const html = response.body;
        const cheerioHtml = cheerio.load(html);
       
        const overview = cheerioHtml(".desc").text()
        const runtime = cheerioHtml(".meta > span+span+span").text()
        const releaseDate = cheerioHtml("[itemprop='dateCreated']").text()
        const linkObjects = cheerioHtml(".bl-2").find('img');
        const episodes = cheerioHtml(".groups .dropdown-menu").text();
        console.log(html);

        console.log(episodes);
        // console.log(releaseDate);
        const recom = [];
        // fs.writeFileSync(destFile,"const data=[\n")
        linkObjects.each((i, element) => {
            const src=cheerioHtml(element).attr("src");
           const text= cheerioHtml(element).parent().attr("title")
           const href= "https://sflix.pro"+cheerioHtml(element).parent().attr('href')
           text.trim() && recom.push({text,href,src})
            // fs.appendFileSync(destFile,`{
            //            text:"${text}", 
            //           href:"${href}",
            //           src:"${src}"
            //            },\n`)
        });
        // fs.appendFileSync(destFile,"\n]\n module.exports={data}")
       const obj={
        overview,runtime,releaseDate,recom
       }
    //    console.log(obj);
    } catch (error) {
        console.log(error);
    }
};

const request = require('request-promise');
const cheerio = require('cheerio');
const URL = "http://testing-ground.scraping.pro/login?mode=login"
const scrapeFormResponse = async () => {
 const options = {
 method: 'POST',
 url: URL,
 formData: {
 "usr": "a",
 "pwd": "a",
 }
 };
 try {
 const response = await request(options);
 const $ = cheerio.load(response);
 const msg = $('#case_login > h3').text()
 console.log(msg)
 } catch (error) {
 console.log(error)
 }
}
scrapeFormResponse()

// extractHome("https://sflix.pro/home")
// extractMovie("https://sflix.pro/series/the-boys-lx4rz/1-1")