import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Compass = ({code}) => {
const [directionCode, setDirectionCode] = useState('');
const [rotation, setRotation] = useState(90);

const directionMap = {
    '000': 0,    
    '001': 45,   
    '010': 90,   
    '011': 135,  
    '100': 180,  
    '101': 225,  
    '110': 270,  
    '111': 315,  
};

const handleDirectionChange = (code) => {
    setDirectionCode(code);
    
    if (directionMap.hasOwnProperty(code)) {
      setRotation();
    } else {
      setRotation(0);
    }
  };

  return (
    <View style={styles.compassContainer}>
      <Text style={[styles.directionText, styles.northText]}>N</Text>
      <Text style={[styles.directionText, styles.southText]}>S</Text>
      <Text style={[styles.directionText, styles.eastText]}>E</Text>
      <Text style={[styles.directionText, styles.westText]}>W</Text>
      <Text style={[styles.directionText, styles.northeastText]}>NE</Text>
      <Text style={[styles.directionText, styles.northwestText]}>NW</Text>
      <Text style={[styles.directionText, styles.southeastText]}>SE</Text>
      <Text style={[styles.directionText, styles.southwestText]}>SW</Text>

      <View style={[styles.needleContainer, { transform: [{ rotate: `${directionMap[code]}deg` }] }]}>
        <View style={styles.needle} />
      </View>

      {/* <TextInput
        style={styles.input}
        placeholder="Ingresa el código binario"
        value={directionCode}
        onChangeText={handleDirectionChange}
        keyboardType="numeric"
        maxLength={3}
      /> */}
    </View>
  );
};

export default Compass;

const styles = StyleSheet.create({
  compassContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#1e2b38',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#888',
  },
  directionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
  },
  northText: { top: 10, alignSelf: 'center' },
  southText: { bottom: 10, alignSelf: 'center' },
  eastText: { right: 10, alignSelf: 'center' },
  westText: { left: 10, alignSelf: 'center' },
  northeastText: { top: 40, right: 40 },
  northwestText: { top: 40, left: 40 },
  southeastText: { bottom: 40, right: 40 },
  southwestText: { bottom: 40, left: 40 },
  needleContainer: {
    position: 'absolute',
    width: 10,
    height: '70%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  needle: {
    width: 4,
    height: '70%',
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
  },
  input: {
    position: 'absolute',
    bottom: -50,
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: '#fff',
    borderRadius: 5,
    textAlign: 'center',
  },
});