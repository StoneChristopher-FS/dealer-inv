import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Vehicle from './pages/Vehicle';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Inventory' component={Inventory} />
        <Stack.Screen name='Vehicle' component={Vehicle} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}