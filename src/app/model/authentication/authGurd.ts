import { JWTTokenService } from './jwtToken.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalStorageService } from './storageService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private service: JWTTokenService,
     private router: Router,
     private tostr:ToastrService,
     private store: LocalStorageService) { }
  
  
  
//      canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
//         let token = this.store.get("token");

//     if (this.service.isTokenExpired(token)) {
//       if (route.url.length > 0) {
//         let menu = route.url[0].path;
//         if (menu == 'user') {
//           if (this.service.getrole() == 'admin') {
//             return true;
//           } else {
//             this.router.navigate(['']);
//               this.tostr.warning('You dont have access.')
//             return false;
//           }
//         }else{
//           return true;
//         }
//       } else {
//         return true;
//       }
//     }
//     else {
//       this.router.navigate(['login']);
//       return false;
//     }
//   }



canActivate(
    rotue: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
{
    let token = this.store.get("token");
    if(!token){
        this.router.navigate(['login']);
        return false;
    }
    
    if(this.service.isTokenExpired()){
        this.router.navigate(["login"])
        return false;
      
    }

    return true;
}

}