import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import BackgroundComponent from '../../../components/background';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../assets/style/detail';

const ModalProfilePPID = () => {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`https://linyjayainformatika.co.id/ppid-bkad/api/profil`);
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
        
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          style={{ margin: 0 }}
        >
          <ImageViewer
            imageUrls={[{ url: item.attachment }]}
            enableSwipeDown={true}
            onSwipeDown={() => setModalVisible(false)}
            renderIndicator={() => null}
            backgroundColor="#000"
          />
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setModalVisible(false)}
          >
              <Ionicons name='close' style={styles.closeButtonText}></Ionicons>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </BackgroundComponent>
  );
};

export default ModalProfilePPID;