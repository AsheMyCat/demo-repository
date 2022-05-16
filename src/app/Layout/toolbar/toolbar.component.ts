import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public firebaseAuth: AngularFireAuth, private angularFirestore: AngularFirestore) { 
    
  }
  ngOnInit(): void {

  }

  SignOut() {
    this.firebaseAuth.signOut();
   
}

}
