import React,  {Component} from 'react';
import {useState} from 'react';
import {View, Text , Image , StyleSheet,Button, TextInput,Alert,TouchableOpacity} from 'react-native';
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import Logo from '../../../assets/images/inviso.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';



function  LogInScreen  (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const {height} = useWindowDimensions(); 
    const navigation= useNavigation();
    const {t,i18n} = useTranslation();


    const setData =  () => {
        if (username==='asya' && password==='1234'){
            navigation.navigate('Home');
        }
        else{
            Alert.alert(t("Kullanıcı adı veya parola hatalı"));
        }
    }


    return(
        <View style={styles.root}>
                <Image 
                source={Logo} 
                style={[styles.logo , {height: height * 0.3}]} 
                resizeMode= "contain"
                />
        
        <CustomInput
         placeholder= {t("Kullanıcı adı")} 
        value = {username} 
        setValue = {setUsername} 
        />

        <CustomInput
        
        placeholder= {t("Şifre")}
        value = {password} 
        setValue = {setPassword}  
        secureTextEntry = {true}
          />

          <CustomButton  text={t('Giriş Yap')} onPress={() => setData()}/>    
         

            
            <View>
                <Text style={styles.text2}> @ 32Bit Bilgisayar Hizmetleri </Text>
            </View>
            
        </View>
    );

};


const styles = StyleSheet.create({
root:{
    height: '100%',
    backgroundColor:'white',
    alignItems:'center',
    paddingHorizontal:20,

},
    logo:{
        width:'60%',
        maxWidth:300,
        maxHeight:200,
    },
    text2:{
        fontWeight: 'bold',
        paddingTop:100,
    },
    text1:{
             color:'black',
            fontWeight: 'bold',
            paddingTop:20,
    },

});

export default LogInScreen;