import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  URL:any = "https://localhost:44381/api/"
  UpdateTask = new Subject<any>()
  Message = new Subject<any>()
  AddTaskButton = new Subject<any>();
  OpenCalendar = new Subject<any>();
  ValidatorObj: any = {
    Email:false,
    Name:false,
    Contact:false,
    Password:false,
    Confirmpassword:false
  };
  LoginValidateObj:any = {
    Email:false,
    Password:false
  }
  constructor(private http:HttpClient) { }

  Addtask(data:any):Observable<any>{
      return this.http.post<any>(this.URL+"AddTask/add",data)
  }
  Register(data:any):Observable<any>{
    return this.http.post(this.URL+"Registration/register",data)
  }
  Login(data:any):Observable<any>{
    return this.http.post(this.URL+"Registration/login",data)
  }
  Getuser(data:any):Observable<any>{
    return this.http.get(this.URL+`Registration/get/${data}`)
  }
  UpdateUser(data:any):Observable<any>{
    return this.http.post(this.URL+`Registration/update`,data)
  }
  GetTask(data:any):Observable<any>{
    return this.http.get(this.URL+`AddTask/get/${data}`)
  }
  FinishTask(data:any):Observable<any>{
    return this.http.post(this.URL+"FinishTask/addfinishtask",data)
  }
  GetFinishTask(data:any):Observable<any>{
    return this.http.get(this.URL+`FinishTask/get/${data}`)
  }
  validator(data: any): any {
    var i = 0;
    var valid = false;
    var keys = Object.keys(this.ValidatorObj);
    let va = Object.keys(this.ValidatorObj).forEach((ele) => {
      if (data[ele].length != 0 && data[ele] != null && data[ele] != undefined) {
        i++;
        if(ele == "Confirmpassword"){
          if(data['Password'] == data['Confirmpassword']){
            this.ValidatorObj[ele] = false;
          }else{
            i--;
            this.ValidatorObj[ele] = true;
          }
        }else{
          this.ValidatorObj[ele] = false;
        }
        if(ele == "Contact"){
          if(data[ele].length >= 10 && data[ele].length < 11){
            this.ValidatorObj[ele] = false;
          }else{
            i--;
            this.ValidatorObj[ele] = true;
          }
        }
        if(ele == "Email"){
          if(this.validateEmail(data[ele])){
            this.ValidatorObj[ele] = false;
          }else{
            i--;
            this.ValidatorObj[ele] = true;
          }
        }
        if (i == keys.length) {
          valid = true;
        }
      } else {
        this.ValidatorObj[ele] = true;
        valid = false;
      }
    });
    return valid?valid:this.ValidatorObj;
  }
  LoginValidator(data: any): any {
    var i = 0;
    var valid = false;
    var keys = Object.keys(this.LoginValidateObj);
    let va = Object.keys(this.LoginValidateObj).forEach((ele) => {
      if (data[ele].length != 0 && data[ele] != null && data[ele] != undefined) {
        this.LoginValidateObj[ele] = false;
        i++;
        if (i == keys.length) {
          valid = true;
        }
      } else {
        this.LoginValidateObj[ele] = true;
        valid = false;
      }
    });
    return valid?valid:this.LoginValidateObj;
  }

   validateEmail(email:any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
