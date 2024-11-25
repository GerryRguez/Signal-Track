
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import Footer from './Components/Footer';
import Compass from './Components/Compass';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.4.1:8081');
  
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setConnected(true);
    };
  
    ws.onmessage = (event) => {
      console.log('Message received:', event.data);
      setData(event.data); 
    };
  
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
      // Intentar reconectar después de 3 segundos
      setTimeout(() => {
        console.log('Trying to reconnect...');
        ws = new WebSocket('ws://192.168.4.1:8081'); // Reabrir la conexión
      }, 3000);
    };
  
    ws.onerror = (error) => {
      console.error('Error en WebSocket:', error.message);
    };
  
    return () => ws.close();
  }, []);
  

  const isValidData = typeof data === 'string' && /^\d{3}$/.test(data); // Validación de 3 dígitos

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' hidden={true} /> 
 
      {connected && isValidData && <Compass directionCode={data} />}
      <Text style={styles.dataText}>
        {connected
          ? "Data received: ${isValidData ? data : 'Awaiting data...'}"
          : 'Connecting to the WebSocket server...'}
      </Text>
     
      <Footer
        text="Members and Advisors"
        style={styles.footer}
        onPress={() => navigation.navigate('Information')} 
      />
    </View>
  );
};


const InformationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
     
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}/>
      <Text style={styles.titulo}>Members: </Text>
      <Text style={styles.titulo}>Software</Text>
      <Text style={styles.dataText}>- Torres Cota Raul Antonio</Text>
      <Text style={styles.dataText}>- Robles Calderon Jesus Alberto</Text>
      <Text style={styles.dataText}>- Pulido Meza Carlos Antonio</Text>
      <Text style={styles.dataText}>- Castro Victorio Johana Guadalupe</Text>
      <Text style={styles.dataText}>- Farfán Rodríguez Gerardo Rafael</Text>
      <Text style={styles.titulo}>Hardware</Text>
      <Text style={styles.dataText}>- Vital Meza Aderly</Text>
      <Text style={styles.dataText}>- Cota Garcia Santiago</Text>
      <Text style={styles.dataText}>- Yañez Gonzales Hayde Guadalupe</Text>
      <Text style={styles.dataText}>- Rivera Avilés Juan Gabriel</Text>
      <Text style={styles.dataText}>- Gaucin Murillo Angel</Text>
      <Text style={styles.titulo}>Advisors: </Text>
      <Text style={styles.dataText}>- Gonzalez Soriano Gilberto - Digital Design</Text>
      <Text style={styles.dataText}>- Ojeda Castro Angel De Jesus - Mobile Applications</Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Wind direction" component={HomeScreen} />
        <Stack.Screen name="Information" component={InformationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  titulo: { 
    marginTop: 10,
    color: '#fff', 
    fontSize: 20,
    fontWeight: 'bold',
    fontSize: 20
  },
  footer: { 
    marginBottom: 10, 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 20
  },
  dataText: { 
    color: '#fff', 
    fontSize: 20,
    fontWeight: 'bold', 
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
});