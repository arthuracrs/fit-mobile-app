import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useState, useEffect } from "react";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import Circle from '../../components/circle'

export default function ExerciseScreen({ navigation, route }) {

  const { exercise } = route.params

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

  console.log()

  return (
    <View style={styles.container}>
      {exercise.exerciseModelId.media.map((image, index) => {
        return (
          <Image
            key={index}
            style={styles.image}
            source={{ uri: image.url }}
          />
        )
      })}

      <View>
        <Text style={styles.title}>{exercise.name}</Text>
        <DoneSign done={exercise.done} />
      </View>
      <View style={styles.circles}>
        <Circle number={exercise.repetitions} text='Repetitions' />
        <Circle number={exercise.series} text='Series' />
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
  circles: {
    marginTop: 50,
    flexDirection: 'row',
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
