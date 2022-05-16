import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { FlexLayoutModule } from '@angular/flex-layout';





@NgModule({
  declarations: [
    LoginPageComponent,
    LogoutComponent,
    ForgotPassComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
    
  
  ],
  exports: [
    LoginPageComponent,
    LogoutComponent,
    ForgotPassComponent

  ]
})
export class LoginModule { }
