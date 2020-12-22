import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './schema';
import { customError } from './helpers';

const router = express.Router();

router.use(
  '/',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: customError
  })
);

export default router;
