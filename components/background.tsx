import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundComponent = ({ children }) => {
  return (
    <ImageBackground
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F3F3', // Mengatur background menjadi warna putih
  },
});

export default BackgroundComponent;
