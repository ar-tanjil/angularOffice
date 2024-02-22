import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {

  notification: number = 0;
  date: Date = new Date();

  @Output("sidenavInput")
  sidenav = new EventEmitter<boolean>(); 

  @Input("sidenavOutput")
  sidenavValue!: boolean; 

  toggleSidenav(value: boolean){
    this.sidenav.emit(value);
  }
}
