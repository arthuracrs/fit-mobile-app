import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useState, useEffect } from "react";
import { MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';

export default function ExerciseScreen({ navigation }) {

  const title = 'Push up';

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/7471e64bf36dd74cb4c52b2dec40690b-1605191302/5%20workout%20gif/create-workout-exercise-gif-animation-in-photoshop.gif" }}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.doneText}>Done - <Ionicons name="checkmark-circle" size={24} color="green" /></Text>
      <Text style={styles.description}>3 Series X 10 repetições</Text>
      <View style={styles.interval}>
        <MaterialCommunityIcons name="clock" size={40} color="black" />
        <Text style={styles.intervalText}> - intervalo 30 Segundos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  },
  title: {
    fontSize: 40,
    fontWeight: '700'
  },
  doneText: {
    fontSize: 18,
    color: 'gray',
    paddingBottom: 20
  },
  image: {
    height: 300,
    resizeMode: 'cover'
  },
  interval: {
    flexDirection: 'row',
  },
  intervalText: {
    fontSize: 20,
    color: 'gray',
    alignSelf: 'center'
  },
  description: {
    fontSize: 20,
    color: 'gray'
  },
});
