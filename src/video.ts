import * as z from 'zod';

export const Video = z.object({
    id: z.string().nullable().optional(),
    video: z.string().url().nullable(),
    thumbnail: z.string().url(),
});

export type Video = z.infer<typeof Video>;

export const parseBy = (e: Element[]): Video[] => {
    return e.map(record => ({
        id: record.getAttribute("href")?.split('v=')[1],
        video: record.getAttribute("href"),
        thumbnail: `http://i3.ytimg.com/vi/${record.getAttribute("href")?.split('v=')[1]}/maxresdefault.jpg`,
    }));
};
