import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    console.log('in user decorator');
    console.log(GqlExecutionContext.create(context).getContext().req);
    console.log(GqlExecutionContext.create(context).getContext().req.user);

    const { _id, email, is_admin } =
      GqlExecutionContext.create(context).getContext().req.user;

    return {
      _id,
      email,
      is_admin,
    };
  },
);
