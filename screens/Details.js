import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const jsondata = require('../assets/data.json');
const Details = ({ route, navigation }) => {
  const { PID } = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = jsondata.find(item => item.ID === PID);
        setData(item);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [PID]);

  return (
    <View style={styles.container}>
      <View style={styles.Mainheader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
       <Text style={styles.title}> Explanation</Text>
      </View>  
      {data ? (
        <View style={styles.content}>
          <Text style={styles.title1}>{data.IPA}</Text>
          <Text style={styles.examples}>{data.Examples}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 100,
  },
  content: {
    alignItems: 'center',
  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  examples: {
    fontSize: 18,
  },
});

export default Details;
