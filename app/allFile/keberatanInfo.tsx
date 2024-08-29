import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Snackbar, Portal, Dialog, Button } from 'react-native-paper';
import BackgroundComponent from '../../components/background';
import styles from '../../assets/style/permohonanInfostyle';
import { FIREBASE_AUTH } from '../../firebaseConfig';

interface FormData {
  ppid_permohonan_no: string;
  tujuan: string;
  pemohon_nama: string;
  pemohon_pekerjaan: string;
  pemohon_hp: string;
  pemohon_alamat: string;
  kuasa_pemohon: string;
  kuasa_alamat: string;
  kuasa_hp: string;
  alasan: string[];
}

const alasanOptions = [
  'Permohonan Informasi Ditolak',
  'Informasi Berkala Tidak Disediakan',
  'Informasi Tidak Ditanggapi',
  'Permintaan Informasi Dianggap Tidak Sebagaimana Yang Diminta',
  'Permintaan Informasi Tidak Dipenuhi',
  'Biaya Yang Dikenakan Tidak Wajar',
  'Informasi Disampaikan Melebihi Jangka Waktu Yang Ditentukan',
];

const KeberatanInfo: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    ppid_permohonan_no: '',
    tujuan: '',
    pemohon_nama: '',
    pemohon_pekerjaan: '',
    pemohon_hp: '',
    pemohon_alamat: '',
    kuasa_pemohon: '',
    kuasa_alamat: '',
    kuasa_hp: '',
    alasan: [],
  });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        setFormData((prevData) => ({
          ...prevData,
          pemohon_hp: user.phoneNumber ?? '',
        }));
      }
    });

    return unsubscribe;
  }, []);

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setFormData({ ...formData, alasan: [...formData.alasan, value] });
    } else {
      setFormData({ ...formData, alasan: formData.alasan.filter(item => item !== value) });
    }
  };

  const fieldLabels: { [key in keyof FormData]: string } = {
    ppid_permohonan_no: 'No PPID Permohonan',
    tujuan: 'Tujuan',
    pemohon_nama: 'Nama Pemohon',
    pemohon_pekerjaan: 'Pekerjaan Pemohon',
    pemohon_hp: 'HP Pemohon',
    pemohon_alamat: 'Alamat Pemohon',
    kuasa_pemohon: 'Kuasa Pemohon',
    kuasa_alamat: 'Alamat Kuasa',
    kuasa_hp: 'HP Kuasa',
    alasan: 'Alasan',
  };
  
  const validateForm = () => {
    const requiredFields: Array<keyof FormData> = [
      'ppid_permohonan_no',
      'tujuan',
      'pemohon_nama',
      'pemohon_pekerjaan',
      'pemohon_hp',
      'pemohon_alamat',
      'kuasa_pemohon',
      'kuasa_alamat',
      'kuasa_hp',
    ];
  
    for (let field of requiredFields) {
      if (!formData[field]) {
        return `Field ${fieldLabels[field]} is required.`;
      }
    }
  
    if (formData.alasan.length === 0) {
      return 'At least one option for Alasan must be selected.';
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

    setIsSubmitting(true);

    const apiUrl = 'https://linyjayainformatika.co.id/ppid-bkad/api/keberatan-informasi/store';

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value);
      }
    });

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
          ppid_permohonan_no: '',
          tujuan: '',
          pemohon_nama: '',
          pemohon_pekerjaan: '',
          pemohon_hp: '',
          pemohon_alamat: '',
          kuasa_pemohon: '',
          kuasa_alamat: '',
          kuasa_hp: '',
          alasan: [],
        });
      } else {
        throw new Error(result.message || 'An error occurred while submitting the form, please check your connection');
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('An error occurred while submitting the form, please check your connection');
      setSnackbarVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <BackgroundComponent>
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>Pengajuan Keberatan</Text>
          <TextInput
            style={styles.input}
            placeholder="No PPID Permohonan"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.ppid_permohonan_no}
            onChangeText={(text) => handleInputChange('ppid_permohonan_no', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tujuan"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.tujuan}
            onChangeText={(text) => handleInputChange('tujuan', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nama Pemohon"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.pemohon_nama}
            onChangeText={(text) => handleInputChange('pemohon_nama', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Pekerjaan Pemohon"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.pemohon_pekerjaan}
            onChangeText={(text) => handleInputChange('pemohon_pekerjaan', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="HP Pemohon"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.pemohon_hp}
            onChangeText={(text) => handleInputChange('pemohon_hp', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Alamat Pemohon"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.pemohon_alamat}
            onChangeText={(text) => handleInputChange('pemohon_alamat', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Kuasa Pemohon"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.kuasa_pemohon}
            onChangeText={(text) => handleInputChange('kuasa_pemohon', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Alamat Kuasa"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.kuasa_alamat}
            onChangeText={(text) => handleInputChange('kuasa_alamat', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="HP Kuasa"
            placeholderTextColor={'#2A2A2A49'}
            value={formData.kuasa_hp}
            onChangeText={(text) => handleInputChange('kuasa_hp', text)}
          />

          <View style={styles.separator}></View>

          <Text style={styles.sectionTitle}>Alasan</Text>
          <View style={styles.sectionContainer}>
            {alasanOptions.map((option, index) => (
              <View key={index} style={styles.checkboxContainer}>
                <Checkbox
                  value={formData.alasan.includes(option)} color={'#084298'}
                  onValueChange={(isChecked) => handleCheckboxChange(option, isChecked)}
                />
                <Text style={styles.checkboxLabel}>{option}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.button, isSubmitting && styles.disabledButton]} 
            onPress={submitForm} 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
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

export default KeberatanInfo;