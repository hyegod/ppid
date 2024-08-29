import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Link } from 'expo-router';
import BackgroundComponent from '../../components/background';
import styles from '../../assets/style/infoStyle';

const InfoBerkala = () => {
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
    }, 10000);

    return () => clearTimeout(timeout);
  }, [loading]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://linyjayainformatika.co.id/ppid-bkad/api/informasi/3');
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
      <Link href={`modalView/Berkala/${item.id}`} style={styles.link}>
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
export default InfoBerkala;
