import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
const jsondata = require("../assets/data.json");
const Details = ({ route, navigation }) => {
  const { PID } = route.params;
  const [data, setData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = jsondata.find((item) => item.ID === PID);
        setData(item);

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

          if (favorites.includes(item.ID.toString())) {
            setIsFavorite(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [PID]);

  const updateFavoriteStatus = async () => {
    try {
      if (isFavorite) {
        fetch("https://sxu2906.uta.cloud/deleteFavorites.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `PID=${PID}`,
        })
          .then((response) => response.text())
          .then((data) => {
            if (data === "Favorite deleted successfully") {
              Alert.alert("Success", "Removed from Favorite list", [
                {
                  text: "OK",
                },
              ]);
            } else if (
              data === "Failed to deleted Favorite. Please try again!"
            ) {
              Alert.alert(
                "Error",
                "Failed to deleted Favorite. Please try again!",
                [
                  {
                    text: "OK",
                  },
                ]
              );
            } else {
              Alert.alert("Error", "Failed to deleted Favorites");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        fetch("https://sxu2906.uta.cloud/updateFavorites.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `PID=${PID}&isFavorite=${!isFavorite}`,
        })
          .then((response) => response.text())
          .then((data) => {
            if (data === "Favorite added successfully") {
              Alert.alert("Success", " Added into Favorite list", [
                {
                  text: "OK",
                },
              ]);
            } else if (data === "Failed to add Favorite. Please try again!") {
              Alert.alert(
                "Error",
                "Failed to add Favorite. Please try again!",
                [
                  {
                    text: "OK",
                  },
                ]
              );
            } else {
              Alert.alert("Error", "Failed to add Favorites");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Mainheader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsFavorite(!isFavorite);
            updateFavoriteStatus();
          }}
        >
          <AntDesign
            name={isFavorite ? "star" : "staro"}
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
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
  Mainheader: {
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
    alignItems: "center",
  },
  title1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  examples: {
    fontSize: 18,
  },
});

export default Details;
