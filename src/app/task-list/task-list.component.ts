import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  Data: any[] = [];
  constructor(private App: AppService,private router:Router) {}
  ngOnInit(): void {
    this.App.GetTask(localStorage.getItem('user_id')).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.code == 200) {
          this.Data = res.data.tasklist;
        }
      },
    });
    this.App.UpdateTask.subscribe((res) => {
      this.App.GetTask(localStorage.getItem('user_id')).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.code == 200) {
            this.Data = res.data.tasklist;
          }
        },
      });
    });
  }
  FinishTask(task_id: any) {
    var obj: any = {
      User_id: localStorage.getItem('user_id'),
      Task_id: task_id,
    };
    this.App.FinishTask(obj).subscribe({
      next:(res:any) =>{
        if(res.code == 200){
          this.App.UpdateTask.next("update")
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
