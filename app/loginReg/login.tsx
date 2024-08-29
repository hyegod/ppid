import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Linking,
  Animated,
  Keyboard
} from 'react-native';
import { useRouter } from 'expo-router';
import BackgroundComponent from '../../components/background';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Provider as PaperProvider, Dialog, Portal, Button, Paragraph, DefaultTheme, MD3LightTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    surface: '#FFFFFF', // Dialog background color
  },
};
const LoginRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const animatedValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = () => {
    Animated.timing(animatedValue, {
      toValue: -110,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const keyboardDidHide = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const validateFields = () => {
    if (!email.trim()) {
      showDialog('Error', 'Email is required.');
      return false;
    }
    if (!email.includes('@')) {
      showDialog('Error', 'Please enter a valid email address.');
      return false;
    }
    if (!password.trim()) {
      showDialog('Error', 'Password is required.');
      return false;
    }
    return true;
  };

  const handleAuth = async () => {
    if (!validateFields()) return;
  
    setIsLoading(true);
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        console.log('Login successful', userCredential);
        await AsyncStorage.setItem('@login_status', 'true');
        await AsyncStorage.setItem('@user_uid', userCredential.user.uid);
        router.replace('/home');
      } else {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        console.log('Registration successful', userCredential);
  
        const defaultName = 'Anonymous';
        const defaultPhotoURL = '';
        await saveUserData(userCredential.user.uid, defaultName, defaultPhotoURL, email);
  
        showDialog('Registration Successful', 'Your account has been created. Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      if (isLogin) {
        showDialog('Login Failed', 'Invalid email or password. Please try again.');
      } else {
        showDialog('Registration Failed', 'This email may already be in use or is invalid. Please try again with a different email.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserData = async (uid, name, photoURL, email) => {
    try {
      await setDoc(doc(FIRESTORE_DB, 'users_data', uid), {
        name: name,
        photoURL: photoURL,
        email: email,
      });
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  };

  const toggleForm = () => {
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setIsLogin(!isLogin);
      setForgotPassword(false);
      Animated.parallel([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleLinkPress = () => {
    Linking.openURL('https://linyjayainformatika.co.id');
  };

  const handleForgotPassword = async () => {
    if (!email.trim() || !email.includes('@')) {
      showDialog('Error', 'Please enter a valid email address to reset password.');
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      showDialog('Password Reset', 'A password reset email has been sent to your inbox. Please check your email.');
      setForgotPassword(false);
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      showDialog('Reset Failed', 'Failed to send reset email. Please check your email address and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const showDialog = (title, message) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  return (
  <PaperProvider theme={customTheme}>
      <BackgroundComponent>
        <LottieView
          source={require('../../assets/lottie/data.json')}
          autoPlay
          loop
          style={styles.lottie}
        />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View style={[styles.animatedView, { opacity: opacityValue, transform: [{ translateY: animatedValue }] }]}>
            <Text style={styles.title}>Selamat Datang</Text>
            <Text style={styles.subtitle}>Masukkan email dan password</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#2A2A2A49"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {!forgotPassword && (
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#2A2A2A49"
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                  <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="#3D3D3D" />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.button} onPress={forgotPassword ? handleForgotPassword : handleAuth}>
              <Text style={styles.buttonText}>
                {forgotPassword ? 'Send Reset Email' : (isLogin ? 'Login' : 'Register')}
              </Text>
            </TouchableOpacity>

            {isLogin && !forgotPassword && (
              <TouchableOpacity onPress={() => setForgotPassword(true)}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => {
              if (forgotPassword) {
                setForgotPassword(false);
              } else {
                toggleForm();
              }
            }}>
              <Text style={styles.toggleText}>
                {forgotPassword
                  ? 'Back to Login/Register'
                  : isLogin
                  ? "Don't have an account? Register here"
                  : 'Already have an account? Login here'}
              </Text>
            </TouchableOpacity>

            {isLoading && <ActivityIndicator size="large" color="#084298" style={styles.loadingIndicator} />}

            <View style={{ height: 50 }} />
          </Animated.View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.supportedByText}>Supported by &nbsp;
            <Text style={{ fontWeight:'bold' }} onPress={handleLinkPress}>
              PT. LinyJayaInformatika
            </Text>
          </Text>
        </View>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{dialogTitle}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{dialogMessage}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </BackgroundComponent>
    </PaperProvider>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#000000',
      textAlign: 'left',
    },
    subtitle: {
      fontSize: 16,
      color: '#000000',
      textAlign: 'left',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#ccc',
      borderWidth:1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: '#FFC1076E',
      color: '#242424',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 50,
      borderWidth:1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: '#FFC1076E',
    },
    passwordInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
      color: '#242424',
    },
    eyeIcon: {
      padding: 8,
      paddingBottom: 10,
      // marginBottom:10,
    },
    button: {
      width: '100%',
      backgroundColor: '#084298',
      borderRadius: 5,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    forgotPasswordText: {
      marginTop: 20,
      color: '#000000',
      textAlign: 'center',
    },
    toggleText: {
      marginTop: 10,
      color: '#000000',
      textAlign: 'center',
    },
    loadingIndicator: {
      marginTop: 20,
    },
    lottie: {
      width: 300,
      height: 250,
      alignSelf: 'center',
      marginTop: 50,
      marginBottom: -50,
    },
    footer: {
      marginTop: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
    supportedByText: {
      color: '#000000',
      fontSize: 10,
      
      // fontWeight: '500'
    },
    animatedView: {
      flex: 1,
      justifyContent: 'center',
    },
  });

  export default LoginRegisterPage;