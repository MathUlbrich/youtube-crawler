import puppeteer from 'puppeteer';
import { parseBy, Video } from './video';
import * as z from 'zod';

export const baseURL = "https://www.youtube.com";

export const CrawlerResponse = z.object({
    time: z.number().positive(),
    results: z.array(Video),
});

export type CrawlerResponse = z.infer<typeof CrawlerResponse>;

export const GetFeedVideos = async (): Promise<CrawlerResponse> => {
    const selector = "ytd-rich-item-renderer #content #dismissible #thumbnail";
    const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox', '--disable-setuid-sandbox'] });
    const startedAt = Date.now();
    try {
        const page = await browser.newPage();
        await page.goto(baseURL);
        const parsed = await page.$$eval(selector, parseBy);
        parsed.forEach(p => p.video = (baseURL + p.video)); // must be done outside of parseBy because baseURL is not in $$eval context
        await page.screenshot({path: `./res/snapshot-${startedAt}.png`});
        return CrawlerResponse.parse({
            time: startedAt,
            results: parsed,
        });
    } finally {
        await browser.close();
    }
};