import { LocalStorageService } from './../../model/authentication/storageService';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDatasource } from 'src/app/model/authentication/auth.datasource';
import { AuthModel, JwtToken } from 'src/app/model/authentication/auth.model';
import { JWTTokenService } from 'src/app/model/authentication/jwtToken.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  authModel: AuthModel;

  constructor(
    private store: LocalStorageService,
    private jwtService: JWTTokenService,
    private authData: AuthenticationDatasource,
    private route: Router
    ){
      this.authModel = new AuthModel();
      store.remove("token");
  }



  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })


  proceedLogin(){

    if(this.loginForm.valid){
      Object.assign(this.authModel, this.loginForm.value);
      
      this.authData.proceedLogin(this.authModel).subscribe(tok => {
        let token: JwtToken = tok;
        if(token.token){
          this.store.set("token", token.token);
          this.jwtService.loginCheck(token.token);
          this.route.navigate(["dashboard"]);
        }
      } )
    }

  }

}
