import { Text, Dimensions, StyleSheet, View, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const {width:SCREEN_WIDTH} = Dimensions.get("window");

export default function App() {
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    console.log(permission)
  }

  useEffect(()=>{
    ask();
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
