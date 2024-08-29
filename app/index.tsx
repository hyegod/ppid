import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import SplashScreen from '../components/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '../firebaseConfig';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem('@login_status');
        const userUid = await AsyncStorage.getItem('@user_uid');
        
        // Menunggu splash screen selesai sebelum navigasi
        setTimeout(() => {
          setShowSplash(false);
          if (loginStatus === 'true' && userUid) {
            router.replace('/home');
          } else {
            router.replace('/loginReg/login');
          }
        }, 3000); // Menampilkan splash screen selama 3 detik
      } catch (error) {
        console.error('Error checking login status:', error);
        setTimeout(() => {
          setShowSplash(false);
          router.replace('/loginReg/login');
        }, 3000);
      }
    };

    checkLoginStatus();
  }, [router]);

  if (showSplash) {
    return <SplashScreen />;
  }

  // Render nothing while redirecting
  return null;
}