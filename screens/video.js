import React, { useState } from "react";
import { View, Image, TouchableHighlight, StyleSheet } from "react-native";
// import YouTube from "react-native-youtube";

const YouTubeThumbnailPlayer = () => {
  const [playing, setPlaying] = useState(false);

  const handlePlayPress = () => {
    setPlaying(true);
  };

  return (
    <View style={styles.container}>
      {!playing ? (
        <TouchableHighlight onPress={handlePlayPress}>
          <Image
            source={{
              uri: "https://img.youtube.com/vi/{fODwylBuF38}/hqdefault.jpg",
            }}
            style={styles.thumbnailImage}
          />
        </TouchableHighlight>
      ) : (
        <YouTube
          videoId="{fODwylBuF38}" // Replace with your YouTube video ID
          style={styles.youtubePlayer}
          play={true}
          onChangeState={(event) => {
            if (event.state === "ended") {
              setPlaying(false);
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailImage: {
    width: 320,
    height: 180,
  },
  youtubePlayer: {
    alignSelf: "stretch",
    height: 300,
  },
});

export default YouTubeThumbnailPlayer;
