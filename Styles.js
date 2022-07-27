import { StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        height: '100%'
    },
    card: {
        alignItems: 'center',
        borderColor: "red",
        borderWidth: 5,
        marginTop: 10,
        padding: 10,
    },
    list: {
        flexShrink: 0,
        flexGrow: 0,
        width: '60%',
        height: '50%'
    },
    input: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        width: '30%',
        marginTop: 10,
        height: 25
    },
    top: {
        marginTop: 20
    }
  });

  export default styles;