import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";

const SplashScreen = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(0.3)).current; // Initial scale value

  useEffect(() => {
    // Start the zoom animation
    Animated.timing(scaleValue, {
      toValue: 1, // Final zoom scale (1 means full size)
      duration: 2500, // Duration of the animation (2 seconds)
      useNativeDriver: true, // Enable native driver for smoother animations
    }).start();

    // Navigate to HomeScreen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace("HomeScreen");
    }, 2000);

    // Clear timeout if component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/logo.webp")} // Replace with your local image
        style={[
          styles.image,
          {
            transform: [{ scale: scaleValue }], // Apply the scaling transformation
          },
        ]}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    borderRadius: 200,
  },
});
