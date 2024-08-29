import React from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import useDoubleBackExit from '../hooks/useDoubleBackExit'; // Sesuaikan path sesuai struktur proyek Anda
import CustomToast from '../components/customeToast'; // Sesuaikan path sesuai struktur proyek Anda

const Layout = () => {
  const [showToast, hideToast] = useDoubleBackExit(); // Menggunakan hook yang telah dimodifikasi

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          statusBarTranslucent: true,
          headerStyle: {
            backgroundColor: '#282B36',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerTitle: '', headerShown: false }} />
        <Stack.Screen name="loginReg/login" options={{ headerTitle: 'Login', headerShown: false }} />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="allFile/profilePPID"
          options={{ 
            headerShown: true,
            headerTitle: 'Profile PPID' 
          }}
        />
        <Stack.Screen
          name="allFile/permohonanInfo"
          options={{ 
            headerShown: true,
            headerTitle: 'Permohonan Informasi' 
          }}
        />
        <Stack.Screen
          name="allFile/daftarInformasi"
          options={{ 
            headerShown: true,
            headerTitle: 'Daftar Informasi' 
          }}
        />
        <Stack.Screen
          name="allFile/infoSertaMerta"
          options={{ 
            headerShown: true,
            headerTitle: 'Daftar Info Serta Merta' 
          }}
        />
        <Stack.Screen
          name="allFile/infoSetiapSaat"
          options={{ 
            headerShown: true,
            headerTitle: 'Informasi Setiap Saat' 
          }}
        />
        <Stack.Screen
          name="allFile/infoBerkala"
          options={{ 
            headerShown: true,
            headerTitle: 'Informasi Berkala' 
          }}
        />
        <Stack.Screen
          name="allFile/infoDikecualikan"
          options={{ 
            headerShown: true,
            headerTitle: 'Informasi Dikecualikan' 
          }}
        />
        <Stack.Screen
          name="allFile/keberatanInfo"
          options={{ 
            headerShown: true,
            headerTitle: 'Keberatan Informasi' 
          }}
        />
        <Stack.Screen
          name="modalView/SertaMerta/[id]"
          options={{ 
            headerShown: true,
            headerTitle: 'Detail' 
          }}
        />
        <Stack.Screen
          name="modalView/SetiapSaat/[id]"
          options={{ 
            headerShown: true,
            headerTitle: 'Detail' 
          }}
        />
        <Stack.Screen
          name="modalView/Berkala/[id]"
          options={{ 
            headerShown: true,
            headerTitle: 'Detail' 
          }}
        />
        <Stack.Screen
          name="modalView/DiKecualikan/[id]"
          options={{ 
            headerShown: true,
            headerTitle: 'Detail' 
          }}
        />
        <Stack.Screen
          name="modalView/ProfilePPID/[id]"
          options={{ 
            headerShown: true,
            headerTitle: 'Detail Profile' 
          }}
        />
      </Stack>
      {showToast && (
        <CustomToast
          message=" Press back again to exit"
          onHide={hideToast}
        />
      )}
    </View>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <Layout />
    </PaperProvider>
  );
}
