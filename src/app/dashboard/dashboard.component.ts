import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRoutingModule } from '../login/login-routing.module';
import { Register } from '../register.model';
import { RegisterService } from '../register.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  register: Observable<any>; 

  constructor(private angularFirestore: AngularFirestore, public firebaseAuth: AngularFireAuth, public registerService: RegisterService) { 
    
  }

  ngOnInit(): void {
    this.firebaseAuth.authState.subscribe(register => {
      console.log('Dashboard: Register', register);

      if (register) {
          let emailLower = register.email.toLowerCase();
          this.register = this.angularFirestore
          .collection('register')
          .doc(emailLower).valueChanges();
      }
    });

  }


}
