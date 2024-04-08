import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from './app.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Todo-app';
  Switch:boolean = false
  TaskForm!:FormGroup
  MessageSwitch:boolean = false
  Message:any
  Code:any;
  AddTaskIsActive:boolean = false
  IsCalendar:boolean = false
  selected: any= new Date();
  AddTaskstyle:any ={
    height:'45%',
    width:'90%',
    'border-radius':'5px',
    'background':'white',
    'padding':'10px',
    'max-width':'600px'
  }

  constructor(private fb:FormBuilder,private App:AppService,private datePipe: DatePipe) {

    
  }
  ngOnInit(): void {
    if(localStorage.getItem('user_id')){
      this.AddTaskIsActive = true
    }
    this.App.AddTaskButton.subscribe(res =>{
      if(localStorage.getItem('user_id')){
        this.AddTaskIsActive = true
      }else{
        this.AddTaskIsActive = false
      }
    })
    this.App.OpenCalendar.subscribe(res =>{
      this.IsCalendar = true
    })
    this.TaskForm = this.fb.group({
      User_id:[''],
      Date:[this.datePipe.transform(new Date(), 'd MMMM y')],
      Task:['']
    })
    this.App.Message.subscribe(res =>{
      if(res.code == 200){
        this.MessageSwitch = true
        setTimeout(() => {
          this.MessageSwitch = false
        }, 3000);
        this.Code = res.code
          this.Message = res.message;
      }else{
        this.MessageSwitch = true
        setTimeout(() => {
          this.MessageSwitch = false
        }, 3000);
        this.Code = res.code
        this.Message = res.message;
      }
    })
  }
    AddTask(){
      this.Switch = true
    }
    ClosePopup(event:any,type:any){
      
      if(type == "task"){
        this.Switch = false
      }
      if(type == "calendar"){
        this.IsCalendar = false
      }
    }
    Selecteddate(event:any) {
      this.IsCalendar = false
      this.TaskForm.controls['Date'].setValue(this.datePipe.transform(event, 'd MMMM y'))
      }
    SubmitTask(){
      var obj:any ={
        code:'',
        message:''
      }
      this.TaskForm.controls['User_id'].setValue(localStorage.getItem('user_id'))

     this.App.Addtask(this.TaskForm.value).subscribe({
      next:(res:any) =>{
        console.log(res)
        if(res.code == 200){
            obj.code = res.code
            obj.message = res.message
            this.App.Message.next(obj)
            this.Switch = false
            this.TaskForm.reset();
            this.App.UpdateTask.next("update")
        }else{
          obj.code = res.code
          obj.message = res.message
          this.App.Message.next(obj)
        }
      },
      error:(res:any) =>{

      }
     })
   
    }
    
}
