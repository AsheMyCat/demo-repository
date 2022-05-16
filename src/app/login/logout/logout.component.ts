import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RegisterService } from './../../register.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public firebaseAuth: AngularFireAuth, public registerService: RegisterService) { }

  ngOnInit(): void {
  }

  SignOut() {
    this.registerService.logoutUser();
}

}
