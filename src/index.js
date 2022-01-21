import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

let users = [];
let tweets = [];

function findUsername(givenUsername) {
    const user = users.filter((user) => {
        if (user.username === givenUsername) return user;
    })

    return user;
}

app.post('/sign-up', (req, res) => {
    const user = req.body;
    if (user.username === undefined || user.avatar === undefined) {
        res.sendStatus(400);
    } else if (findUsername(user.username).length !== 0) {
        res.sendStatus(409);
    } else {
        users.push(user);
    }
    res.send('OK');
})

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    if (tweet.username === undefined || tweet.tweet === undefined) {
        res.sendStatus(400);
    } else if (findUsername(tweet.username).length === 0) {
        res.sendStatus(404);
    } else {
        tweets.push(tweet);
    }
    res.send('OK'); 
})

app.listen(5000);