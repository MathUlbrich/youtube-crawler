import bodyParser from 'body-parser';
import express from 'express';
import { GetFeedVideos } from './crawler';
import { UpvoteAction } from './upvote';

const PORT = process.env.PORT || 3000;
const server = express();

server.use(express.static('public'));
server.use(bodyParser.json());

server.get('/api/feed', async (req, res) => {
    res.json(await GetFeedVideos());
});

server.put('/api/upvote/:id', async (req, res) => {
    res.json(await UpvoteAction(req.params.id));
});

server.post('/fraudhub/friction', (req, res) => {
    res.status(401).json(req.body);
});

server.post('/fraudhub/denial', (req, res) => {
    res.status(403).json(req.body);
});

server.post('/fraudhub/invalid', (req, res) => {
    res.status(422).json(req.body);
});

server.listen(PORT, () => {
    console.log(`Server started to listen at port ${PORT}`);
});
