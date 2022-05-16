import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'forgot', component: ForgotPassComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

export const routingComponents = [LoginPageComponent, LogoutComponent, ForgotPassComponent]