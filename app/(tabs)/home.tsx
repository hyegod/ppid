import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import BackgroundComponent from '../../components/background';
import { FontAwesome6 } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';

const HomePage = () => {
  const router = useRouter();
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchSliderData();
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const fetchSliderData = async () => {
    try {
      const response = await fetch('https://linyjayainformatika.co.id/ppid-bkad/api/slides');
      const result = await response.json();
      if (result.status && result.data) {
        setSliderData(result.data);
      }
    } catch (error) {
      console.error('Error fetching slider data:', error);
    }
  };

  const openImageModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    setVideoModalVisible(false);
  };

  const openVideoModal = (item) => {
    setSelectedItem(item);
    setVideoModalVisible(true);
    setModalVisible(false);
  };

  const closeModals = () => {
    setModalVisible(false);
    setVideoModalVisible(false);
    setSelectedItem(null);
  };

  const renderSliderItem = ({ item, index }) => {
    const isVideo = item.type === 'mp4';

    return (
      <TouchableOpacity
        onPress={() => isVideo ? openVideoModal(item) : openImageModal(item)}
        style={[
          styles.sliderItem,
          index === 0 ? styles.firstSliderItem : null,
          index === sliderData.length - 1 ? styles.lastSliderItem : null,
        ]}
      >
        {isVideo ? (
          <Video
            source={{ uri: item.slide }}
            style={styles.sliderImage}
            useNativeControls={false}
            resizeMode={ResizeMode.COVER}
            isLooping
            isMuted
            shouldPlay
          />
        ) : (
          <Image source={{ uri: item.slide }} style={styles.sliderImage} resizeMode="cover" />
        )}
      </TouchableOpacity>
    );
  };

  const renderSkeletonItem = () => (
    <View style={[styles.skeletonItem, styles.firstSliderItem, styles.lastSliderItem]}>
      <View style={styles.skeletonImage} />
    </View>
  );

  return (
    <BackgroundComponent>
      <ScrollView>
        <View style={styles.overlay}>
          <Text style={styles.text}>Selamat Datang</Text>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logoppid.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {loading ? (
            <View style={styles.sliderContainer}>
              {renderSkeletonItem()}
            </View>
          ) : (
            <FlatList
              data={sliderData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderSliderItem}
              contentContainerStyle={styles.sliderContainer}
            />
          )}

          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.navigate('allFile/permohonanInfo')}>
              <FontAwesome6 name="file-pen" size={40} color="white" />
              <Text style={styles.iconText}>Permohonan Informasi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.navigate('allFile/daftarInformasi')}>
              <Icon name="th-list" size={40} color="#fff" />
              <Text style={styles.iconText}>Daftar Informasi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.navigate('allFile/keberatanInfo')}>
              <FontAwesome6 name="file-pen" size={40} color="white" />
              <Text style={styles.iconText}>Keberatan Informasi</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.navigate('allFile/profilePPID')}>
              <Icon name="th-list" size={40} color="#fff" />
              <Text style={styles.iconText}>Profil PPID</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.navigate('allFile/profilePPID')}>
              <Icon name="th-list" size={40} color="#fff" />
              <Text style={styles.iconText}>Maklumat PPID</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.navigate('allFile/profilePPID')}>
              <Icon name="th-list" size={40} color="#fff" />
              <Text style={styles.iconText}>Regulasi PPID</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModals}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedItem && selectedItem.type !== 'mp4' && (
              <ImageViewer
                imageUrls={[{ url: selectedItem.slide }]}
                enableSwipeDown
                onSwipeDown={closeModals}
                renderIndicator={() => null}
                style={styles.modalImage}
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModals}
            >
              <Ionicons name='close' size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Video Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={videoModalVisible}
        onRequestClose={closeModals}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedItem && selectedItem.type === 'mp4' && (
              <Video
                source={{ uri: selectedItem.slide }}
                style={styles.fullScreenMedia}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModals}
            >
              <Ionicons name='close' size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </BackgroundComponent>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  text: {
    fontSize: 25,
    fontWeight: '900',
    alignSelf: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: '#084298',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#08429853',
  },
  logo: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginBottom: 5,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#084298',
    padding: 15,
    borderRadius: 15,
    width: '31%',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#08429853',
  },
  iconText: {
    marginTop: 5,
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  sliderContainer: {
    marginTop: 15,
    marginBottom: 15,
    paddingRight: 25,
  },
  sliderItem: {
    marginRight: 15,
  },
  firstSliderItem: {
    marginLeft: 0,
  },
  lastSliderItem: {
    marginRight: -23,
  },
  sliderImage: {
    width: 370,
    height: 200,
    borderRadius: 10,
  },
  skeletonItem: {
    width: 370,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  skeletonImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#E2E2E2',
  },
  fullScreenMedia: {
    width: '100%',
    height: '100%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
});

export default HomePage;
