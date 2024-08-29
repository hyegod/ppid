// CustomToast.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface CustomToastProps {
  message: string;
  duration?: number;
  onHide: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, duration = 2000, onHide }) => {
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(30);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(duration),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 30,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => onHide());
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 25,
    right: 25,
    backgroundColor: '#050505D1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 70,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});

export default CustomToast;
