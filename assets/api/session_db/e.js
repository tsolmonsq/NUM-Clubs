import path from 'path';
import express from 'express';
import cors from 'cors';

import clubs from './routes/clubs.mjs';
import users from './routes/users.mjs';

const app = express();
const port = 3000;
const __dirname = path.resolve(path.dirname(''));
const options = {
    root: path.join(__dirname)
};

app.use(express.json());
app.use(cors());

app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.sendFile('./index.html', options);
});

app.get('/login', (req, res) => {
    res.sendFile('./login.html', options);
});

app.get('/about_club', (req, res) => {
    res.sendFile('./about_club.html', options);
});

app.get('/liked_clubs', (req, res) => {
    res.sendFile('./liked_clubs.html', options);
});

app.get('/events', (req, res) => {
    res.sendFile('./events.html', options);
});

// app.post('/login', (req, res)=> user.verifyLogin(req, res));

app.get('/num_clubs/', (req, res) => {
    res.sendFile('./clubs.html', options);
});

app.get('/clubs/', async (req, res) => await clubs.getClubs(req, res));

app.get('/num_clubs/:id', async(req, res) => {
    await clubs.getClubById(req, res);
});

app.get('/users', async (req, res) => await users.getUsers(req, res));

app.get('/users/:id', async(req, res) => {
    await users.getUserById(req, res);
});

app.listen(port, () => console.log(`App listening on port http://localhost:${port})`);