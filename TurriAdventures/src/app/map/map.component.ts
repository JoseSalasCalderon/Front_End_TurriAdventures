import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  map: google.maps.Map | undefined;
  directionsService: google.maps.DirectionsService | undefined;
  directionsRenderer: google.maps.DirectionsRenderer | undefined;

  destination = { lat: 9.903394582774313, lng: -83.68428117795325 }; // Reemplaza con las coordenadas de tu destino
  
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.initMap(userLocation);
        },
        (error) => {
          console.error('Geolocation error: ', error);
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  initMap(userLocation: { lat: number; lng: number }): void {
    const loader = new Loader({
      apiKey: 'AIzaSyAdddUUOOQ3eYIX59TlAvc72e8z8anvA5E', // Reemplaza con tu API key
      version: 'weekly',
      libraries: ['places'], // Agrega la biblioteca 'places' para buscar lugares
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: userLocation,
        zoom: 14,
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();

      this.directionsRenderer.setMap(this.map);

      const request = {
        origin: userLocation,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          this.directionsRenderer?.setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });

      // Crea un marcador para la ubicación del usuario
      const userMarker = new google.maps.Marker({
        position: userLocation,
        map: this.map,
        title: "Your Location"
      });
    }).catch(error => {
      console.error('Error loading Google Maps: ', error);
    });
  }
}
