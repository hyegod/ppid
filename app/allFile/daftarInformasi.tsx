import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link, router } from 'expo-router';
import BackgroundComponent from '../../components/background'; // Sesuaikan path sesuai struktur project

const daftarInformasi = () => {
  // Data untuk slider
  const sliderData = [
    { id: '1', image: require('../../assets/images/backgroundapps.jpg') },
    { id: '2', image: require('../../assets/images/backgroundapps.jpg') },
    { id: '4', image: require('../../assets/images/backgroundapps.jpg') },
    { id: '5', image: require('../../assets/images/backgroundapps.jpg') },
    { id: '6', image: require('../../assets/images/backgroundapps.jpg') },
  ];

  // Render item untuk FlatList
  const renderSliderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.sliderItem,
        index === 0 ? styles.firstSliderItem : null,
        index === sliderData.length - 1 ? styles.lastSliderItem : null,
      ]}
      onPress={() => console.log('Slider item clicked')}
    >
      <Image source={item.image} style={styles.sliderImage} resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    <BackgroundComponent>
        <View style={styles.overlay}>

          <Text style={styles.text}>Informasi Layanan PPID</Text>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <FlatList
            data={sliderData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderSliderItem}
            contentContainerStyle={styles.sliderContainer}
          />
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/allFile/infoSertaMerta')}>
              <IconM name="home-analytics" size={60} color="#fff" />
              <Text style={styles.iconText}>Informasi Serta Merta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/allFile/infoSetiapSaat')}>
               <IconM name="home-analytics" size={60} color="#fff" />
              <Text style={styles.iconText}>Informasi Setiap Saat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/allFile/infoBerkala')}>
               <IconM name="home-analytics" size={60} color="#fff" />
              <Text style={styles.iconText}>Informasi Berkala</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/allFile/infoDikecualikan')}>
               <IconM name="home-analytics" size={60} color="#fff" />
              <Text style={styles.iconText}>Informasi Dikecualikan</Text>
            </TouchableOpacity>
          </View>
          
        </View>
    
    </BackgroundComponent>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingBottom: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  text: {
    // marginTop: 50,
    fontSize: 25,
    fontWeight: '900',
    alignSelf: 'flex-start', // Align text to the left
    color: '#000000'
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: '#084298',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  logo: {
    width: 350,
    height: 50,
    borderRadius: 5,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '124%', // Menggunakan '100%' untuk memenuhi lebar layar
    paddingHorizontal: 40,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#084298',
    padding: 40, // Menggunakan padding yang lebih besar untuk menyesuaikan ukuran ikon
    borderRadius: 10,
    width: '47.5%', // Menggunakan lebar yang lebih besar untuk menyesuaikan ukuran ikon
    justifyContent: 'center',
    marginBottom: -10, // Jarak antara ikon-ikon dalam satu baris
    shadowColor: '#000', // Warna bayangan
    shadowOffset: { width: 0, height: 2 }, // Posisi bayangan
    shadowOpacity: 0.8, // Transparansi bayangan
    shadowRadius: 2, // Radius bayangan
    // elevation: 5, // Ketinggian bayangan untuk Android
  },
  iconText: {
    marginTop: 5,
    color: '#fff',
    fontSize: 14, // Ukuran teks sedikit ditingkatkan untuk keselarasan dengan ikon yang lebih besar
    textAlign: 'center',
  },
  sliderContainer: {
    marginTop: 20,
    paddingRight: 20,
  },
  sliderItem: {
    marginRight: 15,
  },
  firstSliderItem: {
    marginLeft: 0, // Menghilangkan padding atau margin kiri
  },
  lastSliderItem: {
    marginRight: 0, // Menghilangkan padding atau margin kanan
  },
  sliderImage: {
    width: 250,
    height: 150,
    borderRadius: 10,
  },
});

export default daftarInformasi;
