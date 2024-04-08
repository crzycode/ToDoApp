import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
LoginForm!:FormGroup
ValidateObj:any = {
  Email:false,
  Password:false
}
constructor(private route:Router,private fb:FormBuilder,private App:AppService) {

  this.LoginForm = this.fb.group({
    Email:[''],
    Password:['']
  })
}
  Route(){
    this.route.navigate(['register'])
  }
  SubmitLoginForm(){
    var obj:any ={
      code:'',
      message:''
    }
    if(this.App.LoginValidator(this.LoginForm.value) == true){
      this.App.Login(this.LoginForm.value).subscribe({
        next:(res:any) =>{
          console.log(res.message)
          if(res.code == 200){
              localStorage.setItem("user_id",res.data)
              obj.code = 200;
              obj.message = "Success"
              this.App.Message.next(obj)
              setTimeout(() => {
                this.route.navigate([''])
                this.App.AddTaskButton.next("update")
              }, 1000);
           
          }else{
            obj.code = res.code;
            obj.message = res.message
            this.App.Message.next(obj)
          }
        },
        error:(res:any) =>{
          obj.code == res.code;
          obj.message == res.message
          this.App.Message.next(obj)
        }
      })
    }else{
    this.ValidateObj = this.App.LoginValidator(this.LoginForm.value)
    }
  }
}
