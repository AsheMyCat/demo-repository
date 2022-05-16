import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './Layout/toolbar/toolbar.component';
import { HomeComponent } from './Layout/home/home.component';
import { AboutComponent } from './Layout/about/about.component';
import { RegisterComponent } from './Layout/register/register.component';
import { TrackingComponent } from './Layout/tracking/tracking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './Layout/footer/footer.component';
import { HotlinesComponent } from './Layout/hotlines/hotlines.component';
import { AdminModule } from '../app/admin/admin.module';
import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginModule } from './login/login.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminTrackingComponent } from './admin-tracking/admin-tracking.component'


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    TrackingComponent,
    FooterComponent,
    HotlinesComponent,
    DashboardComponent,
    AdminTrackingComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, 
    AngularFirestoreModule,
    AdminModule,
    MatListModule,
    LoginModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    

    



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
