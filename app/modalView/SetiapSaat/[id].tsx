import React, { useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import BackgroundComponent from '../../../components/background';
import ImageViewer from 'react-native-image-zoom-viewer'; // Import the ImageViewer
import styles from '../../../assets/style/detail';
import { Ionicons } from '@expo/vector-icons';

const ModalInfoSetiapSaat = () => {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`https://linyjayainformatika.co.id/ppid-bkad/api/informasi/2`);
      const json = await response.json();
      const selectedItem = json.data.find(i => i.id.toString() === id);
      setItem(selectedItem);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  if (!item) {
    return (
      <BackgroundComponent>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#084298" />
        </View>
      </BackgroundComponent>
    );
  }

  return (
    <BackgroundComponent>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{item.name}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={{ uri: item.attachment }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.descContainer}>
          <Text style={styles.descLabel}>Desc :</Text>
          <Text style={styles.description}>{item.desc.replace(/<br\s*\/?>/gi, '\n')}</Text>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={{ margin: 0 }} // Ensure the modal takes up the full screen
      >
        <ImageViewer
          imageUrls={[{ url: item.attachment }]} // Pass the image URL here
          enableSwipeDown={true} // Enable swipe down to close the modal
          onSwipeDown={() => setModalVisible(false)} // Close the modal when swiped down
          renderIndicator={() => null} // Hide the indicator
          backgroundColor="#000" // Set background color of the modal
        />
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => setModalVisible(false)}
        >
          <Ionicons name='close' style={styles.closeButtonText}></Ionicons>
        </TouchableOpacity>
      </Modal>
    </BackgroundComponent>
  );
};

export default ModalInfoSetiapSaat;
