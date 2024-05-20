import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from '../notification/notification.component';
import { auto } from '@popperjs/core';
import { LocalStorageService } from 'src/app/model/authentication/storageService';
import { Router } from '@angular/router';
import { JWTTokenService } from 'src/app/model/authentication/jwtToken.service';
import { NotificationService } from 'src/app/model/notification/notification.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  
  date: Date = new Date();

  constructor(
    private dialog: MatDialog, 
    private jwtService: JWTTokenService,
    private store: LocalStorageService,
    private route: Router,
    private notifyService: NotificationService
    ){


  }


  ngOnInit(): void {
      this.getRoleAndUser();
  }

  get notification(): number{
    return this.notifyService.notification.length;
  }

  user: string = "";
  role: string = "";
  getRoleAndUser(){
    this.user = this.jwtService.getUser() ?? "";
    this.role = this.jwtService.getRole() ?? "";
  }





  @Output()
  sidenav = new EventEmitter<boolean>(); 

  @Input()
  sidenavValue!: boolean; 

  toggleSidenav(value: boolean){
    this.sidenav.emit(value);
    console.log(this.sidenav);
    
  }


  logOut(){
    this.store.remove("token");
    this.jwtService.removeToken();
    this.route.navigate(['login']);
  }


  openDialog() {
    let addSalaryDialog = this.dialog.open(NotificationComponent, {
      height: auto,
      width: auto,
      data: {
        id: null
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
      console.log(ob);
      
    })
  }

}
