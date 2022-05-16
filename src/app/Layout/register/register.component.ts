import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/register.service';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  
})
export class RegisterComponent implements OnInit {

  public registrationForm: FormGroup;

  reg: any = {}

  isProgressVisible: boolean;
  signupForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private registerService: RegisterService, private router: Router, private firebaseAuth: AngularFireAuth, private afs:AngularFirestore) {
      this.isProgressVisible = false;
      this.firebaseErrorMessage = 'Enter Valid Email Address and Password';
  }

  ngOnInit(): void {
    if (this.registerService.registerLoggedIn) {                       // if the user's logged in, navigate them to the dashboard 
      this.router.navigate(['/login']);
  }

  this.registrationForm = new FormGroup({
    'Surname': new FormControl('', Validators.required),
    'First_Name': new FormControl('', Validators.required),
    'Middle_Name': new FormControl('', Validators.required),
    'Suffix': new FormControl(''),
    'Age': new FormControl('', Validators.required),
    'Birthday': new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    'Birthplace': new FormControl('', Validators.required),
    'Address':  new FormControl('', Validators.required),
    'Contact_Number':  new FormControl ('', Validators.required),
    'Religion':  new FormControl ('', Validators.required),
    'Sex':  new FormControl ('', Validators.required),
    'Civil_Status':  new FormControl ('', Validators.required),
    'Type_of_Disability':  new FormControl ('', Validators.required),
    'Cause_of_Disability':  new FormControl ('', Validators.required),
    'Email_Address':  new FormControl ('', [Validators.required, Validators.email]),
    'Password':  new FormControl ('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
});
}


  
  onSub(){
    if (this.registrationForm.invalid)                            // if there's an error in the form, don't submit it
    return;

  this.isProgressVisible = true;
  this.registerService.createRegister(this.registrationForm.value).then((result) => {
    if (result == null)                                 // null is success, false means there was an error
        this.router.navigate(['/dashboard']);
    else if (result.isValid == false)
        this.firebaseErrorMessage = result.message;

    this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
}).catch(() => {
    this.isProgressVisible = false;
});

  }

}
