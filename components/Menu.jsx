import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Menu = ({ onClose }) => {
  return (
    <View style={styles.menuContainer}>
      {/* Close button */}
      <TouchableOpacity onPress={onClose}>
        <Ionicons
          name="close"
          size={30}
          color="#000"
          style={styles.closeIcon}
        />
      </TouchableOpacity>

      {/* Menu Items with Icons */}
      <View style={styles.menuItem}>
        <Ionicons name="person-outline" size={24} style={styles.icon} />
        <Text style={styles.menuText}>Profile</Text>
      </View>

      <View style={styles.menuItem}>
        <Ionicons name="time-outline" size={24} style={styles.icon} />
        <Text style={styles.menuText}>History</Text>
      </View>

      <View style={styles.menuItem}>
        <Ionicons name="help-circle-outline" size={24} style={styles.icon} />
        <Text style={styles.menuText}>Support</Text>
      </View>

      <View style={styles.menuItem}>
        <Ionicons
          name="information-circle-outline"
          size={24}
          style={styles.icon}
        />
        <Text style={styles.menuText}>About</Text>
      </View>

      <View style={styles.menuItem}>
        <Ionicons name="settings-outline" size={24} style={styles.icon} />
        <Text style={styles.menuText}>Settings</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingLeft: 20,
  },
  closeIcon: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 20,
    color: "#000",
  },
  menuText: {
    fontSize: 18,
    color: "#000",
  },
});

export default Menu;
