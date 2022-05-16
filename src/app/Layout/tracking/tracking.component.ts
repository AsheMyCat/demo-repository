import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component'
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { RegisterService } from '../../register.service';
import { Register } from 'src/app/register.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ICON_REGISTRY_PROVIDER } from '@angular/material/icon';
import { ThisReceiver } from '@angular/compiler';

  declare const L: any;

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

 ll!:any;
 latlong: any;
  private LatLong!: any;
  b!: any;
  c!: any;
  x!: any;
  y!: any;
  register: Observable<any>; 
  RegisterInfo: Observable<any>;
  reg:any;
  locationForm: FormGroup;
  wp: any;

  constructor(private afs: AngularFirestore, public firebaseAuth: AngularFireAuth, public registerService: RegisterService) { }

  ngOnInit(): void {
  
    if (!navigator.geolocation) {
      console.log ('Location is not Supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
     
      const coords = position.coords;
      const lat = coords.latitude;
      const long = coords.longitude;
      const e =  position.coords.latitude;
      const f = position.coords.longitude;
      
      const latLong = [coords.latitude, coords.longitude];
      console.log (
         `lat: ${position.coords.latitude}, long: ${position.coords.longitude}`
      ); 
       

      let mymap = L.map('map').setView(latLong, 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoZW15Y2F0IiwiYSI6ImNrd2Roamo5a2JjN2YydXMxM3Z3bzB3MWYifQ.ggpNyCtxsflvwJaugeraxg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    })
      .addTo(mymap);
        //L.Control.geocoder().addTo(mymap);
    /*  mymap.addControl(L.control.locate({
        locateOptions: {
                enableHighAccuracy: true
 }}));*/
    this.x = e;
    this.y = f;

    
    this.ll = L.latLng(latLong)
     // let l = L.latLng(lat[1], long[0])
     let marker = L.marker(latLong).addTo(mymap);
      marker.bindPopup("You are here").openPopup();
      
     this.latlong = this.ll;

     //this.b = l;

    });
  
    this.watchPosition();
    this.x;
    this.y;
  

   this.latlong;

  }

  addSub(){
    this.firebaseAuth.authState.subscribe(register => {
      console.log('Adding Location Works', register);

      if (register) {
          let emailLower = register.email.toLowerCase();
          let Coordinates = 'Coordinates'
           this.afs
          .collection('register')
         .doc(emailLower)
          .collection('location').doc(Coordinates)
          .set({
           // 'Name': 
            'Coordinates': " " + this.latlong,
            'Latitude':  this.x,
            'Longitude':  this.y,
            'Watch Position':" " + this.wp,
            'TimeLog': this.registerService.timestamp
          })
      }
    });
    
  }
  

   /*addSub(){
    this.firebaseAuth.authState.subscribe(register => {
      console.log('Adding Location Works', register);

      if (register) {
          let emailLower = register.email.toLowerCase();
           this.afs
          .collection('register')
          .doc(emailLower)
          .collection('location')
          .add({
           // 'Name': 
            'Coordinates': " " + this.latlong,
            'Latitude':  this.x,
            'Longitude':  this.y,
            'Watch Position':" " + this.wp,
            'TimeLog': this.registerService.timestamp
          })
      }
    });
    
  }*/
  
  watchPosition(){
    let desLat = 0; 
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
       
      console.log(
        `lat: ${position.coords.latitude}, long: ${position.coords.longitude}`
      );
      if (position.coords.latitude == desLat, position.coords.longitude == desLon){
        navigator.geolocation.clearWatch(id);
        
      }
    },(err) => {
      console.log(err);
    }, { enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
     this.c = this.wp;
  }

    
}
