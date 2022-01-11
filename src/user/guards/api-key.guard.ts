import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    console.log(authHeader);

    const ctx = GqlExecutionContext.create(context);
    console.log(ctx.getContext().req);
    return ctx.getContext().req;
  }
}
//we can return a sync(abservable) or async(promise) response
