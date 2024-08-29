import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Platform, TouchableOpacity, Pressable, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { Snackbar, Portal, Dialog, Button } from 'react-native-paper';
import BackgroundComponent from '../../components/background';
import styles from '../../assets/style/permohonanInfostyle';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { router } from 'expo-router';

interface FormData {
  nama: string;
  pekerjaan: string;
  alamat: string;
  hp: string;
  email: string;
  nik: string;
  rincian_permohonan: string;
  tujuan_permohonan: string;
  peroleh: string[];
  salinan: string[];
}

const PermohonanInformasi: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    pekerjaan: '',
    alamat: '',
    hp: '',
    email: '',
    nik: '',
    rincian_permohonan: '',
    tujuan_permohonan: '',
    peroleh: [],
    salinan: [],
  });
  const [ktp, setKtp] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        setFormData((prevData) => ({
          ...prevData,
          email: user.email ?? '',
        }));
      }
    });

    return unsubscribe;
  }, []);

  const pekerjaanOptions = [
    'Pegawai Negeri',
    'Pegawai Swasta',
    'Wiraswasta',
    'Pelajar/Mahasiswa',
  ];

  const perolehanOptions = [
    'Melihat/membaca/mendengarkan/mencatat',
    'Mendapatkan salinan informasi hardcopy/softcopy'
  ];

  const salinanOptions = [
    'Mengambil Langsung',
    'Kurir',
    'Pos',
    'Faksimili',
    'E-Mail'
  ];

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name: 'peroleh' | 'salinan', value: string, isChecked: boolean) => {
    if (isChecked) {
      setFormData({ ...formData, [name]: [...formData[name], value] });
    } else {
      setFormData({ ...formData, [name]: formData[name].filter(item => item !== value) });
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/png', 'image/jpeg'],
      });

      if (result.assets && result.assets.length > 0) {
        setKtp(result);
      }
    } catch (err) {
      console.error('Error picking document:', err);
      setSnackbarMessage('Error picking document');
      setSnackbarVisible(true);
    }
  };

  const deleteDocument = () => {
    setKtp(null);
  };

  const fieldLabels: { [key in keyof FormData]: string } = {
    nama: 'Nama',
    pekerjaan: 'Pekerjaan',
    alamat: 'Alamat',
    hp: 'No HP',
    email: 'Email',
    nik: 'NIK',
    rincian_permohonan: 'Rincian Permohonan',
    tujuan_permohonan: 'Tujuan Permohonan',
    peroleh: 'Cara Memperoleh Informasi',
    salinan: 'Cara Mendapatkan Salinan',
  };
  
  const validateForm = () => {
    const requiredFields: Array<keyof FormData> = ['nama', 'pekerjaan', 'alamat', 'hp', 'nik', 'rincian_permohonan', 'tujuan_permohonan'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        return `${fieldLabels[field]} is required.`;
      }
    }
    if (!ktp) {
      return 'KTP document is required.';
    }
    if (formData.peroleh.length === 0) {
      return `${fieldLabels['peroleh']} must be selected.`;
    }
    if (formData.salinan.length === 0) {
      return `${fieldLabels['salinan']} must be selected.`;
    }
    return null;
  };
  

  const submitForm = async () => {
    const validationError = validateForm();
    if (validationError) {
      setSnackbarMessage(validationError);
      setSnackbarVisible(true);
      return;
    }

    setIsLoading(true);

    const apiUrl = 'https://linyjayainformatika.co.id/ppid-bkad/api/permohonan-informasi/store';

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value);
      }
    });

    if (ktp && ktp.assets && ktp.assets.length > 0) {
      const file = ktp.assets[0];
      formDataToSend.append('ktp', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      } as any);
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = await response.json();
      if (response.ok) {
        setDialogVisible(true);
        // Clear the form
        setFormData({
          nama: '',
          pekerjaan: '',
          alamat: '',
          hp: '',
          email: FIREBASE_AUTH.currentUser?.email ?? '',
          nik: '',
          rincian_permohonan: '',
          tujuan_permohonan: '',
          peroleh: [],
          salinan: [],
        });
        setKtp(null);
      } else {
        throw new Error(result.message || 'An error occurred while submitting the form, please check your connection');
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('An error occurred while submitting the form, please check your connection');
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <BackgroundComponent>
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>Pengajuan Permohonan</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.nama}
            onChangeText={(text) => handleInputChange('nama', text)}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.pekerjaan}
              onValueChange={(itemValue) => handleInputChange('pekerjaan', itemValue)}
              style={styles.picker}
              dropdownIconColor={'#2A2A2A49'}
            >
              <Picker.Item label="Pilih Pekerjaan" value="" />
              {pekerjaanOptions.map((job, index) => (
                <Picker.Item key={index} label={job} value={job} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Alamat"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.alamat}
            onChangeText={(text) => handleInputChange('alamat', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="No HP"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.hp}
            onChangeText={(text) => handleInputChange('hp', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="NIK"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.nik}
            onChangeText={(text) => handleInputChange('nik', text)}
          />
          <View style={styles.docPic}>
            <Text style={styles.title}>Upload KTP</Text>
            <TouchableOpacity style={styles.button} onPress={pickDocument}>
              <Text style={styles.textBtn}>Pilih File</Text>
            </TouchableOpacity>
            {ktp && ktp.assets && ktp.assets.length > 0 && (
              <View style={styles.fileInfoContainer}>
                <Text style={styles.fileInfo}>File selected: {ktp.assets[0].name}</Text>
                <TouchableOpacity onPress={deleteDocument}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Rincian Permohonan"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.rincian_permohonan}
            onChangeText={(text) => handleInputChange('rincian_permohonan', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tujuan Permohonan"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.tujuan_permohonan}
            onChangeText={(text) => handleInputChange('tujuan_permohonan', text)}
          />

          <View style={styles.separator}></View>

          <Text style={styles.sectionTitle}>Cara Memperoleh Informasi</Text>
          <View style={styles.sectionContainer}>
            {perolehanOptions.map((option, index) => (
              <View key={index} style={styles.checkboxContainer}>
                <Checkbox
                  value={formData.peroleh.includes(option)} color={"#084298"}
                  onValueChange={(isChecked) => handleCheckboxChange('peroleh', option, isChecked)}
                />
                <Text style={styles.checkboxLabel}>{option}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Cara Mendapatkan Salinan</Text>
          <View style={styles.sectionContainer}>
            {salinanOptions.map((option, index) => (
              <View key={index} style={styles.checkboxContainer}>
                <Checkbox
                  value={formData.salinan.includes(option)} color={"#084298"}
                  onValueChange={(isChecked) => handleCheckboxChange('salinan', option, isChecked)}
                />
                <Text style={styles.checkboxLabel}>{option}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.button, isLoading && styles.disabledButton]} 
            onPress={submitForm} 
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.textBtn}>Kirim</Text>
            )}
          </TouchableOpacity>
        </ScrollView>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          {snackbarMessage}
        </Snackbar>

        <Portal>
          <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title>Success</Dialog.Title>
            <Dialog.Content>
              <Text>Form submitted successfully</Text>
            </Dialog.Content>
               <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </BackgroundComponent>
    </KeyboardAvoidingView>
  );
};

export default PermohonanInformasi;