import { Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import EarthMapBox from '../../components/SocioMap/EarthMapBox';
// import { FullscreenControl, GeolocateControl, Map, Marker, NavigationControl } from 'react-map-gl';
// import { GOOGLE_MAP_API_KEY } from '../../constant/URL';

const SocioMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    );
  }, []);

  console.log(location)
  return (
    <>
      <Heading mb={4} as="h2">SocioMap</Heading>
      {
        location ? <EarthMapBox /> : "Access Your Location to View Map"
      }
      {/* {
        location ?
          <iframe
            title="user Map"
            width="900"
            height="500"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAP_API_KEY}
          &center=${location.latitude},${location.longitude}&zoom=15&maptype=satellite`}>
          </iframe>
          : "Access Your Location to View Map"
      } */}
    </>
  )
}

export default SocioMap