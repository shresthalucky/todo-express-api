import './env';
import express from 'express';
import ApiRouter from './api.routes';

const app = express();

app.use(express.json());
app.use('/api', ApiRouter);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`listening to http://${process.env.HOST}:${process.env.PORT}`);
});
