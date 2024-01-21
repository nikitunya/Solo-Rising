import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    logoContainer: {
        flex: 1,
        top: -100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
});

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Image style={styles.backgroundImage} source={require('../../assets/images/background.jpg')} />
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
            </View>
        </View>
    );
}