import { Box } from '@chakra-ui/react'
import mapboxgl from 'mapbox-gl';
import React, { useEffect } from 'react'
import { MapStyle } from '../../constant/URL';
import { GetAllUserLocation } from '../../utility/sociomap';

const EarthMapBox = () => {

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoibm92YWJpbDQ2NiIsImEiOiJjbGdnaDk5OWgwM2IzM2RwN3dhZW9tYXdrIn0.3ECgUtQ0bqNsbKe1ctDmIw';
        if (!mapboxgl.supported()) {
            alert('Your browser does not support Mapbox GL');
        } else {
            const map = new mapboxgl.Map({
                container: 'map',
                style: MapStyle,
                center: [72.6032779, 23.192825],
                zoom: 6
            });
            //Add Navigation, Zoom Control
            map.addControl(new mapboxgl.NavigationControl());
            // Add a layer showing the places.

            GetAllUserLocation().then(res => {
                for (const marker of res) {
                    const { geometry, properties } = marker;
                    const { profileURL } = properties.userData;
                    if (geometry.coordinates[0] === 0 || geometry.coordinates[1] === 0) {
                        continue;
                    }
                    const el = document.createElement('div');
                    const width = marker.properties.iconSize[0];
                    const height = marker.properties.iconSize[1];
                    el.className = 'marker';
                    el.style.backgroundImage = `url(${profileURL})`;
                    el.style.width = `${width}px`;
                    el.style.height = `${height}px`;
                    el.style.borderRadius = `50px`;
                    el.style.backgroundSize = '100%';

                    const markerInstance = new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .addTo(map);

                    // Create a popup, but don't add it to the map yet.
                    const popup = new mapboxgl.Popup({
                        closeButton: false,
                        closeOnClick: false
                    });

                    // Add event listeners to each marker instance
                    markerInstance.getElement().addEventListener('mouseenter', () => {
                        // Change the cursor style as a UI indicator.
                        map.getCanvas().style.cursor = 'pointer';

                        // Copy coordinates array.
                        const coordinates = marker.geometry.coordinates.slice();
                        const { name, username, occupation, profileURL } = marker.properties.userData;

                        // Ensure that if the map is zoomed out such that multiple
                        // copies of the feature are visible, the popup appears
                        // over the copy being pointed to.
                        while (Math.abs(map.getCenter().lng - coordinates[0]) > 180) {
                            coordinates[0] += map.getCenter().lng > coordinates[0] ? 360 : -360;
                        }

                        const popupContent = `<div style="color: #000;text-align:center;width:200px;display:flex;justify-content:center" >
                                                <img style="object-fit: cover;width: 100px;height: 100px;border-radius:50px;" src="${profileURL}" alt="No Image">
                                                <div style="text-align:center;margin-top:5px;">
                                                    <strong style="font-size:15px">${name}</strong>
                                                    <div style="font-size:12px"><i>@${username}</i></div>
                                                    <div style="font-size:14px"><strong>${occupation}</strong></div>
                                                </div>
                                              </div>`

                        // Populate the popup and set its coordinates
                        // based on the feature found.
                        popup.setLngLat(coordinates).setHTML(popupContent).addTo(map);
                    });

                    markerInstance.getElement().addEventListener('mouseleave', () => {
                        map.getCanvas().style.cursor = '';
                        popup.remove();
                    });
                }
            })
        }
    }, []);

    return (
        <div>
            <Box id="map" height={'70vh'} width='100%' ></Box>
        </div>
    )
}

export default EarthMapBox