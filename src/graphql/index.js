import express from 'express';
import { printSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './schema';
import { customError } from './helpers';

const router = express.Router();

router.get('/schema', (req, res, next) => {
  res.send(printSchema(schema));
});

router.use(
  '/',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: customError
  })
);

export default router;
