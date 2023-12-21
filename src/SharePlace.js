import{ Modal } from './UI/Modal'
import { Map } from './UI/Map';
import { getCoordsFromAddress,getAddressFromCoords } from './Utility/Location';
class PlaceFinder{
    constructor(){
        const addressForm=document.querySelector('form');
        const locateUserButton=document.getElementById('locate-btn');
        this.sharebtn=document.getElementById('share-btn');

        locateUserButton.addEventListener('click', this.locateUserHandler.bind(this));
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
        this.sharebtn.addEventListener('click',this.sharePlaceHndler);
    }
    selectPlace(coordinates,locationName) {
      if (this.map) {
        this.map.render(coordinates,locationName);
      } else {
        this.map = new Map(coordinates,locationName);
      }
      this.sharebtn.disabled=false;
      const shareInputLink=document.getElementById('share-link');
      shareInputLink.value=`${location.origin}/my-place?locationName=${encodeURI(locationName)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
    }
    sharePlaceHndler(){
      const sharedLinkInputElement = document.getElementById('share-link');
    if (!navigator.clipboard) {
      sharedLinkInputElement.select();
      return;
    }

    navigator.clipboard.writeText(sharedLinkInputElement.value)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Copied into clipboard!',
          confirmButtonColor: '#36007c',
        });
      })
      .catch(err => {
        console.log(err);
        sharedLinkInputElement.select();
      });
    }
    locateUserHandler(){
        //Geolocation is an API which is used to get geographical position of user.
        //Many Modern browsers support it

        if(!navigator.geolocation){
            Swal.fire({
                icon: 'error',
                title: 'Location feature isn\'t available',
                text: 'Please update your browser or enter the address manually.'
              });
            return;
        }
        const modal = new Modal('loading-modal-content', 'Loading location - please wait!');
        modal.show();  
        console.log('Modal shown');
        //getCurrentPosition takes two callback function as arguments.
        navigator.geolocation.getCurrentPosition(async successResult=>{
            modal.hide();
            const coordinates={
                lat:successResult.coords.latitude,
                lng:successResult.coords.longitude,
            };
            const locationName=await getAddressFromCoords(coordinates);
            this.selectPlace(coordinates,locationName);
            //console.log(coordinates);
        },
        error=>{
            modal.hide();
            Swal.fire({
                icon: 'error',
                title: 'Unable to determine your location',
                text: 'Please share it manually. Thank you.',
                confirmButtonColor: '#36007c',
              });
        });

    }
    async findAddressHandler(event) {
      event.preventDefault();
      const addressInput = event.target.querySelector('input');
      const address = addressInput.value;
      if (!address || address.trim().length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid address entered',
          text: 'Please try again with valid address or location!',
          confirmButtonColor: '#36007c',
        });
        return;
      }
  
      const modal = new Modal(
        'loading-modal-content',
        'Loading location - please wait!'
      );
      modal.show();
      try {
        const { coordinates, locationName } = await getCoordsFromAddress(address);
        this.selectPlace(coordinates,locationName);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error.',
          text:err.message ,
          confirmButtonColor: '#36007c',
        });
      }
      modal.hide();
    }

    }

const placeFinder=new PlaceFinder();