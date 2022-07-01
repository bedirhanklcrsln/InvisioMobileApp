import  React , {Component} from 'react';
import { useState, useEffect, useRef } from 'react';
import {View , Text,TouchableOpacity,FlatList,ScrollView,RefreshControl,StyleSheet,LogBox,Alert, Platform, PermissionsAndroid} from 'react-native';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Drawer } from '../../Drawer/DataSend';
import { useTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraRoll from "@react-native-community/cameraroll";


const  OfflineForm = () => {
 
    const route= useRoute();
    const [isim,setisim]= useState('');
    const [formisim,setformisim]= useState('');
    const [currentd,setcdate]= useState('');
    const [comment,setcomment]= useState('');
    const [sendName,setname]= useState('');
    const [sendDate,setDate]= useState('');
    const [sendFDate,setFDate]= useState('');
    const [sendStatem,setStatem]= useState('');
    const [sendPic,setPic]= useState('');
    const [sendSig,setSig]= useState('');
    const [sendValue,setValue]= useState(0);
    const [check,setCheck] = useState('');

    


    useEffect(() => {
        getData();
        console.log(comment)
      },[]
      );

     const getData = () => {

        try {
          AsyncStorage.getItem('SaveCheck')
          .then(param => {
            if(param != null){
            let check = JSON.parse(param);
            setCheck(check.check);
            console.log(check.check);
            setCheck(check.check);
            }
            console.log(check);
          })
        } catch (error) {
          console.log("permis eror");
        }


        try {
          AsyncStorage.getItem('OfflineData').then(parw => {
            if(parw != null){
              let info = JSON.parse(parw);
              setisim(info.barkod);
              setformisim(info.formName);
              setcdate(info.cdate);
              setcomment(info.stat)
            }
          })
        } catch (error) {
          console.log("error");
        }



       }
     


    const setData = async () => {
        if(isim==''){
            Alert.alert(t("Kaydedilmiş Form Yoktur."));        }
        
        else{
       navigation.navigate('Permis',sendValue);
    }}
 
    async function hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          return true;
        }
      
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
      }


      async function savePicture() {
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
          return;
        }
        CameraRoll.save(check);
        AsyncStorage.mergeItem('OfflineData',JSON.stringify({stat:"Cihaza Kaydedildi"}))
        setcomment("Cihaza Kaydedildi");
        
      };

    const save =  () => {
        if (isim==''){
            Alert.alert(t("Kaydedilmiş Form Yoktur."));        }
        else{
                savePicture();
            }
        }
    

    const {t,i18n} = useTranslation();
    const navigation = useNavigation();
    
    LogBox.ignoreAllLogs(true);
    


    const Square1 = ({text}) => (
        <View style={styles.square1} >
            <TouchableOpacity style={{paddingHorizontal:'20%',paddingVertical:'20%'}}>
                <Text style={styles.text}>{t(text)}</Text>
            </TouchableOpacity>
            </View>
    );
    const Square5 = ({text}) => (
        <View style={styles.square1} >
            <TouchableOpacity style={{paddingHorizontal:'20%',paddingVertical:'20%'}} onPress={() => setData()} >
                <Text style={styles.text1}>{t(text)}</Text>
            </TouchableOpacity>
            </View>
    );
    const Square2 = ({text}) => (
        <View style={styles.square2} >
            <TouchableOpacity style={{paddingHorizontal:'20%',paddingVertical:'20%'}}>
                <Text style={styles.text}>{t(text)}</Text>
            </TouchableOpacity>
            </View>
    );
    const Square3 = ({text}) => (
        <View style={styles.square3} >
            <TouchableOpacity style={{paddingHorizontal:'20%',paddingVertical:'20%'}}>
                <Text style={styles.text}>{t(text)}</Text>
            </TouchableOpacity>
            </View>
    );
    const Square4 = ({text}) => (
        <View style={styles.square3} >
                <Text style={{marginTop:'10%',color: "black",textAlign:'center',fontWeight: "bold"}}>{t(text)}</Text>
            </View>
    );
    const Square6 = ({text}) => (
        <View style={styles.square2} >
                <Text style={{marginTop:'10%',color: "black",textAlign:'center',fontWeight: "bold",}}>{t(text)}</Text>
            </View>
    );


    return (



  
         <View style={styles.row1}>
             <View style={{marginBottom:5}}>
        <TouchableOpacity   onPress={ () => save()} >
          
              <Text  >                                                                                           <FontAwesome
         name="refresh"
         size={20}
         color='black'
       /> </Text>
          </TouchableOpacity>
          </View>
            
            <Square1 text= {t("Barkod")} />
            <Square2 text={t("Form")} />
            <Square2 text={t("İşlem Tarihi")} />
            <Square3 text={t("Durumu")} />
            
            <Square5 text= {(isim)} />
            <Square6 text= {t(formisim)} />
            <Square6 text= {(currentd)} />
            <Square4 text= {t(comment)}/>
            
            </View >             
         
        
    );
    
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:'5%',
    },
    row1: {
        flexDirection: 'row',
        flexWrap:"wrap",
        marginBottom: '75%',
        marginTop: '15%',
        marginHorizontal: '5%',
        flex: 1
    },
    row2: {
        borderWidth:1,
        width:'20%',
        height:'30%',
      flexDirection: "row",
      marginHorizontal:'5%'
    },
    square1: {
        width:'35%',
        borderWidth:1,
        height:'30%',
        alignItems:'center',
    },
    square2: {
        width:'20%',
        borderWidth:1,
        height:'30%'
      },
      square3: {
        width:'25%',
        borderWidth:1,
        height:'30%'
      },
    text: {
      color: "black",
      textAlign:'center',
      fontSize: 12,
      fontWeight: "bold",
    },
    text1: {
        color: "#0AA1DD",
        textAlign:'center',
        fontSize: 12,
        fontWeight: "bold",
        marginTop:'10%',
      },
  });
  export default OfflineForm;

