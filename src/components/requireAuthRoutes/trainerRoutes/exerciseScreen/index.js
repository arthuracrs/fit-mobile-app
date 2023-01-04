import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useState, useEffect, useContext } from "react";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";

import Circle from './circle'
import { GeneralStateContext } from '../../../../context'

export default function ExerciseScreen({ navigation, route }) {
  const contextData = useContext(GeneralStateContext);
  const { exerciseIndex, workoutIndex, studentIndex } = route.params
  const { t } = useTranslation();
  const exercise = contextData.trainerStudents[studentIndex].currentSchedule.workoutsList[workoutIndex].exercisesList[exerciseIndex]
  
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
          <Text style={styles.doneText}> {t("TrainerExerciseScreen.done")} - <Ionicons name="checkmark-circle" size={24} color="green" /></Text >
          : <Text style={styles.doneText}>{t("TrainerExerciseScreen.pendent")}</Text>
        }
      </View >)
  }

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
        <Text style={styles.title}>{exercise.exerciseModelId.name}</Text>
        <DoneSign done={exercise.done} />
      </View>
      <View style={styles.circles}>
        <Circle number={exercise.repetitions} text={t("TrainerExerciseScreen.repetitions")} />
        <Circle number={exercise.series} text={t("TrainerExerciseScreen.series")} />
      </View>
      <View style={styles.interval}>
        <MaterialCommunityIcons name="clock" size={40} color="black" />
        <Text style={styles.intervalText}> {t("TrainerExerciseScreen.interval")} {exercise.interval} {t("TrainerExerciseScreen.seconds")}</Text>
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
    fontSize: 30,
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
