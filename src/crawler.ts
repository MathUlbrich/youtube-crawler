import puppeteer from 'puppeteer';
import { parseBy, CrawlerResponse } from './model';

export const baseURL = "https://www.youtube.com";

export const GetFeedVideos = async (): Promise<CrawlerResponse> => {
    const selector = "ytd-rich-item-renderer #content #dismissible #thumbnail";
    const browser = await puppeteer.launch();
    const startedAt = Date.now();
    try {
        const page = await browser.newPage();
        await page.goto(baseURL);
        const parsed = await page.$$eval(selector, parseBy);
        parsed.forEach(p => p.video = (baseURL + p.video)); // must be done outside of parseBy because cannot be in $$eval context
        await page.screenshot({path: `./res/snapshot-${startedAt}.png`});
        return CrawlerResponse.parse({
            time: startedAt,
            results: parsed,
        });
    } finally {
        await browser.close();
    }
};