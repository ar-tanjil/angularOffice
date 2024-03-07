// import { Injectable } from '@angular/core';
// import {  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs'; 
// import { LocalStorageService } from './storageService';
// import { JWTTokenService } from './jwtToken.service';



// @Injectable({
//   providedIn: 'root'
// })
// export class AuthorizeGuard {
//   constructor(private loginService: LoginService,
//               private authStorageService: LocalStorageService,
//               private jwtService: JWTTokenService) {
//   }
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {
//       if (this.jwtService.getUser()) {
//           if (this.jwtService.isTokenExpired()) {
//             this.
//           } else {
//             return true;
//           }
//       } else {
//         return new Promise((resolve) => {
//           this.loginService.signIncallBack().then((e) => {
//              resolve(true);
//           }).catch((e) => {
//             // Should Redirect Sign-In Page
//           });
//         });
//       }
//   }
// }