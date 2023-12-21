export async function getAddressFromCoords(coordinates) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.lat}&lon=${coordinates.lng}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch address. Please try again!');
    }
  
    const data = await response.json();
  
    if (!data || !data.display_name) {
      throw new Error('No location name found for the provided coordinates.');
    }
  
    return data.display_name;
  }
  

export async function getCoordsFromAddress(address) {
    const urlAddress = encodeURI(address);
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${urlAddress}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch coordinates. Please try again!');
    }
  
    const data = await response.json();
  
    if (!data || data.length === 0) {
      throw new Error('No coordinates found for the provided address.');
    }
  
    const coordinates = {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  
    const locationName = data[0].display_name;
    return { coordinates, locationName };
  }
  