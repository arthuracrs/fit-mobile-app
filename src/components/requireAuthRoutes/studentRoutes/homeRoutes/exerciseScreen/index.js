import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useState, useEffect, useContext } from "react";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";

import Circle from './circle'
import { GeneralStateContext } from '../../../../context'

export default function ExerciseScreen({ navigation, route }) {
  const { t } = useTranslation();
  const contextData = useContext(GeneralStateContext);
  const { exerciseIndex, workoutIndex } = route.params

  const exercise = contextData.userData.student.currentSchedule.workoutsList[workoutIndex].exercisesList[exerciseIndex]

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
          <Text style={styles.doneText}>{t("StudentExerciseScreen.done")} - <Ionicons name="checkmark-circle" size={24} color="green" /></Text >
          : <Text style={styles.doneText}>{t("StudentExerciseScreen.pendent")}</Text>
        }
      </View >)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{backgroundColor: 'red'}}>
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
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.title}>{exercise.exerciseModelId.name}</Text>
            <DoneSign done={exercise.done} />
          </View>
          <View style={styles.circles}>
            <Circle number={exercise.repetitions} text={t("StudentExerciseScreen.repetitions")} />
            <Circle number={exercise.series} text={t("StudentExerciseScreen.series")} />
          </View>
          <View style={styles.interval}>
            <MaterialCommunityIcons name="clock" size={40} color="black" />
            <Text style={styles.intervalText}>  {t("StudentExerciseScreen.interval")}: {exercise.interval} {t("StudentExerciseScreen.seconds")}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}> Descrição:</Text>
            <Text style={styles.description}> {exercise.description}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoContainer: {
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
  descriptionContainer: {
    textAlign: 'left',
    paddingTop: 20,
    paddingBottom: 150
  },
  description: {
    textAlign: 'left',
    fontSize: 20,
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
