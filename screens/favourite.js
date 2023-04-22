import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const data = require("../assets/data.json");
const FavouriteScreen = ({ navigation, route }) => {
  const { UID } = route.params;
  const [titles, setTitles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const response = await fetch(
          "https://sxu2906.uta.cloud/getFavorites.php",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.json();

        if (res.status === "success") {
          const { favorites } = res;
          const vowelData = data.filter((item) => {
            for (const key in item) {
              if (
                typeof item[key] === "string" &&
                favorites.includes(item.ID.toString())
              ) {
                return true;
              }
            }
            return false;
          });
          setTitles(vowelData);
        } else if (
          res.status === "error" &&
          res.message === "Failed to fetch favourite"
        ) {
          Alert.alert("Failed to fetch favourite");
        } else if (res.status === "error" && res.message === "No Records") {
          Alert.alert("No favorites", UID);
        } else {
          Alert.alert("Failed");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchIds();
  }, []);

  const handleTilePress = (PID) => {
    navigation.navigate("Details", { PID });
  };

  const filteredData = titles.filter((item) => {
    if (!searchQuery) {
      return true;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      item.IPA.toLowerCase().includes(lowerCaseQuery) ||
      item.Examples.toLowerCase().includes(lowerCaseQuery)
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.Mainheader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>
          Favorites with "{searchQuery}" in IPA or Examples
        </Text>
      </View>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />
      </View>

      <ScrollView contentContainerStyle={styles.tilesContainer}>
        {filteredData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tile}
            onPress={() => handleTilePress(item.ID)}
          >
            <Text style={styles.tileTitle}>{item.IPA}</Text>
            <Text style={styles.tileSubtitle}>{item.Examples}</Text>
            <Text style={styles.tileSubtitle}>{item.Type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  Mainheader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginLeft: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 30,
  },
  tilesContainer: {
    paddingBottom: 16,
  },
  tile: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tileSubtitle: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default FavouriteScreen;
