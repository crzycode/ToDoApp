import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
Switch:boolean =false
/**
 *
 */
constructor(private router:Router,private App:AppService) {
 
  
}
  SwitchDrawer(Switch:boolean){
    this.Switch = Switch
  }
  Logout(){
    localStorage.removeItem('user_id')
    this.App.AddTaskButton.next("update")
    this.router.navigate(['login'])
   
    
  
  }
  Navigate(nav:any){
    this.Switch = false
    this.router.navigate([nav])
  }
  OpenCalendar(){
    this.App.OpenCalendar.next("update")
  }
}
