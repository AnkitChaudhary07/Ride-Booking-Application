import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* First Section 70% */}
      <View style={styles.firstSection}>
        <View style={styles.topBar}>
          <Ionicons name="menu" size={30} style={styles.menu} />

          {/* Search Bar */}
          <TextInput style={styles.searchBar} placeholder="Search..." />
        </View>
      </View>

      {/* Second Section 30% */}
      <View style={styles.secondSection}>
        <Text>Second section</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  //   First Section
  firstSection: {
    flex: 0.7,
  },
  topBar: {
    flexDirection: "row",
  },
  menu: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    margin: 6,
  },
  searchBar: {
    flex: 1, // Takes the remaining width
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  //   Second Section
  secondSection: {
    flex: 0.3,
  },
});
