import express from 'express';
import { GetFeedVideos } from './crawler';

const PORT = process.env.PORT || 3000;
const server = express();

server.use(express.static('public'));

server.get('/api/feed', async (req, res) => {
    res.json(await GetFeedVideos());
});

server.listen(PORT, () => {
    console.log(`Server started to listen at port ${PORT}`);
});
