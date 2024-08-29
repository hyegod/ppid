// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from 'react-native';
// import { Link } from 'expo-router';
// import BackgroundComponent from '../../components/background';
// import { collection, getDocs } from 'firebase/firestore';
// import { FIRESTORE_DB } from '../../firebaseConfig';
// import { getAuth } from 'firebase/auth';

// interface Permohonan {
//   document_id: string;
//   namaLengkap: string;
//   email: string;
//   tujuanPermohonan: string;
// }

// const DaftarPermohonan = () => {
//   const [data, setData] = useState<Permohonan[]>([]);
//   const [filteredData, setFilteredData] = useState<Permohonan[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (searchQuery) {
//       const filtered = data.filter(item =>
//         item.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredData(filtered);
//     } else {
//       setFilteredData(data);
//     }
//   }, [searchQuery, data]);

//   const fetchData = async () => {
//     try {
//       const auth = getAuth();
//       const currentUser = auth.currentUser;
//       const userEmail = currentUser ? currentUser.email : null;

//       if (!userEmail) {
//         setLoading(false);
//         return;
//       }

//       const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'permohonanInfo'));
//       const fetchedData: Permohonan[] = querySnapshot.docs
//         .map(doc => ({
//           document_id: doc.id,
//           ...doc.data()
//         } as Permohonan))
//         .filter(item => item.email === userEmail);

//       setData(fetchedData);
//       setFilteredData(fetchedData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <BackgroundComponent>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#084298" />
//           <Text style={styles.loadingText}>Loading...</Text>
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
//             placeholderTextColor="#2A2A2A49"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//           <View style={[styles.noDataContainer, { backgroundColor: 'transparent' }]}>
//             <Text style={styles.noDataText}>Data Not Found</Text>
//           </View>
//         </View>
//       </BackgroundComponent>
//     );
//   }

//   const renderItem = ({ item }: { item: Permohonan }) => (
//     <TouchableOpacity style={styles.itemContainer}>
//       <Link href={`/modalView/daftarPermohonan/${item.document_id}`} style={styles.link}>
//         <View style={styles.textContainer}>
//           <Text style={styles.itemName}>{item.namaLengkap}</Text>
//           <Text style={styles.itemEmail}>{item.email}</Text>
//           <Text style={styles.itemTujuan}>{item.tujuanPermohonan}</Text>
//         </View>
//       </Link>
//     </TouchableOpacity>
//   );

//   return (
//     <BackgroundComponent>
//       <View style={styles.container}>
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search..."
//           placeholderTextColor="#2A2A2A49"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <FlatList
//           data={filteredData}
//           numColumns={1}
//           keyExtractor={item => item.document_id}
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
//     paddingHorizontal: 10,
//     paddingTop: 20,
//   },
//   searchBar: {
//     height: 40,
//     borderColor: 'white',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     marginHorizontal:10,
//     color: '#fff',
//     backgroundColor: 'transparent',
//   },
//   listContainer: {
//     flexGrow: 1,
//     marginTop: 20,
//     marginHorizontal:10,
//     paddingBottom: 100,
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
//     // elevation: 5,
//   },
//   link: {
//     width: '100%',
//   },
//   textContainer: {
//     justifyContent: 'center',
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff', // Text color white
//   },
//   itemEmail: {
//     fontSize: 16,
//     color: '#fff', // Text color white
//   },
//   itemTujuan: {
//     fontSize: 16,
//     color: '#fff', // Text color white
//   },
//   noDataContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noDataText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff', // Text color white
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: '#000', // Adjust this to match y~our app's background color
//   },
//   loadingText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff', // Text color white
//     marginTop: 10,
//   },
// });

// export default DaftarPermohonan;
