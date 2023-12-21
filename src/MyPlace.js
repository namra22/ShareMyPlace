import { Map } from './UI/Map';

class LoadedPlace {
  constructor(coordinates, locationName) {
    new Map(coordinates,locationName);
    const headerTitleEl = document.querySelector('header h1');
    headerTitleEl.textContent = locationName;
  }
}

const url = new URL(location.href);
console.log(url);
const queryParams = url.searchParams;
const coords = {
  lat: parseFloat(queryParams.get('lat')),
  lng: parseFloat(queryParams.get('lng')),
};
const locationName = queryParams.get('locationName');
console.log('Coords:', coords);
console.log('Location Name:', locationName);
new LoadedPlace(coords, locationName);