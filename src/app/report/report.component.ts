import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  Data:any[]=[]
  constructor(private App:AppService,private router:Router) {
  
    
  }
  ngOnInit(): void {
    this.App.GetFinishTask(localStorage.getItem('user_id')).subscribe({
      next:(res:any) =>{
        console.log(res)
        if(res.code == 200){
          this.Data = res.data.tasklist
        }
      }
    })
  }
  Logout(){
    localStorage.removeItem('user_id')
    this.App.AddTaskButton.next("update")
    this.router.navigate(['login'])
  
  
  }
  Navigate(nav:any){
    this.router.navigate([nav])
  }
}
