import { Injectable } from '@angular/core';
import { MAPBOX } from './mapbox.credentials';
import { AngularFireDatabase } from '@angular/fire/database';
import { GeoJson } from './map';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {

  url = 'https://api.mapbox.com';
  constructor(private db: AngularFireDatabase) {
    mapboxgl.accessToken = MAPBOX.accessToken
  }


  getMarkers() {
    return this.db.list('/markers')
  }

  createMarker(data: GeoJson) {
    return this.db.list('/markers')
                  .push(data)
  }

  removeMarker($key: string) {
    return this.db.object('/markers/' + $key).remove()
  }

  getRoutes(profile,coordinates){
    return this.db.object(this.url + '/directions/v5/mapbox/' + profile + '/' + coordinates + '?access_token=' + MAPBOX.accessToken);
    //https://api.mapbox.com/directions/v5/mapbox/cycling/-122.42,37.78;-77.03,38.91?access_token=pk.eyJ1IjoiYmhha3RpMTMxMiIsImEiOiJjandnOHoxMGgxZDR0NDRvdTZzMzBlNWZ3In0.fvWTP95eBg0TwY9kQTGWlw
  }
}