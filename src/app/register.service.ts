import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Register } from './register.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { state } from '@angular/animations';
import { BaseOverlayDispatcher } from '@angular/cdk/overlay/dispatchers/base-overlay-dispatcher';




declare const L: any;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  // register = Observable<any>;
  registerLoggedIn: boolean;
 // location: any;
  private _location;


  constructor(private router: Router, private firebaseAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
    this.registerLoggedIn = false;

    this.firebaseAuth.onAuthStateChanged((register: any) => {
      if (register) {
        this.registerLoggedIn = true;
      } else {
        this.registerLoggedIn = false;
      }
    });
  }

  get timestamp() {
    const d = new Date();
    return d;
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, long: ${position.coords.longitude}`
        );
        if (position.coords.latitude == desLat, position.coords.longitude == desLon) {
          navigator.geolocation.clearWatch(id);
        }
      }, (err) => {
        console.log(err);
      }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  }

  async loginUser(Email_Address: string, Password: string): Promise<any> {
    const result = await this.firebaseAuth.signInWithEmailAndPassword(Email_Address, Password);
    //this.addLocation(this.cord);
    console.log('Auth Service: loginUser: success');
    this.router.navigate(['/login']);
  }

  async createRegister(registers: any): Promise<any> {
    try {
      const result = await this.firebaseAuth.createUserWithEmailAndPassword(registers.Email_Address, registers.Password);
      let emailLower = registers.Email_Address.toLowerCase();
      let locid = registers.locationId = 'Coordinates'
      const timestamp = this.timestamp;

     this.angularFirestore.doc('/register/' + emailLower) // on a successful signup, create a document in 'users' collection with the new user's info
     // this.angularFirestore.collection('register').doc(emailLower).collection('Location').doc(locid)
    // this.angularFirestore.doc('/register/' + emailLower + locid +'/Location/')
        .set({
          Surname: registers.Surname,
          First_Name: registers.First_Name,
          Middle_Name: registers.Middle_Name,
          Suffix: registers.Suffix,
          Age: registers.Age,
          Birthday: registers.Birthday,
          Birthplace: registers.Birthplace,
          Address: registers.Address,
          Contact_Number: registers.Contact_Number,
          Religion: registers.Religion,
          Sex: registers.Sex,
          Civil_Status: registers.Civil_Status,
          Type_of_Disability: registers.Type_of_Disability,
          Cause_of_Disability: registers.Cause_of_Disability,
          Email_Address: registers.Email_Address,
          Password: registers.Password,
          CreatedAt: timestamp,
          Email_Lower: emailLower,
          
        });
      window.alert("You have been successfully registered!");
    } catch (error) {
      console.log('Auth Service: signup error', error);
      if (error.code) {
        return window.alert(error.message);
      }
      return window.alert(error.message);
    }
  }

  async logoutUser(): Promise<void> {
    try {
      await this.firebaseAuth.signOut();
      this.router.navigate(['/home']); // when we log the user out, navigate them to home
    } catch (error) {
      console.log('Auth Service: logout error...');
      console.log('error code', error.code);
      console.log('error', error);
      if (error.code)
        return error;
    }
  }

  getLocationDoc(emailLower: string, Coordinates: string) {
    return this.angularFirestore
      .collection('register') /** <--- Creation ng DB */
      .doc(emailLower)
      .collection('location')
      .doc(Coordinates)
      .snapshotChanges()
      .subscribe(result => {
        console.log(result);
    });
  }

  set location (location: String){
    this._location = location;
  }

  getlocation (){
    return this._location;
  }

  getRegisterList() {
    return this.angularFirestore
      .collection("register")
      
      .snapshotChanges()
  }

  getlalo(){
    this.firebaseAuth.authState.subscribe(register => {
      console.log('getting latitude works', register);

      if (register) {
          let emailLower = register.email.toLowerCase();
          let Coordinates = 'Coordinates'
           this.angularFirestore
          .collection('register')
          .doc(emailLower)
          .collection('location')
          .doc(Coordinates)
          .valueChanges()
      }
    })
  }

  getLocation(){
   return this.angularFirestore.collection(`register/'emailLower'/location`).snapshotChanges()
    return this.angularFirestore
      .collection("register")
      .doc("Email_Lower")
      .collection("location")
      .snapshotChanges()
  }

  deleteRegister(registers: any) {
    return this.angularFirestore
      .collection("register")
      .doc(registers.pwid)
      .delete();
  }

  updateRegister(registers: Register, pwid: any) {
    return this.angularFirestore
      .collection("register") /** name ng DB */
      .doc(pwid)
      .update({
        pwdid: registers.pwdid,
        Surname: registers.Surname,
        First_Name: registers.First_Name,
        Middle_Name: registers.Middle_Name,
        Suffix: registers.Suffix,
        Age: registers.Age,
        Birthday: registers.Birthday,
        Birthplace: registers.Birthplace,
        Address: registers.Address,
        Contact_Number: registers.Contact_Number,
        Religion: registers.Religion,
        Sex: registers.Sex,
        Civil_Status: registers.Civil_Status,
        Type_of_Disability: registers.Type_of_Disability,
        Cause_of_Disability: registers.Cause_of_Disability,
        Email_Address: registers.Email_Address,
        Password: registers.Password
      })
  }

  setUserInfo(payload: object) {
    console.log('Auth Service: saving user info...');
    this.angularFirestore.collection('register')
      .add(payload).then(function (res) {
        console.log("Auth Service: setUserInfo response...")
        console.log(res);
      })
  }

  getCurrentUser() {
    return this.firebaseAuth.currentUser;                                 // returns user object for logged-in users, otherwise returns null 
  }


}
