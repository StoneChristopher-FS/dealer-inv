import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Styles';

export default function Vehicle({route: {params}, navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const { vin } = params;

  const getVehicle = async () => {
    try{
      await fetch(`https://crud-api-fs.herokuapp.com/api/v1/inventory/${vin}`)
      .then(res => res.json())
      .then(data => {
        setData({
          year: data.year,
          make: data.make,
          model: data.model,
          color: data.color,
          vin: data.vin,
          price: data.price
        })
      })
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  let ignore = false;
  useEffect(() => {
    if(!ignore) {
            getVehicle();
        }

        return () => {
            ignore = true;
        }
  }, [])

  const udpateVehicle = async () => {
    try {
        await fetch(`https://crud-api-fs.herokuapp.com/api/v1/inventory/${vin}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              year: data.year,
              make: data.make,
              model: data.model,
              color: data.color,
              vin: data.vin,
              price: data.price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log({data})
        })
    } catch(error) {
        setError(error.message || 'Unexpected Error')
    } finally {
        setLoading(false)
    }
  };

  const deleteVehicle = async () => {
    try {
        await fetch(`https://crud-api-fs.herokuapp.com/api/v1/inventory/${vin}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              year: data.year,
              make: data.make,
              model: data.model,
              color: data.color,
              vin: data.vin,
              price: data.price
            })
          })
          .then(res => {
            navigation.navigate('Inventory')
          })
    } catch(error) {
        setError(error.message || 'Unexpected Error')
    } finally {
        setLoading(false)
    }
  };

  return (
    <SafeAreaView>
      <Text>VIN: {data.vin}</Text>
      <Text>{data.year}</Text>
      <Text>{data.make}</Text>
      <Text>{data.model}</Text>
      <Text>{data.color}</Text>
      <Text>${data.price}</Text>


      <TextInput
        placeholder={'Year'}
        onChangeText={(value) => onChangeYear(value)}
        style={styles.input}
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

      <TouchableOpacity onPress={udpateVehicle}>
        <View style={{ backgroundColor: 'blue', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {isLoading ? 'Waiting...' : 'Submit'}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={deleteVehicle}>
        <View style={{ backgroundColor: 'red', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {isLoading ? 'Waiting...' : 'Delete'}
          </Text>
        </View>
      </TouchableOpacity>

    </SafeAreaView>
  );
}