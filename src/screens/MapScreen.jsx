import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';
import MapView, { MapPolygon, Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import * as geolib from 'geolib';
import 'react-native-get-random-values';
import GetLocation from 'react-native-get-location'



export default function MapScreen() {
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [marker, setMarker]=useState();
  const [permissionGranted, setPermissionGranted]=useState(false);

  async function moveToLocation(latitude, longitude) {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.115,
        longitudeDelta: 0.1121,
      },
      2000
    );
  }

  const myPolygon = [
    { latitude: 24.859740138673146, longitude: 67.00020588934422 },
    { latitude: 24.859832314062654, longitude: 67.00118221342564 },
    { latitude: 24.858941586630607, longitude: 67.00109671801329 },
    { latitude: 24.85908882480448, longitude: 67.00024176388979 },
    { latitude: 24.859836268780807, longitude: 67.00014386326075 },
    { latitude: 24.859740138673146, longitude: 67.00020588934422 }, // Closing the polygon by repeating the first point
  ];
  function _locationLieInsidePolygon(coordinate){
    let bol =geolib.isPointInPolygon(coordinate, myPolygon);
    console.log("_locationLieInsidePolygon=>",bol)
  }
  
  return (

    <View style={styles.container}>
    {/* Header Section */}
    <View style={styles.header}>
        <Text style={styles.headerText}>GeoFanc</Text>
    </View>
    <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    }}>
       
        
    </View>
 


    {/* Content Section */}


    <View style={styles.content}>
    <View style={styles.container2}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <GooglePlacesAutocomplete
            placeholder="Origin"
            fetchDetails
            onPress={(data, details = null) => {
              const location = details?.geometry?.location;
              if (location) {
                const originCoordinates = {
                  latitude: location.lat,
                  longitude: location.lng,
                };
                setOrigin(originCoordinates);
                moveToLocation(location.lat, location.lng);
              }
            }}
            query={{
              key: 'AIzaSyA_UORejUxgzC5jHiFmaxGG9rnr1gGVQzc',
              language: 'en',
            }}
            onFail={(error) => console.error(error)}
          />
        </View>
        <View style={styles.searchBox}>
          <GooglePlacesAutocomplete
            placeholder="Destination"
            fetchDetails 
            onPress={(data, details = null) => {
              const location = details?.geometry?.location;
              if (location) {
                const destinationCoordinates = {
                  latitude: location.lat,
                  longitude: location.lng,
                };
                setDestination(destinationCoordinates);
                moveToLocation(location.lat, location.lng);
              }
            }}
            query={{
              key: 'AIzaSyA_UORejUxgzC5jHiFmaxGG9rnr1gGVQzc',
              language: 'en',
            }}
            onFail={(error) => console.error(error)}
          />
        </View>
      </View>
      <MapView
        ref={mapRef}
        onPress={
           e => {
            console.log(e.nativeEvent.coordinate);
            setMarker(e.nativeEvent.coordinate);
            _locationLieInsidePolygon(e.nativeEvent.coordinate);


           }
        }
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 24.8607,
          longitude: 67.0011,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >


      <Polygon
      strokeColor="red"
      fillColor='transparent'
      strokeWidth={2}
      coordinates={myPolygon}/>

{marker !== undefined ? (<Marker coordinate={marker}></Marker>):null}
        {origin && <Marker coordinate={origin} title="Origin" />}
        {destination && <Marker coordinate={destination} title="Destination" />}
        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey="AIzaSyA_UORejUxgzC5jHiFmaxGG9rnr1gGVQzc"
          />
        )}
      </MapView>
    </View>
       
    </View>


    

    {/* Save Button */}
    <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}> Get Location</Text>
    </TouchableOpacity>
</View>
   
  );
}

const styles = StyleSheet.create({
  container2: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: "100%",
      },
  map: {
    ...StyleSheet.absoluteFillObject,
    width:"100%"
  },
  searchContainer: {
    zIndex: 1,
    marginTop: 22,
    width: '90%',
    flexDirection: 'row',
    flex: 0.5,
    marginHorizontal:23
  },
  searchBox: {
    flex: 0.5,
    margin:3
  },
  container: {
    width:"100%",
    height:800,
    alignItems: 'center',
    backgroundColor: '#DADADAFF',
},
header: {
    padding: 15,
    backgroundColor: '#185AD6FF',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
},
headerText: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
    letterSpacing: 1,
},
content: {
    marginVertical: 10,
    
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: '95%',
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    height:600
},
label: {
    fontSize: 18,
    marginVertical: 5,
    color: '#185AD6FF',
    fontFamily: 'sans-serif',
},
header1: {
    width: '100%',
    alignItems: 'center',
},
saveButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#185AD6FF',
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
},
btn: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#185AD6FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
},
btnText: {
    color: '#185AD6FF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
},
BlueButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#185AD6FF',
    borderRadius: 30,
    width: '40%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
},
saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
},
Heading: {
    fontSize: 22,
    color: '#0B33B8FF',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
},
});
