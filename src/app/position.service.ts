import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore/collection/collection';
import { Observable } from 'rxjs';


export interface PostionsAddress {
  id?: string,
  name: string,
  notes: string,
  lat:any,
  lng:any
}


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private ideas: Observable<PostionsAddress[]>;
  private ideaCollection: AngularFirestoreCollection;

  
  constructor(private afs: AngularFirestore) {

   }
}
