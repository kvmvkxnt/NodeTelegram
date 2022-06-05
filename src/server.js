import express from 'express';

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api', (req, res) => {
  res.status(200).send('ok');
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

