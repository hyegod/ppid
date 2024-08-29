import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 10,
    },
    listContainer: {
      flexGrow: 1,
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    searchBar: {
      backgroundColor:'#FFC1076E',
      height: 40,
      borderColor: '#2A2A2A49',
      color:'#000000',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginHorizontal: 15,
    },
    itemContainer: {
      backgroundColor: '#084298',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#2A2A2A49',
      padding: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      marginHorizontal: 5,
    },
    link: {
      width: '100%',
      alignItems: 'center',
    },
    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color:'#ffffff',
    },
    itemId: {
      fontSize: 14,
      color: '#888',
      textAlign: 'center',
    },
    noDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noDataText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#3D3D3D',
  
    },
  });

  export default styles;