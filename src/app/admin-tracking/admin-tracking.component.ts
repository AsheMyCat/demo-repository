import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { RegisterService } from '../register.service';
import { Register  } from '../register.model';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/compat/database';
import { collection, doc, setDoc } from "firebase/firestore"; 

import * as geojson from 'geojson';


declare const L: any;

@Component({
  selector: 'app-admin-tracking',
  templateUrl: './admin-tracking.component.html',
  styleUrls: ['./admin-tracking.component.css']
})
export class AdminTrackingComponent implements OnInit {
  emailid: any;
  coordinates: any;
  loccoll: AngularFirestoreCollection<Register>;
  locations: Observable<Register[]>;
  location: Observable<Register>;
  pl:any;
  x:any;
  Register: Register[];
 // register: Observable<any>; 
 locationCollection:any;
 locationInfo:any;
 locC:any;
 regCollection:any;
 regInfo:any;
 regg:any;
  constructor(private afs: AngularFirestore, public firebaseAuth: AngularFireAuth, public registerService: RegisterService) {
    
   }
  
  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log ('Location is not Supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
        let a = this.afs.collectionGroup("location")
        const coords = position.coords;
        let x =  this.firebaseAuth.authState.subscribe(register => {
          console.log('Trying to Access Firebase');
    
        if (register) {
              let emailLower = register.email.toLowerCase();
              let Coordinates = 'Coordinates'
               this.afs
              .collection('register')
              .doc(emailLower)
              .collection('location').doc(Coordinates).valueChanges()
          }   
          console.log('Trying to Access Firebase', register);
        });
      
        let mymap = L.map('map1').setView([14.2866586, 120.8584067], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoZW15Y2F0IiwiYSI6ImNrd2Roamo5a2JjN2YydXMxM3Z3bzB3MWYifQ.ggpNyCtxsflvwJaugeraxg', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token'
        })
          .addTo(mymap);
          this.pl = x;
          console.log('pl' ,this.pl);
          
          const geojsonPoint: geojson.Point = {
            type: 'Point',
            coordinates: [this.pl.Latitude, this.pl.Longitude]
            
         };

          L.geoJSON(geojsonPoint).addTo(mymap);

          //pl.latitude
         let marker =  L.marker().addTo(mymap)
         marker.bindPopup().openPopup();
        
       
        });
      /*  this.regCollection = this.afs.collection('register');
        this.regInfo = this.regCollection.snapshotChanges();

        this.regInfo.subscribe((actionArray) => {
          this.regg = actionArray.map((num) => ({
            id: num.payload.doc.id,
            ...num.payload.doc.data(),
            expanded: false
          }))
        })

        this.locationCollection = this.afs.collection('location');
        this.locationInfo = this.locationCollection.valueChanges();

        this.locationInfo.subscribe((actionArray) => {
          this.locC = actionArray.map((it) => ({
            id: it.payload.doc.id,
            ...it.payload.doc.data(),
            expanded: false
          }))
        })*/
/////////////////////////////////////////////////////////////////////////////
        this.registerService.getRegisterList().subscribe(res => {
          this.Register = res.map ( e => {
            return{
              id: e.payload.doc.id,
              ...e.payload.doc.data() as {}
            } as Register;
          })
        });


        // end of ngoninit
      }

      

}
