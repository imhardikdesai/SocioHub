import { Box, Button, Heading, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import EarthMapBox from '../../components/SocioMap/EarthMapBox';
import { AuthContext } from '../../context/AuthContext';
import { UpdateUserCurrentLocation } from '../../utility/sociomap';
import { MdBuild } from "react-icons/md"
import { NavLink } from 'react-router-dom';
const SocioMap = () => {
  const [location, setLocation] = useState(null);
  const { currentUser, userDetails } = useContext(AuthContext)
  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser.");
      return;
    } else if (userDetails) {
      if (userDetails.settings.isGhostMode) {
        UpdateUserCurrentLocation({
          lat: 0,
          lan: 0
        }, currentUser)
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
    }
  }, [currentUser, userDetails]);
  return (
    <>
      <Heading mb={4} as="h2">SocioMap</Heading>
      {
        <Skeleton height={'900px'} isLoaded={userDetails}>
          {userDetails &&
            userDetails.settings.isGhostMode ?
            <Box>
              Disable Ghost Mode Setting to View Map
              <NavLink to={'/setting'}>
                <Button mx={4} rightIcon={<MdBuild />} colorScheme='blue' size='xs'>
                  Disable
                </Button>
              </NavLink>
            </Box>
            : (location ? <EarthMapBox /> : "Give Access to Your Location to View Map")}
        </Skeleton>
      }
      <Box>
      </Box>
    </>
  )
}

export default SocioMap