import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface AuthResonseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
}


@Injectable({providedIn:'root'})
export class AuthService{

    constructor(private http:HttpClient){}

    signup(email:String, password:string){
        return this.http.post<AuthResonseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAmA4ugbiIz-XLTDSKUxeGoVLsa4JU14w',{
                email:email,
                password:password,
                returnSecureToken:true
            }
        ).pipe(catchError(errorRes =>{
            let errorMessage='An unknown error occoured!';
            console.log('errorRes: '+errorRes.error.error.message);
            
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage='This email exists allready'    
            }
            return throwError(errorMessage);
        }));
    }
}