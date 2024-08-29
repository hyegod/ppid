import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: 'transparent', // Set to transparent to show the background component
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#000000',
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 10,
      alignSelf: 'center',
      marginBottom: 20,
      borderWidth:1,
      borderColor:'#3D3D3D'
    },
    descContainer: {
      alignItems: 'flex-start',
    },
    descLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#000000',
      marginLeft: 25,
    },
    description: {
      fontSize: 16,
      marginBottom: 20,
      color: '#000000',
      marginLeft:25,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    fullImage: {
      width: '100%',
      height: '100%',
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      zIndex: 1,
      backgroundColor: '#ffffff',
      padding: 10,
      borderRadius: 20,
    },
    closeButtonText: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
  
  export default styles;