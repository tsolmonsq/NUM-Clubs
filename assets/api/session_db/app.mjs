import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


import clubs from './routes/clubs.mjs';
import user from './routes/users.mjs';
import comment from './routes/comments.mjs';


const app = express();
const port = 3000;
const __dirname = path.resolve(path.dirname(''));
const options = {
    root: path.join(__dirname)
};

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(express.static('assets'));


app.get('/', (req, res) => {
    res.sendFile('./index.html', options);
});

//Buh clubuudiin medeelliig avah
app.get('/clubs', async (req, res) => {
  await clubs.getClubs(req, res);
});

app.get('/numclubs', async(req, res) => {
  res.sendFile('./clubs.html', options);
})

//Clubiig id-aar ni avah
app.get('/clubs/:id', async(req, res) => {
    await clubs.getClubById(req, res);
});

app.get('/aboutclub', async(req, res) => {
  res.sendFile('./about_club.html', options);
})

app.get('/likedclubs', async(req, res) => {
  res.sendFile('./liked_clubs.html', options);
})

app.get('/events', async(req, res) => {
  res.sendFile('./events.html', options);
})

//Burtguuleh
app.post('/signup', async (req, res) => {
  await user.signup(req, res);
})

app.get('/signuppage', async(req, res) => {
  res.sendFile('./sign-up.html', options);
})

//Newtreh
app.post('/login', cors(), async (req, res) => {
  try {
      await user.verifyLogin(req, res);
  } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Garah
app.get('/logout', (req, res) => { 
  user.sessions.delete(Number(req.cookies.session_id));
  res.status(200).send();
});

//Comment Bichih
app.post('/writecomment', async(req, res) => {
  await comment.writeComment(req, res);
});


//Clubiin id-aar commentuudiin jagsaaltiig avah
app.get('/comments/:id', async(req, res) =>{
  await comment.getCommentsByClubId(req, res);
})

app.listen(port, () => console.log(`App listening on port http://localhost:${port}`));
