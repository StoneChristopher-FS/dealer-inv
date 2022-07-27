import { Text, View, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Styles';

export default function Card({data}) {

  return (
    <View style={styles.card}>
        <Text>VIN: {data.vin}</Text>
        <Text>{data.year}</Text>
        <Text>{data.make}</Text>
        <Text>{data.model}</Text>
        <Text>{data.color}</Text>
        <Text>${data.price}</Text>
    </View>
  );
}