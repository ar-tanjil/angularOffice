import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./storageService";

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor( private storageService: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.storageService.get("token");
    if(!token){
        return next.handle(req);
    }
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req);
  }
}