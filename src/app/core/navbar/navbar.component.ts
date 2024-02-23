import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  date: Date = new Date();
  notification: number = 10;


  shouldRun = false;
  toggleSidenav(value: boolean) {
    this.shouldRun = value ? false : true;
  }


  sidenavClose(){
    if(this.shouldRun){
      this.shouldRun = false;
    }
  }

}
