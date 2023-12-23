import path from 'path';
import express from 'express';
import cors from 'cors';

import clubs from './routes/clubs.mjs';

const app = express();
const port = 3000;
const __dirname = path.resolve(path.dirname(''));
const options = {
    root: path.join(__dirname)
};

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'clubs.html'), options);
});

app.get('/clubs', async (req, res) => await clubs.getClubs(req, res));

app.get('/clubs/:id', async(req, res) => {
    await clubs.getClubById(req, res);
});

app.listen(port, () => console.log(`App listening on port http://localhost:${port}`));
