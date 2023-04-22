import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView,  TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
const data = require('../assets/data.json');
const Titles = ({ route,navigation }) => {
  const [titles, setTitles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { UID } = route.params; 
  useEffect(() => {
    const consonantData = data.filter((item) => {
      for (const key in item) {
        if (typeof item[key] === "string" && item[key].includes("Consonant","consonant")) {
          return true;
        }
      }
      return false;
    });
       setTitles(consonantData);
  }, []);
  const handleTilePress = (PID) => {
    navigation.navigate("Details", { UID, PID, titles });
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
        Consonants with "{searchQuery}" in IPA or Examples
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
  Mainheader:{
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

export default Titles;
