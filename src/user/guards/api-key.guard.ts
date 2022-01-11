import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  //   getRequest(context: ExecutionContext) {
  //     const request = context.switchToHttp().getRequest();
  //     console.log(request);
  //   }
}
