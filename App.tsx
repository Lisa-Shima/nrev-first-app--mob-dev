import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Define the params each screen expects
type RootStackParamList = {
  Home: undefined;
  Settings: { count: number };
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        {/* Home screen: our counter */}
        <Stack.Screen name='Home' component={HomeScreen} />
        {/* Setting screen: shows the counter */}
        <Stack.Screen name='Settings' component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

function HomeScreen({ navigation }: Props){
  const [count, setCount] = useState(0)

  // load and save
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('@counter_value')
      if(saved !== null) setCount(Number(saved))
    })()
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('@counter_value', count.toString())
  }, [count])

  return(
    <View style={styles.container}>
      <Text style={styles.heading}>Home: Counter</Text>
      <Text style={styles.counterText}>{count}</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={() => setCount(count + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => setCount(count - 1)}>
          <Text style={styles.buttonText}>–</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => setCount(0)}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      {/* Navigating to settings passing the count */}
      <Pressable style={[styles.button, {marginTop: 30}]} onPress={() => navigation.navigate('Settings', { count })}>
        <Text style={styles.buttonText}>Go to Settings</Text>
      </Pressable>

    </View>
  )
}

type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>

function SettingsScreen({ route, navigation } : SettingsProps){
  const { count } = route.params

  return(
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.counterText}>Current count: {count}</Text>

      <Pressable style={[styles.button, {marginTop: 30}]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20
  },
  counterText: {
    fontSize: 48,
    marginVertical: 20
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#007AFF'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20
  }
});
