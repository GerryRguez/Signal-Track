
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default Footer = ({ text, style, onPress }) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.txt}>{text}</Text>
            </TouchableOpacity>
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