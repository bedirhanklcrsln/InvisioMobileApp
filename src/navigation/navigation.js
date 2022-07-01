import SignatureScreen from "react-native-signature-canvas";
import React,{Component, useState} from 'react';
import { View,Text,TouchableOpacity,Modal,StyleSheet,Button } from "react-native";
import { useTranslation } from 'react-i18next';
import { useRef } from "react";
import {useNavigation, useRoute } from '@react-navigation/native';



const ModalPoup = ({visible, children}) => {
      const [showModal,setShowModal] = React.useState(visible);
      React.useEffect(() => {
          toggleModal();
      }, [visible]);
      const toggleModal = () => {
        if(visible){
          setShowModal(true);
        }
        else{
          setShowModal(false);
        }
      }

      return(
          <Modal   transparent visible={showModal}>
          <View style={styles.modalBackGround}>
            <View style={styles.modalContainer}>{children}</View>
          </View>
          </Modal>

      )

}



const Navigation = ({ text,onOK }) => {
  const navigation = useNavigation();
  const {t,i18n} = useTranslation();
  const [visible,setVisible] = React.useState(true);
  const [paraw,SetSignature] = useState('');

  const ref = useRef();

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log(signature);
    SetSignature(signature);
    //onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
    //console.log(data);
  };

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ModalPoup  visible={visible} >
        <View  style={{alignItems:'center',width:'100%',height:500}} >
      <SignatureScreen style={{flex:1,borderWidth:2,borderColor:'black',height:300,width:350,marginBottom:20}}

ref={ref}
onEnd={handleEnd}
onOK={handleOK}
onEmpty={handleEmpty}
onClear={handleClear}
onGetData={handleData}
autoClear={false}
descriptionText={text}
/>
</View>
<Button title={t("Tamam")} onPress={() => navigation.navigate("SavedForms",paraw) } >

</Button>
      </ModalPoup>


    </View>
    
  );
};


const styles = StyleSheet.create({
  modalBackGround:{
      flex:1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent:'center',
      alignItems:'center'
  },
  modalContainer:{
      width:400,
      height:600,
      backgroundColor:'white',
      paddingHorizontal:20,
      paddingVertical:30,
      borderRadius:20,
      elevation:20,
  },
  header:{
    width:'100%',
    height:40,
    alignItems:'flex-end',
    justifyContent:'center'
  }


})

export default Navigation;