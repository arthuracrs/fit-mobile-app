import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useTranslation } from "react-i18next";

export default function NumberInput({ fieldName, setFormState, editMode, formState }) {
    const { t } = useTranslation();
    return (
        <View key={fieldName} style={styles.inputNumber.container}>
            <Text style={styles.inputNumber.title}>
                {t("TrainerAssessmentScreen." + fieldName + ".title")}
            </Text>
            {editMode ?
                <View style={styles.inputNumber.inputContainer}>
                    <TextInput
                        style={styles.inputNumber.input}
                        onChangeText={text => {
                            setFormState(x => ({ ...x, [fieldName]: text.trim() }))
                        }}
                        editable
                        keyboardType='numeric'
                        maxLength={5}
                        value={`${formState[fieldName] ? formState[fieldName] : 0}`}
                    />
                </View>
                : <Text style={styles.inputNumber.value}>
                    {`${formState[fieldName] ? formState[fieldName] : '0'} ${t("TrainerAssessmentScreen." + fieldName + ".unit")}`}
                </Text>}
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
            fontSize: 22,
            textAlign: 'left',
            padding: 5,
            flex: 2,
        },
        description: {
            fontSize: 18,
            color: 'gray'
        },
        inputContainer: {
            padding: 5,
            borderRadius: 5,
            backgroundColor: 'white',
            marginHorizontal: 10,
            flex: 1,
            flexDirection: 'row'
        },
        input: {
            fontSize: 22,
            textAlign: 'center',
            flex: 1,
        },
        unit: {
            fontSize: 22,
            textAlign: 'center',
            flex: 1,
            backgroundColor: 'red',
            margin: 0
        },
        value: {
            fontSize: 22,
            textAlign: 'center',
            padding: 5,
            marginHorizontal: 10,
            flex: 1,
        }
    },
});