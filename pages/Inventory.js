import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styles from '../Styles';
import Card from '../components/Card';

export default function Inventory({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState([]);
  const [data, setData] = useState({
    year: '',
    make: '',
    model: '',
    color: '',
    price: '',
    vin: '',
  });

  const onChangeYear = (value) => {
    setData({ ...data, year: value });
  };

  const onChangeMake = (value) => {
    setData({ ...data, make: value });
  };

  const onChangeModel = (value) => {
    setData({ ...data, model: value });
  };

  const onChangeColor = (value) => {
    setData({ ...data, color: value });
  };

  const onChangePrice = (value) => {
    setData({ ...data, price: value });
  };

  const onChangeVin = (value) => {
    setData({ ...data, vin: value });
  };

  useEffect(() => {
    getVehicle();
      const willFocusSubscription = navigation.addListener('focus', () => {
        getVehicle();
    });
    return willFocusSubscription;
  }, [])

  const getVehicle = async () => {
    try{
      const response = await
      fetch(`https://crud-api-fs.herokuapp.com/api/v1/inventory`)
      const json = await response.json()
      setVehicle(json)
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const saveData = () => {
    setLoading(true);

    fetch('https://crud-api-fs.herokuapp.com/api/v1/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        year: data.year,
        make: data.make,
        model: data.model,
        color: data.color,
        price: data.price,
        vin: data.vin
      }),
    })
      .then((response) => {
        setLoading(false)
        response.text();
        console.log(data)
      })
      .then(() => getVehicle())
      .catch((error) => console.log(error));
  };


  return (
    <SafeAreaView style={styles.main}>
      <Button title='Home' onPress={() => navigation.navigate('Home')} />
      <Text>Inventory:</Text>
      <FlatList
        data={vehicle}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Vehicle', {vin: item.vin})}>
            <Card data={item}/>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
        style={styles.list}
      />

      <TextInput
        placeholder={'Year'}
        onChangeText={(value) => onChangeYear(value)}
        style={[styles.input, styles.top]}
      />
      <TextInput
        placeholder={'Make'}
        onChangeText={(value) => onChangeMake(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={'Model'}
        onChangeText={(value) => onChangeModel(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={'Color'}
        onChangeText={(value) => onChangeColor(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={'Price'}
        onChangeText={(value) => onChangePrice(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={'VIN'}
        onChangeText={(value) => onChangeVin(value)}
        style={styles.input}
      />

      <TouchableOpacity onPress={saveData}>
        <View style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {isLoading ? 'Waiting...' : 'Submit'}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}