import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    isProgressVisible: boolean;
    public loginForm: FormGroup;
    firebaseErrorMessage: string;
    Email_Address: string;
    Password: string;

  constructor(private registerService: RegisterService, private router: Router, private firebaseAuth: AngularFireAuth) { 

    this.isProgressVisible = false;

        this.loginForm = new FormGroup({
            'Email_Address': new FormControl('', [Validators.required, Validators.email]),
            'Password': new FormControl('', Validators.required)
        });

        this.firebaseErrorMessage = '';
    }

  ngOnInit(): void {
    if (this.registerService.registerLoggedIn) {           
      this.router.navigate(['/dashboard']);
  }

  }

  loginUser() {
    this.isProgressVisible = true;                          

    if (this.loginForm.invalid)
        return;

    this.registerService.loginUser(this.loginForm.value.Email_Address, this.loginForm.value.Password).then((result) => {
        this.isProgressVisible = false;                    
        if (result == null) {                               
            console.log('logging in...');
            this.router.navigate(['/dashboard']);                
        }
        else if (result.isValid == false) {
            console.log('login error', result);
            this.firebaseErrorMessage = result.message;
        }
    });
}


}
