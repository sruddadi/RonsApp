import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";

const videos = [
  {
    id: "n4NVPg2kHv4",
    title: "English Pronounciation Training",
  },
  { id: "dZGf8JY5_ck", title: "English Imitation Lessons" },
  { id: "nUccn2K0fjw", title: "Silent Letters" },
  { id: "VwrQR7k_osA", title: "10 Most Difficult Adjectives" },
  { id: "wCkONOv2JJM", title: "How to Pronounce TH" },
  { id: "69DwHUg2f7s", title: "English | Vowel Sounds" },
  { id: "DyAp3-H62ow", title: "3 Simple Pronounciation Tips" },
  { id: "dxh-gfy_Rp0", title: "8 favorite English Adjectives" },
  { id: "XAIoSYqzGkY", title: "Pronounce English Words" },
  { id: "efNSXTGkAsE", title: "Word Stress in English" },
  { id: "8El7SM_pHRU", title: "10 Advanced English Words" },
  { id: "TafO43sy88E", title: "English Accents" },
  { id: "c9komGZkIQQ", title: "Tongue Twister Challenge" },
];
const videos2 = [
  {
    id: "dZGf8JY5_ck",
    title: "English Imitation Lessons",
  },
  { id: "T91p6pTPpSY", title: "Speak English Clearly" },
  { id: "FfhZFRvmaVY", title: "Advanced Speaking Practice" },
  { id: "QxQUapA-2w4", title: "The Sounds of English" },
  { id: "tw25CM1MXlU", title: "10 Words You're Mispronouncing" },
  { id: "CdCKgQQWNv8", title: "How to Sound Better in English" },
  { id: "-P-5RC17BHw", title: "Daily Practice for Better Accent" },
  { id: "XzkbcWh8s4w", title: "Prepositions of PLACE" },
  { id: "VcONw2BBfb8", title: "Pronounciation Training" },
  { id: "CuuY9DYE2Ok", title: "English in 30 mins" },
  { id: "Tj1w86bw4EM", title: "Introduce yourself with EASE" },
  { id: "8El7SM_pHRU", title: "Advanced English Mispronouncing" },
  { id: "XAIoSYqzGkY", title: "Pronounce Words Correctly" },
];
const videos3 = [
  {
    id: "ZTgYjGXFAkw",
    title: "Consonant Sound Dark L",
  },
  { id: "1G8SCotE2yg", title: "Consonant Sound /j/" },
  { id: "nMB5mX_PGHQ", title: "Consonant Sound /w/" },
  { id: "zJJ3hhHtjtI", title: "Consonant Sound /d3/" },
  { id: "WoyI_omRpcw", title: "Consonant Sound /t/" },
  { id: "dV6At0g4n78", title: "Consonant Sound /h/" },
  { id: "k8ImSmVOSVA", title: "Consonant Sound /3/" },
];
const Thumbnail = ({ video, onPress }) => {
  return (
    <TouchableOpacity style={styles.videoContainer} onPress={onPress}>
      <Image
        source={{ uri: `https://img.youtube.com/vi/${video.id}/0.jpg` }}
        style={styles.thumbnail}
      />
      <Text style={styles.videoTitle}>{video.title}</Text>
    </TouchableOpacity>
  );
};

const YouVidScreen = ({ navigation, route }) => {
  const handleThumbnailPress = (video, sectionTitle) => {
    navigation.navigate("YouVid", {
      videoId: video.id,
      sectionTitle,
    });
  };
  const { videoId, sectionTitle } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="caret-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{sectionTitle}</Text>
        <View />
      </View>
      <YoutubePlayer height={300} play={true} videoId={videoId} />
      <View style={styles.videoTitleContainer}>
        <Text style={styles.videoHeading}>Related Videos</Text>
      </View>
      <ScrollView style={styles.videoContainer}>
        <View>
          {sectionTitle === "Pronunciation Guide" && (
            <View style={styles.thumbnailsContainer}>
              {videos.map((video) => (
                <Thumbnail
                  key={video.id}
                  video={video}
                  onPress={() =>
                    handleThumbnailPress(video, "Pronunciation Guide")
                  }
                />
              ))}
            </View>
          )}
          {sectionTitle === "Recommended" && (
            <View style={styles.thumbnailsContainer}>
              {videos2.map((video) => (
                <Thumbnail
                  key={video.id}
                  video={video}
                  onPress={() => handleThumbnailPress(video, "Recommended")}
                />
              ))}
            </View>
          )}
          {sectionTitle === "Sounds American" && (
            <View style={styles.thumbnailsContainer}>
              {videos3.map((video) => (
                <Thumbnail
                  key={video.id}
                  video={video}
                  onPress={() => handleThumbnailPress(video, "Sounds American")}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 450,
  },
  headerContainer: {
    paddingTop: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  videoContainer: {
    top: -60,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
  },
  videoHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    right: -18,
  },
  videoTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  thumbnailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  videoContainer: {
    marginBottom: 20,
  },
  videoTitleContainer: {
    top: -40,
    marginBottom: -30,
  },
  thumbnail: {
    width: 380,
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    height: 1000,
  },
});

export default YouVidScreen;
