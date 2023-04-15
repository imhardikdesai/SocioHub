import { Box } from '@chakra-ui/react'
import mapboxgl from 'mapbox-gl';
import React, { useEffect } from 'react'
import { MapStyle } from '../../constant/URL';
import { GetAllUserLocation } from '../../utility/sociomap';

const EarthMapBox = () => {

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoibm92YWJpbDQ2NiIsImEiOiJjbGdnaDk5OWgwM2IzM2RwN3dhZW9tYXdrIn0.3ECgUtQ0bqNsbKe1ctDmIw';
        // const geojson = {
        //     'type': 'FeatureCollection',
        //     'features': [
        //         {
        //             'type': 'Feature',
        //             'properties': {
        //                 'message': 'Foo',
        //                 'iconSize': [60, 60]
        //             },
        //             'geometry': {
        //                 'type': 'Point',
        //                 'coordinates': [73.346301, 25.487987]
        //             }
        //         },
        //         {
        //             'type': 'Feature',
        //             'properties': {
        //                 'message': 'Bar',
        //                 'iconSize': [50, 50]
        //             },
        //             'geometry': {
        //                 'type': 'Point',
        //                 'coordinates': [81.285095, 22.260662]
        //             }
        //         },
        //         {
        //             'type': 'Feature',
        //             'properties': {
        //                 'message': 'Hardik desai',
        //                 'iconSize': [50, 50]
        //             },
        //             'geometry': {
        //                 'type': 'Point',
        //                 'coordinates': [72.6032779, 23.192825]
        //             }
        //         },
        //         {
        //             'type': 'Feature',
        //             'properties': {
        //                 'message': 'Baz',
        //                 'iconSize': [40, 40]
        //             },
        //             'geometry': {
        //                 'type': 'Point',
        //                 'coordinates': [78.103089, 11.982485]
        //             }
        //         }
        //     ]
        // };

        const map = new mapboxgl.Map({
            container: 'map',
            style: MapStyle,
            center: [72.6032779, 23.192825],
            zoom: 6
        });

        // Add markers to the map.

        GetAllUserLocation().then(res => {
            for (const marker of res) {
                const { geometry, properties } = marker
                const { profileURL } = properties.userData
                if (geometry.coordinates[0] === 0 || geometry.coordinates[1] === 0) {
                    continue
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

                el.addEventListener('click', () => {
                    window.alert(marker.properties.message);
                });

                // Add markers to the map.
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map);
            }
        })
    }, []);

    return (
        <div>
            <Box id="map" height={'70vh'} width='100%' ></Box>
        </div>
    )
}

export default EarthMapBox