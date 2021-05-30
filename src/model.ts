import * as z from 'zod';

export const Video = z.object({
    video: z.string().url().nullable(),
    thumbnail: z.string().url(),
});

export const CrawlerResponse = z.object({
    time: z.number().positive(),
    results: z.array(Video),
});

export type Video = z.infer<typeof Video>;
export type CrawlerResponse = z.infer<typeof CrawlerResponse>;

export const parseBy = (e: Element[]): Video[] => {
    return e.map(record => ({
        video: record.getAttribute("href"),
        thumbnail: `http://i3.ytimg.com/vi/${record.getAttribute("href")?.split('v=')[1]}/maxresdefault.jpg`,
    }));
};
