import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3D3D3D', 
    marginBottom:10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#084298',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#FFC1076E',
    color: '#3D3D3D'
  },
  pickerContainer: {
    borderColor: '#084298',
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: '#FFC1076E',
    marginBottom: 10,
  },
  picker: {
    height: 45,
    top: -8,
    color: '#000000F6',
    marginLeft: -7,
  },
  docPic: {
    marginBottom: 10,
  },
  fileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  fileInfo: {
    flex: 1,
    fontSize: 16,
    color: '#3D3D3D',
  },
  deleteButton: {
    color: '#FF6347', // Warna merah untuk tombol delete
    marginLeft: 10,
  },
  sectionContainer: {
    backgroundColor: '#FFC1076E', // Warna background untuk section checkbox
    borderRadius: 5,
    borderWidth:0.5,
    borderColor:'#084298',
    padding: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#3D3D3D',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding:5,
    
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#3D3D3D',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    backgroundColor: '#084298',
  },
  textBtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  separator: {
    height: 2,
    borderRadius: 3,
    width: '100%',
    backgroundColor: '#DEDEDE', // Warna garis pemisah
    marginVertical: 20, // Jarak vertikal dari slider ke ikon
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default styles;