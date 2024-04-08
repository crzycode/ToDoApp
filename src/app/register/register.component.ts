import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
RegisterForm!:FormGroup
ValidatorObj: any = {
  Email:false,
  Name:false,
  Contact:false,
  Password:false,
  Confirmpassword:false
};
constructor(private route:Router,private fb:FormBuilder, private App:AppService) {
  this.RegisterForm = this.fb.group({
    Email:[''],
    Name:[''],
    Contact:[''],
    Password:[''],
    Confirmpassword:['']
  })
  
}
  Route(){
    this.route.navigate(['login'])
  }
  SubmitRegistrationForm(){
    var obj:any ={
      code:'',
      message:''
    }
    if(this.App.validator(this.RegisterForm.value) == true){
      this.App.Register(this.RegisterForm.value).subscribe({
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
      this.ValidatorObj = this.App.validator(this.RegisterForm.value)
    }
  
  }
}
