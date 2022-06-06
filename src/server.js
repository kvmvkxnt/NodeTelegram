import express from 'express';
import fs from 'fs';
import path from 'path';
import fileUpload from 'express-fileupload';

import checkToken from './middlewares/checkToken.js';

import usersRouter from './routes/users.js';
import messagesRouter from './routes/messages.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json(), fileUpload({limits: {fileSize: 50 * 1024 * 1024}}), checkToken, usersRouter, messagesRouter);

app.get('/test', (_, res) => {
  res.status(200).json({
    status: 200,
    message: 'ok'
  })
});

app.use((error, req, res, _) => {
  console.log(error);

  if (error.status != 500) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message
    })
  }

  fs.appendFileSync(path.join(process.cwd(), 'src', 'log.txt'),
  `${req.url} ||| ${error.name} ||| ${new Date()} ||| ${error.status} ||| ${error.message}\n`)

  res.status(error.status).json({
    status: error.status,
    message: 'InternalServerError'
  });

  process.exit();
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
