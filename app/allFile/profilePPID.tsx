import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Link } from 'expo-router';
import BackgroundComponent from '../../components/background';
import styles from '../../assets/style/infoStyle';


const ProfilePPID = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timeout);
  }, [loading]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://linyjayainformatika.co.id/ppid-bkad/api/profil');
      const json = await response.json();

      if (json.status) {
        setData(json.data);
        setFilteredData(json.data);
      } else {
        setErrorMessage(json.message);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <BackgroundComponent>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#084298" />
        </View>
      </BackgroundComponent>
    );
  }

  if (errorMessage) {
    return (
      <BackgroundComponent>
        <View style={styles.container}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            placeholderTextColor='#2A2A2A49'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>{errorMessage}</Text>
          </View>
        </View>
      </BackgroundComponent>
    );
  }

  if (filteredData.length === 0) {
    return (
      <BackgroundComponent>
        <View style={styles.container}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            placeholderTextColor='#2A2A2A49'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>Data Not Found</Text>
          </View>
        </View>
      </BackgroundComponent>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Link href={`modalView/ProfilePPID/${item.id}`} style={styles.link}>
        <Text style={styles.itemName}>{item.name}</Text>
        {/* <Text style={styles.itemId}>ID: {item.id}</Text> */}
      </Link>
    </TouchableOpacity>
  );

  return (
    <BackgroundComponent>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholderTextColor='#2A2A2A49'
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredData}
          numColumns={1}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </BackgroundComponent>
  );
};

export default ProfilePPID;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from 'react-native';
// import { Link } from 'expo-router';
// import BackgroundComponent from '../../components/background';

// const ProfilePPID = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (searchQuery) {
//       const filtered = data.filter(item =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredData(filtered);
//     } else {
//       setFilteredData(data);
//     }
//   }, [searchQuery, data]);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (loading) {
//         setLoading(false);
//       }
//     }, 10000); // 10 seconds timeout

//     return () => clearTimeout(timeout);
//   }, [loading]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://linyjayainformatika.co.id/ppid-bkad/api/profil');
//       const json = await response.json();
//       setData(json.data);
//       setFilteredData(json.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <BackgroundComponent>
//         <View style={styles.container}>
//           <ActivityIndicator size="large" color="#FFFFFF" />
//         </View>
//       </BackgroundComponent>
//     );
//   }

//   if (filteredData.length === 0) {
//     return (
//       <BackgroundComponent>
//         <View style={styles.container}>
//           <TextInput
//             style={styles.searchBar}
//             placeholder="Search..."
//             placeholderTextColor='#ffffff'
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//           <View style={styles.noDataContainer}>
//             <Text style={styles.noDataText}>Data Not Found</Text>
//           </View>
//         </View>
//       </BackgroundComponent>
//     );
//   }

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.itemContainer}>
//       <Link href={`modalView/ProfilePPID/${item.id}`} style={styles.link}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         {/* <Text style={styles.itemId}>ID: {item.id}</Text> */}
//       </Link>
//     </TouchableOpacity>
//   );

//   return (
//     <BackgroundComponent>
//       <View style={styles.container}>
//         <TextInput
//           style={styles.searchBar}
//           placeholderTextColor='#ffffff'
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <FlatList
//           data={filteredData}
//           numColumns={1}
//           keyExtractor={item => item.id.toString()}
//           renderItem={renderItem}
//           contentContainerStyle={styles.listContainer}
//         />
//       </View>
//     </BackgroundComponent>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     paddingHorizontal: 10,
//   },
//   listContainer: {
//     flexGrow: 1,
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//   },
//   searchBar: {
//     height: 40,
//     borderColor: 'white',
//     color:'#ffffff',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginHorizontal: 15,
//   },
//   itemContainer: {
//     backgroundColor: '#6F6F6F48',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ffffff',
//     padding: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     marginHorizontal: 5,
//   },
//   link: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   itemName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color:'#ffffff'
//   },
//   itemId: {
//     fontSize: 14,
//     color: '#888',
//     textAlign: 'center',
//   },
//   noDataContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noDataText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#ffffff',

//   },
// });

// export default ProfilePPID;

// import React, { useRef, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Linking, Animated, Easing } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useRouter } from 'expo-router';
// import BackgroundComponent from '../../components/background'; // Sesuaikan path sesuai struktur project

// const ProfilePPID = () => {
//   const router = useRouter();

//   // Data untuk slider
//   const sliderData = [
//     { id: '1', image: require('../../assets/images/imageslide.jpg') },
//     { id: '2', image: require('../../assets/images/imageslide.jpg') },
//     { id: '4', image: require('../../assets/images/imageslide.jpg') },
//     { id: '5', image: require('../../assets/images/imageslide.jpg') },
//     { id: '6', image: require('../../assets/images/imageslide.jpg') },
//   ];

//   // Animated values for text animation
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const translateXAnim = useRef(new Animated.Value(-50)).current;

//   // Animated values for logo container animation
//   const fadeAnimLogo = useRef(new Animated.Value(0)).current;
//   const translateXAnimLogo = useRef(new Animated.Value(50)).current;

//   // Animated values for iconRow animation
//   const fadeAnimIconRow = useRef(new Animated.Value(0)).current;

//   // Animated values for slider animation
//   const fadeAnimSlider = useRef(new Animated.Value(0)).current;

//   // Animated values for separator animation
//   const fadeAnimSeparator = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         easing: Easing.ease,
//         useNativeDriver: true,
//       }),
//       Animated.timing(translateXAnim, {
//         toValue: 0,
//         duration: 1000,
//         easing: Easing.out(Easing.ease),
//         useNativeDriver: true,
//       }),
//       Animated.timing(fadeAnimLogo, {
//         toValue: 1,
//         duration: 1000,
//         easing: Easing.ease,
//         useNativeDriver: true,
//       }),
//       Animated.timing(translateXAnimLogo, {
//         toValue: 0,
//         duration: 1000,
//         easing: Easing.out(Easing.ease),
//         useNativeDriver: true,
//       }),
//       Animated.timing(fadeAnimIconRow, {
//         toValue: 1,
//         duration: 1000,
//         easing: Easing.ease,
//         useNativeDriver: true,
//       }),
//       Animated.timing(fadeAnimSlider, {
//         toValue: 1,
//         duration: 1000,
//         easing: Easing.ease,
//         useNativeDriver: true,
//       }),
//       Animated.timing(fadeAnimSeparator, {
//         toValue: 1,
//         duration: 1000,
//         easing: Easing.ease,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, translateXAnim, fadeAnimLogo, translateXAnimLogo, fadeAnimIconRow, fadeAnimSlider, fadeAnimSeparator]);

//   // Render item untuk FlatList
//   const renderSliderItem = ({ item, index }) => (
//     <Animated.View
//       style={[
//         styles.sliderItem,
//         {
//           opacity: fadeAnimSlider,
//           transform: [
//             {
//               scale: fadeAnimSlider.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0.85, 1],
//               }),
//             },
//           ],
//         },
//       ]}
//     >
//       <TouchableOpacity
//         style={[
//           styles.sliderItemContainer,
//           index === 0 ? styles.firstSliderItem : null,
//           index === sliderData.length - 1 ? styles.lastSliderItem : null,
//         ]}
//         onPress={() => console.log('Slider item clicked')}
//       >
//         <Image source={item.image} style={styles.sliderImage} resizeMode="cover" />
//       </TouchableOpacity>
//     </Animated.View>
//   );

//   return (
//     <BackgroundComponent>
//       <ScrollView>
//         <View style={styles.overlay}>
//           <Animated.Text
//             style={[
//               styles.text,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateX: translateXAnim }],
//               },
//             ]}
//           >
//             Selamat Datang [User]
//           </Animated.Text>

//           <Animated.View
//             style={[
//               styles.logoContainer,
//               {
//                 opacity: fadeAnimLogo,
//                 transform: [{ translateX: translateXAnimLogo }],
//               },
//             ]}
//           >
//             <Image
//               source={require('../../assets/images/logo.png')}
//               style={styles.logo}
//               resizeMode="contain"
//             />
//           </Animated.View>
//           <FlatList
//             data={sliderData}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             keyExtractor={(item) => item.id}
//             renderItem={renderSliderItem}
//             contentContainerStyle={styles.sliderContainer}
//           />

//           {/* Separator dengan animasi fade in */}
//           <Animated.View
//             style={[
//               styles.separator,
//               {
//                 opacity: fadeAnimSeparator,
//               },
//             ]}
//           ></Animated.View>

//           <Animated.View
//             style={[
//               styles.iconRow,
//               {
//                 opacity: fadeAnimIconRow,
//               },
//             ]}
//           >
//             <TouchableOpacity style={styles.iconContainer} onPress={() => router.navigate('allFile/permohonanInfo')}>
//               <Icon name="pencil-square-o" size={40} color="#fff" />
//               <Text style={styles.iconText}>Permohonan Informasi</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconContainer} onPress={() => router.navigate('allFile/daftarInformasi')}>
//               <Icon name="list" size={40} color="#fff" />
//               <Text style={styles.iconText}>Daftar Informasi</Text>
//             </TouchableOpacity>
//           </Animated.View>
//           <Animated.View
//             style={[
//               styles.iconRow,
//               {
//                 opacity: fadeAnimIconRow,
//               },
//             ]}
//           >
//             <TouchableOpacity style={styles.iconContainer}>
//               <Icon name="warning" size={40} color="#fff" />
//               <Text style={styles.iconText}>Keberatan Informasi</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconContainer} onPress={() => router.navigate('allFile/profilePPID')}>
//               <Icon name="home" size={40} color="#fff" />
//               <Text style={styles.iconText}>Profil PPID</Text>
//             </TouchableOpacity>
//           </Animated.View>
//           <Animated.View
//             style={[
//               styles.iconRow,
//               {
//                 opacity: fadeAnimIconRow,
//               },
//             ]}
//           >
//             <TouchableOpacity style={styles.iconContainer}>
//               <Icon name="info" size={40} color="#fff" />
//               <Text style={styles.iconText}>Maklumat PPID</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconContainer}>
//               <Icon name="cog" size={40} color="#fff" />
//               <Text style={styles.iconText}>Regulasi PPID</Text>
//             </TouchableOpacity>
//           </Animated.View>
//           <Animated.View
//             style={[
//               styles.iconRow,
//               {
//                 opacity: fadeAnimIconRow,
//               },
//             ]}
//           >
//             <TouchableOpacity style={styles.iconContainer}>
//               <Icon name="info" size={40} color="#fff" />
//               <Text style={styles.iconText}>Maklumat PPID</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconContainer}>
//               <Icon name="cog" size={40} color="#fff" />
//               <Text style={styles.iconText}>Regulasi PPID</Text>
//             </TouchableOpacity>
//           </Animated.View>

//           {/* Supported By Section */}
//           <Text style={styles.supportedBy}>
//             Supported with ❤️ By PT .&nbsp;
//             <Text onPress={() => Linking.openURL('https://www.supportedbypt.com')}>
//               LinyJayaInformatika
//             </Text>
//           </Text>
//         </View>
//       </ScrollView>
//     </BackgroundComponent>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   text: {
//     marginTop: 20,
//     fontSize: 25,
//     fontWeight: '900',
//     color: '#ffffff',
//     alignSelf: 'flex-start', // Align text to the left
//   },
//   logoContainer: {
//     alignItems: 'center',
//     backgroundColor: '#6F6F6F48',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   logo: {
//     width: 350,
//     height: 50,
//     borderRadius: 5,
//   },
//   iconRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: -10,
//     width: '125%',
//     paddingHorizontal: 40,
//     paddingVertical: 15,
//   },
//   iconContainer: {
//     alignItems: 'center',
//     backgroundColor: '#6F6F6F48',
//     padding: 40,
//     borderRadius: 10,
//     width: '47.5%',
//     justifyContent: 'center',
//     marginBottom: -10,
//   },
//   iconText: {
//     marginTop: 5,
//     color: '#fff',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   sliderContainer: {
//     marginTop: 20,
//     paddingRight: 20,
//   },
//   sliderItem: {
//     marginRight: 15,
//   },
//   sliderItemContainer: {
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   firstSliderItem: {
//     marginLeft: 0,
//   },
//   lastSliderItem: {
//     marginRight: 0,
//   },
//   sliderImage: {
//     width: 250,
//     height: 150,
//     borderRadius: 10,
//   },
//   supportedBy: {
//     marginTop: 100,
//     marginBottom: 80,
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#FFFCFC',
//   },
//   separator: {
//     height: 3,
//     borderRadius: 3,
//     width: '100%',
//     backgroundColor: '#D8DBCFBF',
//     marginVertical: 20,
//   },
// });

// export default ProfilePPID;
