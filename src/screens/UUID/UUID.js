import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    SafeAreaView, StyleSheet, View, Text, Pressable,Button,TouchableOpacity 
  } from 'react-native';
import DeviceInfo, { getBootloader, getUserAgentSync } from 'react-native-device-info';
import CustomButton from '../../components/CustomButton';
import { useTranslation } from 'react-i18next';


function UUID  (props)  {
  const navigation= useNavigation();
  const {t,i18n} = useTranslation();

return(

<View style={{
        
        //height:100,
        marginTop:250,
        paddingHorizontal:60,
       
       }}> 
        <Text 
        style={{
          color:'black',
          textAlign:'center',
          marginBottom:10,
          fontSize:20,
        }}

        >
          
            {t("Cihaz UUID")}:
         </Text>
        <Text
        style={{
          color:'black',
          fontSize:20,
          textAlign:'center',
          marginBottom:10,
        }}
        >
          {DeviceInfo.getUniqueId()}
        </Text>
        <CustomButton text={t("Tamam")} onPress={()=> navigation.navigate('LogIn')}>

        </CustomButton>

          

        </View>
    );
};

const styles = StyleSheet.create({
  container:{
      backgroundColor: '#ff5c5c',

      width: '100%',
      padding:15,
      marginVertical: 5,
      alignItems: 'center',
      borderRadius: 10,
  },

  text: {
      fontWeight: 'bold',

  },


});

export default UUID;
