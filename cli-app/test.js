import * as cheerio from 'cheerio';
import axios from 'axios';

var args = process.argv;

console.log(args[2]);

let url = args[2];
let css = args[3]

try {
    axios.get(url).then((response) => {
        const $ = cheerio.load(response.data);
        const $css = $(`${css}`).text();
        console.log($css)
    })
} catch (error) {
    console.error(error);
}


