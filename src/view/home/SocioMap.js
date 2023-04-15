import { Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import EarthMapBox from '../../components/SocioMap/EarthMapBox';
import { AuthContext } from '../../context/AuthContext';
import { UpdateUserCurrentLocation } from '../../utility/sociomap';

const SocioMap = () => {
  const [location, setLocation] = useState(null);
  const { currentUser } = useContext(AuthContext)
  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser.");
      return;
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lan: position.coords.longitude,
          });
          UpdateUserCurrentLocation({
            lat: position.coords.latitude,
            lan: position.coords.longitude,
          }, currentUser)
        }
      );
    }
  }, [currentUser]);

  return (
    <>
      <Heading mb={4} as="h2">SocioMap</Heading>
      {
        location ? <EarthMapBox /> : "Access Your Location to View Map"
      }
    </>
  )
}

export default SocioMap