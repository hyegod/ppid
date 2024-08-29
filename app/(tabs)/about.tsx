import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome6 } from '@expo/vector-icons';

const About = () => {
  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>About Us</Text>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Address</Text>
          <View style={styles.detailContainer}>
            <View style={styles.iconContainer}>
              <Icon name="map-marker" size={25} color="#ffc107" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Jalan Urip Sumoharjo No. 269</Text>
            </View>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.iconContainer}>
              <Icon name="building" size={25} color="#ffc107" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Kota Makassar, Indonesia</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Contact</Text>
          <View style={styles.detailContainer}>
            <View style={styles.iconContainer}>
              <Icon name="phone" size={25} color="#ffc107" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>085240774632</Text>
            </View>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.iconContainer}>
              <Icon name="envelope" size={25} color="#ffc107" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>ppidbkad@gmail.com</Text>
            </View>
          </View>
        </View>

        <Text style={styles.headerf}>Follow Us</Text>

        <View style={styles.socialMediaContainer}>
          <TouchableOpacity
            style={styles.socialMediaSection}
            onPress={() => handlePress('https://www.instagram.com/bkadsulsel')}
          >
            <View style={styles.iconContainer}>
              <Icon name="instagram" size={40} color="#E4405F" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.socialMediaHeader}>Instagram</Text>
              <Text style={styles.socialMediaText}>@bkadsulsel</Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.socialMediaSection}
            onPress={() => handlePress('https://www.facebook.com/example')}
          >
            <View style={styles.iconContainer}>
              <Icon name="facebook" size={40} color="#4989FF" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.socialMediaHeader}>Facebook</Text>
              <Text style={styles.socialMediaText}>facebook.com/example</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialMediaSection}
            onPress={() => handlePress('https://www.twitter.com/example')}
          >
            <View style={styles.iconContainer}>
              <FontAwesome6 name="x-twitter" size={40} color="#FFFFFF" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.socialMediaHeader}>X - Twitter</Text>
              <Text style={styles.socialMediaText}>@example</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialMediaSection}
            onPress={() => handlePress('https://www.linkedin.com/company/example')}
          >
            <View style={styles.iconContainer}>
              <Icon name="linkedin" size={40} color="#3CBBFF" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.socialMediaHeader}>LinkedIn</Text>
              <Text style={styles.socialMediaText}>linkedin.com/company/example</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        <View style={styles.footer}>
          <Text style={styles.supportedBy}>
            Supported by .&nbsp;
            <Text style={{ fontWeight: 'bold' }} onPress={() => Linking.openURL('https://linyjayainformatika.co.id')}>
            PT LinyJayaInformatika
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  footer: {
    alignItems: 'center',
  },
  supportedBy: {
    marginTop: 20,
    marginBottom: 60,
    fontSize: 10,
    color: '#000000',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 25,
    fontWeight: '900',
    marginTop: 10,
    marginBottom: 10,
  },
  headerf: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 5,
  },
  section: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#084298',
    borderRadius: 15,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#08429853',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#ffffff'
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
     color:'#ffffff'
  },
  socialMediaContainer: {
    marginTop: 10,
  },
  socialMediaSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#084298',
    borderRadius: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#08429853',
  },
  iconContainer: {
    width: 60, // Adjust the width to align icons properly
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  socialMediaHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
     color:'#ffffff'
  },
  socialMediaText: {
    fontSize: 16,
     color:'#ffffff'
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailIconContainer: {
    width: 30, // Adjust the width to align icons properly
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailIcon: {
    marginRight: 10,
  },
});

export default About;
