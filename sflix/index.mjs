
import * as cheerio from 'cheerio';
const got = (...args) => import('got').then(({ default: got }) => got(...args));
const extractLinks = async (url) => {
    try {
        console.log("loading...")
        const response = await got(url);
        const html = response.body;
        const cheerioHtml = cheerio.load(html);
        const linkObjects = cheerioHtml('a');
        const links = [];

        linkObjects.each((i, element) => {
            links.push(
            {
                text: cheerioHtml(element).text(),
                href: cheerioHtml(element).attr('href')
            })
        });
        console.log(links);
        //      index++;
        //      extractLinks()

        // collect only one link at index 1 in this case because i only need 2nd link
    } catch (error) {
        console.log(error);
    }
};

extractLinks("https://sflix.pro/home")