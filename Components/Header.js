import React from "react";
import { StyleSheet, Text, ScrollView, View } from 'react-native';

export default Header = ({ text, style }) => {
    return(
        <View style={[styles.container, style]}>
            <Text style={styles.txt}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    txt: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
  });