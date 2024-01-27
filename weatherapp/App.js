import { Text, Dimensions, StyleSheet, View, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import 'react-native-get-random-values';


const {width:SCREEN_WIDTH} = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("loading...");
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
  
    if (!granted) {
      setOk(false);
      return;
    }
  
    const locationCoord = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = locationCoord.coords;
  
    try {
      // Using the Place Autocomplete service to get place details based on coordinates
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
  
      if (!response.ok) {
        // Handle the error, e.g., log it or set state to indicate an issue
        console.error("Failed to fetch place details");
        return;
      }
  
      const data = await response.json();
  
      if (data.predictions && data.predictions.length > 0) {
        const placeId = data.predictions[0].place_id;
  
        // Use the Place Details service to get detailed information about the place
        const detailsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=YOUR_GOOGLE_MAPS_API_KEY`
        );
  
        if (detailsResponse.ok) {
          const detailsData = await detailsResponse.json();
          const address = detailsData.result.formatted_address;
  
          // Now you have the address information
          console.log(address);
        }
      }
    } catch (error) {
      // Handle any errors that may occur during the fetch requests
      console.error("Error fetching place details:", error);
    }
  };

  useEffect(()=>{
    getWeather();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style = {styles.cityName}>Seoul</Text>
      </View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}> 27 </Text>
          <Text style={styles.description}> Sunny </Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}> 27 </Text>
          <Text style={styles.description}> Sunny </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: "tomato"
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500"
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    fontSize: 60,
    marginTop: -30
  }
});
