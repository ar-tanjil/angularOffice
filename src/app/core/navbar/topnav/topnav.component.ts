import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {

  notification: number = 0;
  date: Date = new Date();

  @Output()
  sidenav = new EventEmitter<boolean>(); 

  @Input()
  sidenavValue!: boolean; 

  toggleSidenav(value: boolean){
    this.sidenav.emit(value);
    console.log(this.sidenav);
    
  }
}
