import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

declare var google;

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})

export class GeolocationPage implements OnInit {

  locations: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;
  user = null;

  @ViewChild('map') mapElement: ElementRef;
  map:any;
  markers = [];
  constructor(private afAuth: AngularFireAuth, private locateCollection :AngularFirestore) { 
    this.anonLogin();
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loadMap();

  }

  loadMap() {
    let latLng = new google.maps.LatLng(49.1193089, 6.1757156);

    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  anonLogin() {
    this.afAuth.signInAnonymously().then(user => {
      console.log(user);
      this.user = user;
      this.locationsCollection = this.locateCollection.collection(
        `locations/${this.user.uid}/track`,
        // ref = ref.orderBy('timestamp')
      );
      //load firebase data

      //update map
    })
  }


}
