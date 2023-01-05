import { useContext, useEffect, useState } from "react";
import { TextInput, View, Text, ScrollView, Button } from 'react-native'

import { apiCall } from '../../../services/apiCalls'
import { Auth } from '../../../services/authentication'
import { GeneralStateContext } from '../../../context'

export default function MissingFieldsForm({ missingFields }) {
    const contextData = useContext(GeneralStateContext);
    const authContext = useContext(Auth.AuthenticationContext)

    const [newUserData, setNewUserData] = useState({})

    const submit = async () => {
        apiCall.updateUser(authContext.token, newUserData)
            .then(response => {
                console.log('updateUser | sucesso')
                contextData.setShouldLoadUser(x => !x)
            })
            .catch(error => {
                console.log('updateUser | error')
                console.log(error)
            })

    }

    const fields = {
        username: () => {
            const [username, setUsername] = useState('')

            return (
                <View key={'username'} style={{
                    marginVertical: 10,
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    // backgroundColor: 'rgba(0,0,0,.03)',
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    borderColor: 'gray',
                }}>
                    <Text style={{
                        marginBottom: 10,
                        fontSize: 18
                    }}>Nome:</Text>
                    <TextInput
                        style={{
                            borderWidth: 2,
                            borderColor: 'gray',
                            padding: 15,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            marginHorizontal: 10
                        }}
                        onChangeText={text => {
                            setUsername(text)
                            setNewUserData(x => ({ ...x, username: text }))
                        }}
                        value={username}
                        placeholder="Digite seu Nome"
                    />
                </View>)
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 20,
            paddingTop: 60,
            paddingBottom: 60,
        }}>
            <Text style={{
                fontSize: 30,
                paddingBottom: 30
            }}>
                Parece que algumas informações suas estão faltando ser preechidas
            </Text>
            <ScrollView>
                {missingFields.map(
                    fieldName => fields[fieldName]()
                )}
            </ScrollView>
            <Button
                title='Terminei'
                onPress={submit}
            />
        </View>)
}