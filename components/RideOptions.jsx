import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Mock data for available rides with driver and car info
const availableRides = [
  {
    id: "1",
    carType: "Sedan",
    estimatedFare: "₹200",
    estimatedTime: "5 min",
  },
  {
    id: "2",
    carType: "SUV",
    estimatedFare: "₹300",
    estimatedTime: "7 min",
  },
  {
    id: "3",
    carType: "Luxury",
    estimatedFare: "₹500",
    estimatedTime: "10 min",
  },
  {
    id: "4",
    carType: "Bike",
    estimatedFare: "₹100",
    estimatedTime: "3 min",
  },
  {
    id: "5",
    carType: "Hatchback",
    estimatedFare: "₹180",
    estimatedTime: "6 min",
  },
  {
    id: "6",
    carType: "Electric",
    estimatedFare: "₹220",
    estimatedTime: "8 min",
  },
  {
    id: "7",
    carType: "Van",
    estimatedFare: "₹400",
    estimatedTime: "12 min",
  },
  {
    id: "8",
    carType: "Mini",
    estimatedFare: "₹150",
    estimatedTime: "4 min",
  },
  {
    id: "9",
    carType: "Micro",
    estimatedFare: "₹120",
    estimatedTime: "3 min",
  },
  {
    id: "10",
    carType: "Pickup Truck",
    estimatedFare: "₹450",
    estimatedTime: "15 min",
  },
];

// RideOption component to display individual ride details
const RideOption = ({ carType, estimatedFare, estimatedTime, onPress }) => {
  return (
    <TouchableOpacity style={styles.rideOption} onPress={onPress}>
      <View style={styles.rideInfo}>
        {/* Car Type Icon */}
        <Ionicons
          name="car-outline"
          size={30}
          color="#000"
          style={styles.carIcon}
        />

        {/* Ride Details */}
        <View>
          <Text style={styles.carType}>{carType}</Text>
          <Text style={styles.fare}>Estimated Fare: {estimatedFare}</Text>
          <Text style={styles.eta}>ETA: {estimatedTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Detailed information for the selected ride
const RideDetails = ({ selectedRide }) => {
  const confirmRide = () => {
    Alert.alert("Thank you", "Ride confirmed", [{ text: "OK" }]);
  };
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailHeader}>Ride Details</Text>
      <Text style={styles.detailText}>Car Type: {selectedRide.carType}</Text>
      <Text style={styles.detailText}>Driver: Ankit</Text>
      <Text style={styles.detailText}>Car Number: UK07 AC1287</Text>
      <Text style={styles.detailText}>
        Estimated Fare: {selectedRide.estimatedFare}
      </Text>
      <Text style={styles.detailText}>ETA: {selectedRide.estimatedTime}</Text>

      {/* Confirm Ride Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmRide}>
        <Text style={styles.confirmButtonText}>Confirm Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

// AvailableRidesList component to display all ride options using ScrollView
const AvailableRidesList = () => {
  const [selectedRide, setSelectedRide] = useState(null);

  return (
    <View style={styles.container}>
      {/* If a ride is selected, show the ride details, otherwise show the list */}
      {selectedRide ? (
        <RideDetails selectedRide={selectedRide} />
      ) : (
        <>
          <Text style={styles.headerText}>Available Rides</Text>

          {/* Use ScrollView to display ride options */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {availableRides.map((item) => (
              <RideOption
                key={item.id}
                carType={item.carType}
                estimatedFare={item.estimatedFare}
                estimatedTime={item.estimatedTime}
                onPress={() => setSelectedRide(item)} // Set the selected ride when clicked
              />
            ))}
          </ScrollView>
        </>
      )}

      {/* Back Button to return to the list of rides */}
      {selectedRide && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedRide(null)}
        >
          <Text style={styles.backButtonText}>Back to Rides</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  rideOption: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  rideInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  carIcon: {
    marginRight: 15,
  },
  carType: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fare: {
    color: "#333",
    marginTop: 2,
  },
  eta: {
    color: "#555",
    marginTop: 2,
  },
  detailContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
  },
  detailHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#000000", // Button color
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff", // Text color
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AvailableRidesList;
