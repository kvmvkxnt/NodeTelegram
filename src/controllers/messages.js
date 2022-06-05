import { read, write } from '../utils/model.js';
import { InternalServerError } from '../utils/errors.js';

const GET = (req, res, next) => {
  try {
    let messages = read('messages');
    let users = read('users');

    messages = messages.map(message => {
      message.user = users.find(user => user.userId == message.userId);

      delete message.userId;
      delete message.user.password;
      return message;
    });

    res.status(200).send(messages);

  } catch (e) { 
    return next(new InternalServerError(500, e.message));
  }
}

const SEND = (req, res, next) => {
  try {
    let { body, userId } = req.params;
    let messages = read('messages');
    let users = read('users');

    const newMessage = {
      messageId: messages.length ? messages.at(-1).messageId + 1 : 1,
      body: body,
      userId: userId
    };

    write('messages', newMessage);

    newMessage.user = users.find(user => user.userId == message.userId);
    delete newMessage.userId;
    delete newMessage.user.password;

    res.status(200).json({
      status: 200,
      message: 'ok',
      data: newMessage
    });

  } catch (e) {
    return next(new InternalServerError(500, e.message));
  }
}

export default {
  GET,
  SEND
}
