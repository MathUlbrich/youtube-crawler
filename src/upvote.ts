import * as z from 'zod';
import { executeUpdate } from './postgresql';

export const UpvoteResponse = z.object({
    upvoted: z.boolean(),
    updateAt: z.number(),
});

export type UpvoteResponse = z.infer<typeof UpvoteResponse>;

export const UpvoteAction = async (videoId: string): Promise<UpvoteResponse> => {
    await executeUpdate(async (client) => {
        const result = await client.query(`UPDATE YOUTUBE_VIDEO SET UPVOTE = (UPVOTE+1) WHERE ID = $1::text`, [videoId]);
        if (result.rowCount === 0) {
            await client.query(`INSERT INTO YOUTUBE_VIDEO(ID, UPVOTE) VALUES ($1::text, 1)`, [videoId]);
        }
    });
    return UpvoteResponse.parse({
        upvoted: true,
        updateAt: Date.now(),
    });
};