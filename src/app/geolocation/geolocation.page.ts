import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Geolocation } from '@capacitor/geolocation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare var google;

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})

export class GeolocationPage {

  locations: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;
  
  user = null;
  isTracking = false; 
  watch: any;
 

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map:any;
  markers = [];

  constructor(private afAuth: AngularFireAuth, private locateCollection :AngularFirestore) { 
    this.anonLogin();
  }

  // ngOnInit() {

  // }

  anonLogin() {
    this.afAuth.signInAnonymously().then(res => {
      console.log(res.user.uid);
      this.user = res.user;
      this.locationsCollection = this.locateCollection.collection(
        `locations/${this.user.uid}/track`,
        ref => ref.orderBy('timestamp')
      );

      //load firebase data
      this.locations = this.locationsCollection.snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );

      //update map
      this.locations.subscribe(locations => {
        this.updateMap(locations);
      });
    })
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

  // Use Capacitor to track our geolocation
  startTracking() {
    this.isTracking = true;
    this.watch = Geolocation.watchPosition({}, (position, err) => {
      if (position) {
        this.addNewLocation(
          position.coords.latitude,
          position.coords.longitude,
          position.timestamp
        );
      }
    });
  }

  // Unsubscribe from the geolocation watch using the initial ID
  stopTracking() {
    Geolocation.clearWatch({ id: this.watch }).then(() => {
      this.isTracking = false;
    });
  } 

  // Save a new location to Firebase and center the map
  addNewLocation(lat, lng, timestamp) {
    this.locationsCollection.add({
      lat,
      lng,
      timestamp
    });
  
    //center the map
    let position = new google.maps.LatLng(lat, lng);
    this.map.setCenter(position);
    this.map.setZoom(5);
  }
  // Delete a location from Firebase
  deleteLocation(pos) {
    console.log('delete: ', pos);
    this.locationsCollection.doc(pos.id).delete();
  }
  
  // Redraw all markers on the map
  updateMap(locations) {
    // Remove all current marker
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];
  
    for (let loc of locations) {
      let latLng = new google.maps.LatLng(loc.lat, loc.lng);
  
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      this.markers.push(marker);
    }
  }
}
