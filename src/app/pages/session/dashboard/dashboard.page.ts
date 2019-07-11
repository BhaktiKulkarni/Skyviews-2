import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from 'src/app/map.service';
import { GeoJson, FeatureCollection } from 'src/app/map';
import { FIREBASE_CONFIG } from 'src/app/firebase.credentials';
import { MAPBOX } from 'src/app/mapbox.credentials';
import { Platform } from '@ionic/angular';
import { geojson } from 'src/app/markers';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

var lat = null;
var lng = null; 
var markerLat = null;
var markerLng = null;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';//'mapbox://styles/mapbox/outdoors-v9';
  lat =  18.2206; //19.9975;   Lower : 18.15620555283993    Upper : 18.27473243435528
  lng =  -63.0686; // 73.7898 ;   Lower : -63.17486605316276    Upper : -62.96576196079815
  userEmail: string;
  subscription: any;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private platform: Platform,
    public mapService: MapService,
   // public geojson: GeoJsonMarkers
  ) {
    mapboxgl.accessToken = MAPBOX.accessToken;
  }

  ngOnInit(){
    
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }
    else{
      this.navCtrl.navigateBack('');
    }

    this.ionViewDidLoad1();
  }

  ionViewDidEnter(){
     this.subscription = this.platform.backButton.subscribe(() => {
        navigator['app'].exitApp(); 
      });
      }
      
  ionViewWillLeave(){
    this.subscription.unsubscribe(); 
  }
  
  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.dir(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    });
  }

  ionViewDidLoad1(){
    this.buildMap();
  }

  buildMap() {

    //create map
    if (!mapboxgl.supported()) {
      alert('Your browser does not support Mapbox GL');
    } else {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 10.24,
        center: [this.lng, this.lat],
        hash: true,
        transformRequest: (url, resourceType)=> {
          if(resourceType === 'Source' && url.startsWith('http://localhost:8100/dashboard')) {
            return {
            url: url.replace('http', 'https'),
            //  headers: { 'my-custom-header': true},
            credentials: 'include'  // Include cookies for cross-origin requests
          }
          }
        },
      });

      console.log(geojson.features);
      geojson.features.forEach( marker => {
          this.map.on('load', () => {
            new mapboxgl.Marker()
            .setLngLat(marker.geometry.coordinates)
            .addTo(this.map);
          });
      });

      //track current location of user
      this.map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        }));

        //get current location of user
      if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(position => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log('current location '+this.lat, this.lng); 
            alert('current location '+ this.lat +' longitude' + this.lng);
          });

          navigator.geolocation.watchPosition(position => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            alert('watch '+ this.lat +' longitude'+ this.lng);
          });
        } else {
          alert('Provide access to fetch current location');
        }

        //get co-ordinates of the clicked point on map
      this.map.on('click', function (e) {
          this.markerLat = e.lngLat.lat;
          this.markerLng = e.lngLat.lng;
          //Fly to clicked location
          // setTimeout(() => {
          //   this.map.flyTo([this.markerLat, this.markerLng], 16);
          // }, 0);
          console.log('Latitude' + e.lngLat.lat, 'Longitude' + e.lngLat.lng);

        });

      this.map.addControl(new MapboxDirections({
          accessToken: MAPBOX.accessToken,
          placeholderOrigin: 'Choose a starting place',
          placeholderDestination: 'Choose destination',
          unit: 'metric',
          // profile: 'mapbox/cycling'
          })
          );
  }
  }

  removeMarker(marker) {
    this.mapService.removeMarker(marker.$key);
  }
}

