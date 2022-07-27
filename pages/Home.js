import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button } from 'react-native';

export default function Home({navigation}) {
  return (
    <SafeAreaView>
      <Text>The Auto Haus</Text>
      <Button title='See our Inventory!' onPress={() => navigation.navigate('Inventory')} />
    </SafeAreaView>
  );
}