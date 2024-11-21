import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';

import Compass from './Components/Compass';

export default App = () => {
  const [data, setData] = useState(''); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://172.17.218.107:8081/data'); 
      setData(response.data); 
    } catch (error) {
      console.error("Error al conectar con ESP8266:", error.message);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
        console.error("Código de estado:", error.response.status);
      } else if (error.request) {
        console.error("No se recibió respuesta:", error.request);
      }
    }
    
  };

  useEffect(() => {
    // fetchData(); 
  }, []);

  return (
    <View style={styles.container}>
      <Header text="Dirección del viento" style={styles.header} />
      <Compass code = {"110"} />
      <Text style={styles.dataText}>
        {/* {data ? Datos del ESP8266: ${data} : "Conectando..."} */}
      </Text>
      <Footer text="Creadores y asesores:" style={styles.footer} />
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'space-between', // Distribuye Header arriba y Footer abajo
    paddingVertical: 20, // Espaciado adicional en la parte superior e inferior
  },
  header: {
    marginTop: 10, // Ajusta según el espacio deseado arriba
  },
  footer: {
    marginBottom: 10, // Ajusta según el espacio deseado abajo
  },
  dataText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
});
