import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AvailableRidesList from "../components/RideOptions";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Menu from "../components/Menu"; // Import the Menu component

const HomeScreen = () => {
  const [showRides, setShowRides] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // Control visibility of menu
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [pickupText, setPickupText] = useState("");
  const [dropoffText, setDropoffText] = useState("");

  // Request user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&addressdetails=1&limit=5`
    );
    const data = await response.json();
    setSuggestions(data);
  };

  const handleSuggestionSelect = (suggestion, type) => {
    const location = {
      latitude: parseFloat(suggestion.lat),
      longitude: parseFloat(suggestion.lon),
    };

    if (type === "pickup") {
      setPickupText(suggestion.display_name);
      setPickupLocation(location);
    } else if (type === "dropoff") {
      setDropoffText(suggestion.display_name);
      setDropoffLocation(location);
    }

    setRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    setSuggestions([]);
  };

  // Create shared value for animation
  const menuOffset = useSharedValue(-300); // Initially hidden

  // Animated style for menu
  const menuStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: menuOffset.value }],
    };
  });

  const toggleMenu = () => {
    if (menuVisible) {
      menuOffset.value = withTiming(-300); // Hide menu
    } else {
      menuOffset.value = withTiming(0); // Show menu
    }
    setMenuVisible(!menuVisible); // Toggle visibility state
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Menu */}
      <Animated.View style={[styles.menuContainer, menuStyle]}>
        <Menu onClose={toggleMenu} />
      </Animated.View>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.firstSection}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={toggleMenu}>
              <Ionicons name="menu" size={20} style={styles.menu} />
            </TouchableOpacity>

            <TextInput
              style={styles.pickupBar}
              placeholder="Pickup location..."
              value={pickupText}
              returnKeyType="search"
              onChangeText={(text) => {
                setPickupText(text);
                fetchSuggestions(text);
              }}
            />
          </View>

          {region ? (
            <MapView
              style={styles.map}
              region={region}
              showsUserLocation={true}
              showsMyLocationButton={true}
            >
              {pickupLocation && (
                <Marker coordinate={pickupLocation} title="Pickup Location" />
              )}
              {dropoffLocation && (
                <Marker
                  coordinate={dropoffLocation}
                  title="Drop-off Location"
                />
              )}
            </MapView>
          ) : (
            <Text>Loading map...</Text>
          )}
        </View>

        <View style={styles.secondSection}>
          <TextInput
            style={styles.dropoffBar}
            placeholder="Drop-off location..."
            value={dropoffText}
            returnKeyType="search"
            onChangeText={(text) => {
              setDropoffText(text);
              fetchSuggestions(text);
            }}
          />
          {distance && (
            <Text style={styles.distanceText}>Distance: {distance} km</Text>
          )}
          <TouchableOpacity
            style={styles.ridesButton}
            onPress={() => setShowRides((prevState) => !prevState)}
          >
            <Text style={styles.ridesButtonText}>
              {showRides ? "Hide Rides" : "Available Rides"}
            </Text>
          </TouchableOpacity>
          {showRides && <AvailableRidesList />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 300,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  firstSection: {
    flex: 0.7,
  },
  topBar: {
    flexDirection: "row",
    height: 50,
  },
  menu: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    margin: 6,
  },
  pickupBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  map: {
    flex: 1,
    marginTop: 10,
  },
  secondSection: {
    flex: 0.3,
    padding: 8,
  },
  dropoffBar: {
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 12,
  },
  distanceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  ridesButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  ridesButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
