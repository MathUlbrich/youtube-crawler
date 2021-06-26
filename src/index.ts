import express from 'express';
import { GetFeedVideos } from './crawler';
import { UpvoteAction } from './upvote';

const PORT = process.env.PORT || 3000;
const server = express();

server.use(express.static('public'));

server.get('/api/feed', async (req, res) => {
    res.json(await GetFeedVideos());
});

server.put('/api/upvote/:id', async (req, res) => {
    res.json(await UpvoteAction(req.params.id));
});

server.listen(PORT, () => {
    console.log(`Server started to listen at port ${PORT}`);
});
