import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useState, useEffect } from "react";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function ExerciseScreen({ navigation, route }) {

  const { exercise } = route.params
  const title = 'Push up';

  function DoneSign({ done }) {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
      },
      doneText: {
        fontSize: 18,
        color: 'gray',
      }
    });

    return (
      <View>
        {done ?
          <Text style={styles.doneText}> Done - <Ionicons name="checkmark-circle" size={24} color="green" /></Text >
          : <Text style={styles.doneText}>Pendent</Text>
        }
      </View >)
  }

  function Series({ series }) {
    const styles = StyleSheet.create({
      seriesCircle: {
        borderColor: 'gray',
        borderWidth: 5,
        borderRadius: 100,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
      },
      seriesView: {
        width: 100,
        height: 100,
        alignItems: 'center'
      },
      seriesText: {
        fontWeight: '700',
        fontSize: 18,
        color: 'gray',
      },
    });

    return (
      <View style={styles.seriesView}>
        <View style={styles.seriesCircle}>
          <Text style={styles.seriesText}>{series}</Text>
        </View>
        <Text style={styles.seriesText}>Series</Text>
      </View>
    )
  }

  function Repetitions({ repetitions }) {
    const styles = StyleSheet.create({
      repetitionsCircle: {
        borderColor: 'gray',
        borderWidth: 5,
        borderRadius: 100,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
      },
      repetitionsView: {
        width: 110,
        height: 110,
        alignItems: 'center'
      },
      repetitionsText: {
        fontWeight: '700',
        fontSize: 18,
        color: 'gray',
      },
    });

    return (
      <View style={styles.repetitionsView}>
        <View style={styles.repetitionsCircle}>
          <Text style={styles.repetitionsText}>{repetitions}</Text>
        </View>
        <Text style={styles.repetitionsText}>Repetitions</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/7471e64bf36dd74cb4c52b2dec40690b-1605191302/5%20workout%20gif/create-workout-exercise-gif-animation-in-photoshop.gif" }}
      />
      <View>
        <Text style={styles.title}>{exercise.name}</Text>
        <DoneSign done={exercise.done} />
      </View>
      <View style={styles.circles}>
        <Repetitions repetitions={exercise.repetitions} />
        <Series series={exercise.series} />
      </View>
      <View style={styles.interval}>
        <MaterialCommunityIcons name="clock" size={40} color="black" />
        <Text style={styles.intervalText}> Interval {exercise.interval} Seconds</Text>
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
  image: {
    height: 300,
    resizeMode: 'cover'
  },
  circles:{
    marginTop: 50,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  interval: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  intervalText: {
    fontSize: 20,
    color: 'gray',
    alignSelf: 'center'
  },
});
