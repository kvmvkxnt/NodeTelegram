import express from 'express';
import fs from 'fs';
import path from 'path';

import checkToken from './middlewares/checkToken.js';

import usersRouter from './routes/users.js';
import messagesRouter from './routes/messages.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json(), checkToken, usersRouter, messagesRouter);

app.use((error, req, res, _) => {
  if (error.status != 500) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message
    })
  }

  fs.appendFileSync(path.join(process.cwd(), 'src', 'log.txt'),
  `${req.url} ||| ${error.name} ||| ${Date.now()} ||| ${error.status} ||| ${error.message}\n`)

  res.status(error.status).json({
    status: error.status,
    message: 'InternalServerError'
  });

  process.exit();
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
