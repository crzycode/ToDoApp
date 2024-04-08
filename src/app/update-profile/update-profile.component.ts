import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  ValidatorObj: any = {
    Email:false,
    Name:false,
    Contact:false,
    Password:false,
    Confirmpassword:false
  };
  isChecked:boolean = false
  Passworddisable:boolean = true
  ProfileForm!:FormGroup
  constructor(private fb:FormBuilder,private router:Router, private app:AppService) {  

  }
  ngOnInit(): void {
    this.ProfileForm = this.fb.group({
      Check:[false],
      Email:[''],
      Name:[''],
      Contact:[''],
      Password:[''],
      Confirmpassword:['']
    })
    this.ProfileForm.controls['Password'].disable()
    this.ProfileForm.controls['Confirmpassword'].disable()
this.app.Getuser(localStorage.getItem('user_id')).subscribe({
  next:(res:any) =>{
    if(res.code == 200){
      this.ProfileForm.controls['Email'].setValue(res.data.email)
      this.ProfileForm.controls['Name'].setValue(res.data.name)
      this.ProfileForm.controls['Contact'].setValue(res.data.contact)
    }
  }
})
  }
  updateprofile(){
    var obj:any ={
      code:'',
      message:''
    }
    if(this.ProfileForm.controls['Check'].value){
      if(this.app.validator(this.ProfileForm.value) == true){
          var obj:any = {
            _id:localStorage.getItem('user_id'),
            Email:this.ProfileForm.controls["Email"].value,
            Name:this.ProfileForm.controls["Name"].value,
            Contact:this.ProfileForm.controls["Contact"].value,
            Password:this.ProfileForm.controls["Password"].value,
         
          }
          this.app.UpdateUser(obj).subscribe({
            next:(res:any) =>{
              console.log(res)
              if(res.code == 200){
                obj.code = 200;
                obj.message = "Success"
                this.app.Message.next(obj)
              }else{
                obj.code = res.code;
                obj.message = res.message
                this.app.Message.next(obj)
              }
            }
          })
      }else{
        this.ValidatorObj = this.app.validator(this.ProfileForm.value)
      }
    }else{
      debugger
      var email = false
      var contact = false
      var name = false
        if(this.app.validateEmail(this.ProfileForm.controls['Email'].value)){
            email = true
            this.ValidatorObj.Email = false
        }else{
          this.ValidatorObj.Email = true
        }
        if(this.ProfileForm.controls["Name"].value.length > 0){
          name = true
          this.ValidatorObj.Name = false
        }else{
          this.ValidatorObj.Name = true
        }
        if(this.ProfileForm.controls["Contact"].value.length >= 10 && this.ProfileForm.controls["Contact"].value.length < 11){
          contact = true
          this.ValidatorObj.Contact = false
        }else{
          this.ValidatorObj.Contact = true
        }
        if(email && contact && name){
          var obj:any ={
            _id:localStorage.getItem('user_id'),
            Email:this.ProfileForm.controls["Email"].value,
            Name:this.ProfileForm.controls["Name"].value,
            Contact:this.ProfileForm.controls["Contact"].value,
           
          }
          this.app.UpdateUser(obj).subscribe({
            next:(res:any) =>{
              console.log(res)
              if(res.code == 200){
                obj.code = 200;
                obj.message = "Success"
                this.app.Message.next(obj)
              }else{
                obj.code = res.code;
                obj.message = res.message
                this.app.Message.next(obj)
              }
            }
          })
        }
    }
  }
  Logout(){
    localStorage.removeItem('user_id')
    this.router.navigate(['login'])
    setTimeout(() => {
      window.location.reload()
    }, 500);
  
  }
  Navigate(nav:any){
    this.router.navigate([nav])
  }
  checkda(event:any){
    if(event.checked){
      this.ProfileForm.controls['Password'].enable()
      this.ProfileForm.controls['Confirmpassword'].enable()
    }else{
      this.ProfileForm.controls['Password'].disable()
      this.ProfileForm.controls['Confirmpassword'].disable()
    }
  }
}

