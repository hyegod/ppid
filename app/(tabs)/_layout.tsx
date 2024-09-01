import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#FFC107FC',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          height: 70,
          marginBottom:20,
          marginHorizontal:18,

        },
        tabBarLabelStyle: {
          marginBottom: 15,
          color: '#3D3D3D',
          fontWeight:'bold'
        },
        tabBarIconStyle:{
        marginTop: 10,
        },
        tabBarActiveTintColor: '#084298',
        tabBarInactiveTintColor: '#3D3D3D',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'home';
          } else if (route.name === 'profile') {
            iconName = 'user';
          } else if (route.name === 'about') {
            iconName = 'info-circle'; // Ikon untuk tab About
          }

          return <FontAwesome name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          headerTitle: 'Home Screen',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarLabel: 'About Us',
          headerTitle: 'About Us',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Account',
          headerTitle: 'My Account',
          headerShown: false,
        }}
      />
    </Tabs>
  );
};
