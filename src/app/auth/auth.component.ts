import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from './auth.service';
@Component({
  selector:'app-auth',
  templateUrl:'./auth.component.html'
})

export class AuthComponent{

  isLoginMode=false;
  isLoading=false;
  error:string=null;

  constructor(private authService:AuthService){

  }

  onSwitchMode(){
    console.log('click');
    this.isLoginMode=!this.isLoginMode;
    console.log(this.isLoginMode);  
  }

  onSubmit(form:NgForm){
    console.log(form.value);
    if(!form.valid){
      return;
    }
    const email=form.value.email;
    const password=form.value.password;

    this.isLoading=true;
   
    if(this.isLoginMode){

    }else{
      this.authService.signup(email, password).subscribe(
        resData=>{
          console.log(resData);
          this.isLoading=false;
        },
        errorMessage=>{
          console.log(errorMessage);
          this.error=errorMessage;
          this.isLoading=false;
        }
      );
    }
    form.reset();
  }
}