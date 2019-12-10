import { Component } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Coordinates } from 'src/app/models/coordinates.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  map;
  coordinates: Coordinates;
  constructor(private _modalCtrl: ModalController) {}

  ionViewDidEnter() {
    this.locateUser();
    this.essai('8 rue du docteur roux Eysines');
  }

  async essai(address) {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: address });
    results.map(town => {
      console.log(town);
    });
  }

  leafletMap(lat: number, lgn: number) {
    this.map = L.map('mapId').setView([lat, lgn], 10);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Anthony'
    }).addTo(this.map);

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      iconSize: [25, 41], // taille de l’icône
      iconAnchor: [25, 41] // point d’ancrage
    });
    L.marker([lat, lgn], { icon: myIcon })
      .bindPopup('Je suis un Frugal Marqueur')
      .addTo(this.map)
      .openPopup();
  }

  locateUser() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      //indiquer une alerte indiquant que la location ne peut pas être trouvée
      return;
    }
    Plugins.Geolocation.getCurrentPosition()
      .then(geoPosition => {
        this.coordinates = {
          lat: geoPosition.coords.latitude,
          lgn: geoPosition.coords.longitude
        };
        this.leafletMap(this.coordinates.lat, this.coordinates.lgn);
      })
      .catch(e => {
        console.log(e.message);
        //indiquer une alerte indiquant que la location ne peut pas être trouvée
      });
  }

  onCancel() {
    this._modalCtrl.dismiss();
  }

  ionViewWillLeave() {
    this.map.remove();
  }
}
