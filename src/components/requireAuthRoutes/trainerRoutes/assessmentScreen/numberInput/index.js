import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useTranslation } from "react-i18next";

export default function NumberInput({ fieldName, setFormState, formState }) {
    const { t } = useTranslation();
    return (
        <View key={fieldName} style={styles.inputNumber.container}>
            <Text style={styles.inputNumber.title}>
                {t("TrainerAssessmentScreen." + fieldName + ".title")}
                <Text style={styles.inputNumber.description}>
                    {t("TrainerAssessmentScreen." + fieldName + ".description")}
                </Text>:
            </Text>
            <TextInput
                style={styles.inputNumber.input}
                onChangeText={text => {
                    setFormState(x => ({ ...x, [fieldName]: text }))
                }}
                keyboardType='numeric'
                value={formState[fieldName]}
            />
        </View>)
}

const styles = StyleSheet.create({
    inputNumber: {
        container: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderColor: 'gray',
            flexDirection: 'row',
        },
        title: {
            marginBottom: 10,
            fontSize: 20,
            flex: 3,
        },
        description: {
            fontSize: 18,
            color: 'gray'
        },
        input: {
            fontSize: 20,
            textAlign: 'center',
            borderWidth: 2,
            borderColor: 'gray',
            padding: 10,
            borderRadius: 10,
            backgroundColor: 'white',
            marginHorizontal: 10,
            flex: 1,
        }
    },
});