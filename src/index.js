import './env';
import cors from 'cors';
import express from 'express';

import GraphqlRouter from './graphql';
import ApiRouter from './api.routes';
import { handleError, handleNotFound } from './middlewares/error.middleware';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', ApiRouter);

app.use('/graphql', GraphqlRouter);

app.use(handleError, handleNotFound);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`listening to http://${process.env.HOST}:${process.env.PORT}`);
});
