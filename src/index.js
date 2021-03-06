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
        res.send('Todos os campos são obrigatórios!').status(400);
    } else if (findUsername(user.username).length !== 0) {
        res.sendStatus(409);
    } else {
        users.push(user);
    }
    res.sendStatus(201);
})

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    if (tweet.username === undefined || tweet.tweet === undefined) {
        res.send('Todos os campos são obrigatórios!').status(400);
    } else if (findUsername(tweet.username).length === 0) {
        res.sendStatus(404);
    } else {
        tweets.push(tweet);
    }
    res.sendStatus(201); 
})

app.get('/tweets', (req, res) => {
    const lastTweets = [];
    let counter = 0;
    for (let i = (tweets.length - 1); i > -1; i--) {
        const user = findUsername(tweets[i].username);
        lastTweets.push(tweets[i]);
        lastTweets[counter].avatar = user[0].avatar;
        counter++;
    }
    res.send(lastTweets.slice(0,10))
})

app.get('/tweets/:username', (req, res) => {
    const givenUsername = req.params.username;
    const userTweets = tweets.filter((tweet) => {
        if (givenUsername === tweet.username) return tweet;
    })
    if (userTweets.length === 0) res.sendStatus(404);
    const finalUserTweets = [];
    let counter = 0;
    for (let i = 0; i < userTweets.length; i++) {
        const user = findUsername(userTweets[i].username);
        finalUserTweets.push(userTweets[i]);
        finalUserTweets[counter].avatar = user[0].avatar;
        counter++;
        console.log('to aqui')
    }
    
    res.send(finalUserTweets)
})

app.listen(5000);