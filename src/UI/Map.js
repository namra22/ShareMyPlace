export class Map {
  constructor(coords, locationName) {
    // this.coordinates = coords;
    this.render(coords, locationName);
  }

  render(coordinates, locationName) {
    
    const map = L.map('map').setView(coordinates, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker(coordinates).addTo(map)
    .bindPopup(`Your location: ${locationName}`)
    .openPopup();
  }
}
