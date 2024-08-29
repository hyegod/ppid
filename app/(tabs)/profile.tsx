import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, LayoutAnimation, UIManager, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_AUTH, FIRESTORE_DB, FIREBASE_STORAGE } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import BackgroundComponent from '../../components/background';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as PaperProvider, Dialog, Portal, Button, Paragraph, MD3LightTheme } from 'react-native-paper';

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    surface: '#FFFFFF',
  },
};

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhotoURL, setUserPhotoURL] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [originalAddress, setOriginalAddress] = useState('');
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const [uploadSuccessDialogVisible, setUploadSuccessDialogVisible] = useState(false);
  const [uploadErrorDialogVisible, setUploadErrorDialogVisible] = useState(false);
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const router = useRouter();

  const fetchUserData = async () => {
    if (isEditMode) return;

    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      if (currentUser) {
        setUserEmail(currentUser.email);
        const userUid = currentUser.uid;

        const userDocRef = doc(FIRESTORE_DB, 'users_data', userUid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name);
          setOriginalName(userData.name);
          setUserAddress(userData.address);
          setOriginalAddress(userData.address);
          setUserPhotoURL(userData.photoURL || '');

          await AsyncStorage.setItem(`@user_name_${userUid}`, userData.name);
          await AsyncStorage.setItem(`@user_address_${userUid}`, userData.address);
          await AsyncStorage.setItem(`@user_photo_url_${userUid}`, userData.photoURL || '');
        } else {
          console.log('No such document!');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();

    const intervalId = setInterval(() => {
      if (!isEditMode) {
        fetchUserData();
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [isEditMode]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      await AsyncStorage.removeItem('@login_status');
      await AsyncStorage.removeItem('@user_uid');
      router.replace('/loginReg/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const saveProfile = async () => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      if (currentUser) {
        const userUid = currentUser.uid;
        const userDocRef = doc(FIRESTORE_DB, 'users_data', userUid);
        await updateDoc(userDocRef, {
          name: userName,
          address: userAddress
        });
        setOriginalName(userName);
        setOriginalAddress(userAddress);
        setIsProfileChanged(false);
        setUploadSuccessDialogVisible(true);
        setIsEditMode(false);
        await fetchUserData();
        Keyboard.dismiss();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setUploadErrorDialogVisible(true);
    }
  };

  const handleNameChange = (text) => {
    setUserName(text);
    setIsProfileChanged(text !== originalName || userAddress !== originalAddress);
    setIsEditMode(true);
  };

  const handleAddressChange = (text) => {
    setUserAddress(text);
    setIsProfileChanged(userName !== originalName || text !== originalAddress);
    setIsEditMode(true);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        uploadPhoto(uri);
      }
    }
  };

  const uploadPhoto = async (uri: string) => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      if (currentUser) {
        const userUid = currentUser.uid;
        const storageRef = ref(FIREBASE_STORAGE, `profile_images/${userUid}`);

        const response = await fetch(uri);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);

        const userDocRef = doc(FIRESTORE_DB, 'users_data', userUid);
        await updateDoc(userDocRef, { photoURL: downloadURL });

        setUploadSuccessDialogVisible(true);
        await fetchUserData();
      } else {
        setUploadErrorDialogVisible(true);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      setUploadErrorDialogVisible(true);
    }
  };

  const showLogoutDialog = () => setLogoutDialogVisible(true);
  const hideLogoutDialog = () => setLogoutDialogVisible(false);
  const hideUploadSuccessDialog = () => setUploadSuccessDialogVisible(false);
  const hideUploadErrorDialog = () => setUploadErrorDialogVisible(false);

  return (
    <PaperProvider theme={customTheme}>
      <BackgroundComponent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.blueBackground}>
              <Text style={styles.title}>Profile</Text>
            </View>
            <View style={styles.contentContainer}>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={
                    userPhotoURL
                      ? { uri: userPhotoURL }
                      : require('../../assets/images/profile.png')
                  }
                  style={styles.profileImage}
                />
              </TouchableOpacity>

              <View style={styles.labelContainer}>
                <Text style={styles.label}>Name</Text>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={[styles.infoText, { color: '#242424' }]}
                    value={userName}
                    onChangeText={handleNameChange}
                  />
                </View>
              </View>

              <View style={styles.labelContainer}>
                <Text style={styles.label}>Address</Text>
                <View style={styles.infoContainerLarge}>
                  <TextInput
                    style={[styles.infoText, { color: '#242424' }]}
                    value={userAddress}
                    onChangeText={handleAddressChange}
                    multiline={true}
                  />
                </View>
              </View>

              <View style={styles.labelContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>{userEmail}</Text>
                </View>
              </View>

              {isProfileChanged && (
                <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.button} onPress={showLogoutDialog}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </BackgroundComponent>

      <Portal>
        <Dialog visible={logoutDialogVisible} onDismiss={hideLogoutDialog}>
          <Dialog.Title>Confirm Logout</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideLogoutDialog}>Cancel</Button>
            <Button onPress={handleLogout}>Logout</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={uploadSuccessDialogVisible} onDismiss={hideUploadSuccessDialog}>
          <Dialog.Title>Success</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Profile updated successfully</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideUploadSuccessDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={uploadErrorDialogVisible} onDismiss={hideUploadErrorDialog}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Failed to update profile.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideUploadErrorDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blueBackground: {
    backgroundColor: '#084298',
    height: '20%',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: '#ffffff',
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginTop: 15,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: -95,
    marginBottom: 30,
    borderWidth: 8,
    borderColor: '#F3F3F3',
  },
  labelContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFC1076E',
    justifyContent: 'center',
  },
  infoContainerLarge: {
    width: '100%',
    height: 70,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFC1076E',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'left',
  },
  saveButton: {
    backgroundColor: '#084298',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    marginTop: 20,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#084298',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Profile;
