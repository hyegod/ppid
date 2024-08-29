import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BackgroundComponent from '../../../components/background';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../../firebaseConfig';

interface PermohonanDetail {
  document_id: string;
  namaLengkap: string;
  pekerjaan: string;
  alamat: string;
  nomorHP: string;
  nik: string;
  email: string;
  rincianPermohonan: string;
  tujuanPermohonan: string;
  memperolehInformasi: string;
}

const DaftarPermohonanDetail = () => {
  const { document_id } = useLocalSearchParams(); // Get the document_id from the route params
  const [permohonanDetail, setPermohonanDetail] = useState<PermohonanDetail | null>(null);

  useEffect(() => {
    const fetchPermohonanDetail = async () => {
      try {
        const docRef = doc(FIRESTORE_DB, 'permohonanInfo', document_id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as PermohonanDetail;
          setPermohonanDetail({ document_id: docSnap.id, ...data });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
        // Handle error fetching data
      }
    };

    if (document_id) {
      fetchPermohonanDetail();
    }
  }, [document_id]);

  if (!permohonanDetail) {
    return (
      <BackgroundComponent>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </BackgroundComponent>
    );
  }

  return (
    <BackgroundComponent>
      <View style={styles.container}>
        <Text style={styles.title}>Detail Permohonan</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Nama Lengkap:</Text>
          <Text style={styles.value}>{permohonanDetail.namaLengkap}</Text>

          <Text style={styles.label}>Pekerjaan:</Text>
          <Text style={styles.value}>{permohonanDetail.pekerjaan}</Text>

          <Text style={styles.label}>Alamat:</Text>
          <Text style={styles.value}>{permohonanDetail.alamat}</Text>

          <Text style={styles.label}>Nomor HP:</Text>
          <Text style={styles.value}>{permohonanDetail.nomorHP}</Text>

          <Text style={styles.label}>NIK:</Text>
          <Text style={styles.value}>{permohonanDetail.nik}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{permohonanDetail.email}</Text>

          <Text style={styles.label}>Rincian Permohonan:</Text>
          <Text style={styles.value}>{permohonanDetail.rincianPermohonan}</Text>

          <Text style={styles.label}>Tujuan Permohonan:</Text>
          <Text style={styles.value}>{permohonanDetail.tujuanPermohonan}</Text>

          <Text style={styles.label}>Cara Memperoleh Informasi:</Text>
          <Text style={styles.value}>{permohonanDetail.memperolehInformasi}</Text>
        </View>
      </View>
    </BackgroundComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // Text color for title
  },
  detailContainer: {
    backgroundColor: '#6F6F6F48',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff', // Text color for label
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ffffff', // Text color for value
  },
});

export default DaftarPermohonanDetail;
