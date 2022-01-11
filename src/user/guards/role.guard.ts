// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   Inject,
//   forwardRef,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UsersService } from '../user.service';
// import { Observable } from 'rxjs';
// import { User } from '../user.schema';
// import { map } from 'rxjs/operators';
// import { hasRoles } from '../decorators/roles.decorator';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,

//     @Inject(forwardRef(() => UsersService))
//     private userService: UsersService,
//   ) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const user = request.user.is_admin;
//     console.log();

//     return this.userService.findOne(user.id).pipe(
//       map((user: User) => {
//         const hasRole = () => roles.indexOf(user.role) > -1;
//         let hasPermission: boolean = false;

//         if (hasRole()) {
//           hasPermission = true;
//         }
//         return user && hasPermission;
//       }),
//     );
//   }
// }
