import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

let users = [];
let tweets = [];

app.post('/sign-up', (req, res) => {
    const user = req.body;
    if (user.username === undefined || user.avatar === undefined) {
        res.sendStatus(400);
    } else {
        users.push(user);
    }
    res.send('OK');
})


app.listen(5000);