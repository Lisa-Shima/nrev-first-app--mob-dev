import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Count</Text>
      <Text style={styles.counterText}>{count}</Text>

      <Pressable
      style={styles.button}
      onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>Increment</Text>
      </Pressable>
    </View>
  );
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
  }
});
