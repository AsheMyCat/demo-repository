import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Layout/home/home.component';
import { RegisterComponent } from './Layout/register/register.component';
import { TrackingComponent } from './Layout/tracking/tracking.component';
import { AboutComponent } from './Layout/about/about.component';
import { HotlinesComponent } from './Layout/hotlines/hotlines.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginModule } from './login/login.module';
import { AdminTrackingComponent } from './admin-tracking/admin-tracking.component';

const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tracking', component: TrackingComponent }, 
  { path: 'hotlines', component: HotlinesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-map', component: AdminTrackingComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent, RegisterComponent, AboutComponent, TrackingComponent, HotlinesComponent, DashboardComponent]
