import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { LocalStorageService } from './storageService';

@Injectable({
    providedIn: "root"
})
export class JWTTokenService {

    jwtToken!: string;
    decodedToken!: { [key: string]: string };
    isLoggedIn: boolean = false;

    constructor(private store: LocalStorageService) {
        let token = this.store.get("token");
        if(token){
            this.setToken(token)
        }
    }

    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }

    removeToken(){
        this.jwtToken = "";
        this.isLoggedIn = false;
    }

    decodeToken() {
      if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
      }
    }


    getDecodeToken() {
      return jwtDecode(this.jwtToken);
    }

    getUser() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['sub'] : null;
    }

    getName(){
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['name'] : null;
    }

    getRole(){
        this.decodeToken();
        return this.decodedToken ? this.decodedToken['role']: null;
    }

    getId() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['id'] : null;
    }

    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['exp'] : null;
    }

    isTokenNonExpired(): boolean {
      const expiryTime: string | null = this.getExpiryTime();
      if (expiryTime) {
        return ((1000 * Number(expiryTime)) - (new Date()).getTime()) > 5000;
      } else {
        return false;
      }
    }

    loginCheck(token?: string){
        if(token == null){
            this.isLoggedIn = this.isTokenNonExpired();
            return;
        }
        this.setToken(token);
        this.isLoggedIn = this.isTokenNonExpired()
      }


    // my custom method;

    // customDecodeToken(token: string) {
    //     if (token) {
    //     this.decodedToken = jwtDecode(token);
    //     }
    //   }

    // customExpiryTime(token: string){
    //     this.customDecodeToken(token);
    //     return this.decodedToken ? this.decodedToken['exp'] : null;
    // }

    // customIsTokenExpired(token?: string): boolean {
    //         if(token == null){
    //             return false;
    //         }
    //     const expiryTime: string | null = this.customExpiryTime(token);
    //         console.log(1000 * Number(expiryTime) - new Date().getTime());
            
    
    //     if (expiryTime) {
    //       return ((1000 * Number(expiryTime)) - (new Date()).getTime()) > 0
    //     } else {
    //       return false;
    //     }
    //   }

   

}