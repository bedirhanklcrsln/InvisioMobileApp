import  React, {useState,useRef, useEffect} from 'react';
import {View , Text,Button,Alert,StyleSheet,ScrollView,Image,TextInput,TouchableOpacity, LogBox,Share, Platform, PermissionsAndroid} from 'react-native';
import {useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-date-picker';
import RadioForm from 'react-native-simple-radio-button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from "react-native-image-picker";
import SignatureScreen,{SignatureViewRef,} from "react-native-signature-canvas";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignatureView from 'react-native-signature-canvas';
import ViewShot from 'react-native-view-shot';
import CameraRoll from "@react-native-community/cameraroll";
import Geolocation from '@react-native-community/geolocation';





const data = require('./AllInOneForm.json');




 const Permis = ({text}) => {


  const se= useRoute();
  
 
  LogBox.ignoreAllLogs(true);


  const navigation = useNavigation();

  const [Pic,SetPic] = useState('');
  


  


    const ShowAlert = (e) =>  {
    

      function alertSend() {
            return Alert.alert(
              t("İşlemi Seçiniz"),
              t("Fotoğraf Çek Veya Yükle"),
              [
                {
                  text:t("Fotoğraf Çek") ,
                  onPress: () => {
                    ImagePicker.launchCamera({
                      mediaType:'photo',
                      cameraType:'front',
                      includeBase64:true,
                      saveToPhotos:true
                       },
                       (response) => {
                        if(response.didCancel){
                          console.log("Cancel")
                        } 
                        else {
                        console.log(response.assets[0].uri);
                       SetPic(response.assets[0].uri);
                       console.log("savedkamera",Pic);
                        }
                      }, 
                       )
                  },
                
                },
                
        
                {
                    text:t("Fotoğraf Yükle") ,
                    onPress: () => {
                      ImagePicker.launchImageLibrary({
                        mediaType:'photo',
                        includeBase64:true,
                      },
                      (response) => {
                        if(response.didCancel){
                          console.log("Cancel")
                        } 
                        else {
                        console.log(response.assets[0].uri);
                       SetPic(response.assets[0].uri);
                       console.log("savedresim",Pic);
                        }
                      },
                      
                      )
                    },
                },
              ]
            );
               
    
      }

              return(
              <View >
          <View style={{marginTop:'10%',marginHorizontal:50}} >
                        <Button title={t('Fotoğraf Çek Veya Yükle')} onPress={() => alertSend()} ></Button>
                    </View>
                    <View style={styles.view} >
                    </View>

                    </View>
    
              )
      };
      

    
    const {t,i18n} = useTranslation();
    const [date, setDate] = useState(new Date())
    const [fdate, setFDate] = useState(new Date())
    const [cdate, setCDate] = useState(new Date())  
    const [open, setOpen] = useState(false)
    const [fopen, setFOpen] = useState(false)
    const [Stext, setSText] = useState('')
    const [Ftext, setFText] = useState('')
    const [Statem, setStatem] = useState('')
    const [value, setValue] = useState(0);
    const [name, setName] = useState('');
    const [Sig,setSig] = useState('');
    const [check,setCheck] = useState('');
    const [loc,setloc]= useState(0);
    const [loc1,setloc1]= useState(0);
    const [kol,setkol]= useState("selam");


   useEffect(() => {
    _getCurrentLocation();
    getData();  
    viewShot();
   },[]);


   const getData = () => {

    try {
      AsyncStorage.getItem('UserData')
      .then(param => {
        if(param != null){
          let user = JSON.parse(param);
          setName(user.Name);
          setStatem(user.Statem);
          setSText(user.Date);
          SetPic(user.Picture);
          setFText(user.FDate);
          setSig(user.Signature);
          setValue(user.Gender);
          //setValue(user.Gender);
        }
      })

    } catch (error) {
      console.log("permis eror");
    }
   }

   async function viewShot () {
   const imageURI = await ViewShotRef.current.capture();
    console.log(imageURI);
    setCheck(imageURI);
   }

   function  _getCurrentLocation () {
       
    Geolocation.getCurrentPosition(
      (position) => {
        setloc(position.coords.latitude);
        setloc1(position.coords.longitude);
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
      }


   const saveData = async () => {
    try {
        let user = {
            Name:name,
            Date:Stext.toString(),
            FDate:Ftext.toString(),
            Statem:Statem,
            Picture:Pic,
            Signature:Sig,
            Gender:value,
        }
        let checking = {
          check:check
        }
        await AsyncStorage.mergeItem('OfflineData',JSON.stringify({stat:"Cihaza Kaydedilmedi"}))
        await AsyncStorage.setItem('SaveCheck',JSON.stringify(checking));
        await AsyncStorage.setItem('UserData',JSON.stringify(user));
       console.log(check);
        navigation.navigate(t("ÇevrimDışı Kaydedilen Formlar"));
    } catch (error) {
        console.log(error);
    }
}
const ViewShotRef = useRef();

  
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
    
    CameraRoll.save(imageURI)
    
  };


  





  
    var radio_props = [
        
        {label: t('Erkek'), value: 0 },
        {label: t('Kadın'), value: 1 }
      ];
    

    

            return (
              
                <ScrollView style={{backgroundColor:'white'}} >
                  <ViewShot ref={ViewShotRef} style={{flex:1,backgroundColor:'white'}} options={{format:'jpg',quality:0.8}}    >
                    <View style={styles.view} >
                        <Text  style={{alignSelf:'center',marginBottom:8}} > {t("Ad Soyad")}</Text>
                        <TextInput
                        value={name} 
                        onChangeText={setName}
                        style={styles.container}
                        />
                    </View>
                    <View style={styles.view} >
                        <Text style={{alignSelf:'center',marginBottom:8}} > {t("Başlangıç Tarihi")} </Text> 
                        <TouchableOpacity  style={{borderWidth:1,borderRadius:5,height:50,marginHorizontal:40}} onPress={ () => setOpen(true)}  >
                            <Text style={{alignSelf:'center',marginVertical:'3%'}} >{t("Tarih Seçiniz")}</Text>
                        </TouchableOpacity>
                        <DatePicker 
                        modal
                        mode='date'
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false);
                            setDate(date);
                            setSText(date);
                          }}
                          onCancel={() => {
                            setOpen(false)
                          }}
                        />
                          <Text style={{alignSelf:'center',marginVertical:'3%',color:'black'}} >{Stext.toString()}</Text>
                    </View>
                    <View style={styles.view} >
                        <Text style={{alignSelf:'center',marginBottom:8}} > {t("Bitiş Tarihi")} </Text> 
                        <TouchableOpacity  style={{borderWidth:1,borderRadius:5,height:50,marginHorizontal:40}} onPress={ () => setFOpen(true)}  >
                            <Text style={{alignSelf:'center',marginVertical:'3%'}} >{t("Tarih Seçiniz")}</Text>
                        </TouchableOpacity>
                        <DatePicker 
                        modal
                        mode='date'
                        open={fopen}
                        date={fdate}
                        onConfirm={(fdate) => {
                            setFOpen(false)
                            setFDate(fdate)
                            setFText(fdate);
                          }}
                          onCancel={() => {
                            setFOpen(false)
                          }}
                        />
                       <Text style={{alignSelf:'center',marginVertical:'3%',color:'black'}} >{Ftext.toString()}</Text>
                    </View>
                    
                          <ShowAlert/>

                          <Image style={{width:350,height:300,alignSelf:'center'}}
                          source={{
                            uri:Pic,

                          }}
                          
                          />
                        

                    <View style={styles.view2} >
                        <Text style={{textAlign:'center',color:'white'}} > {t("Açıklama")} </Text>
                        <TextInput style={styles.text}
                        multiline
                        value={Statem} 
                        onChangeText={setStatem}
                        />
                    </View>
                    <View style={{marginVertical:40,marginHorizontal:'5%'}} >
                        <Text style={{color:'black',marginBottom:10}} >{t("Cinsiyet")}</Text>
                        <RadioForm 
                        radio_props={radio_props}
                        initial= {value}
                        onPress={() => {
                            if(value==1){
                              setValue(0)
                            }
                            else{
                              setValue(1)
                            }

                        }}
                        />
                    </View>
                    <View  style={{borderWidth:1,borderRadius:5,height:250,width:350,backgroundColor:'white',marginBottom:50,alignSelf:'center'}}   >
                            <Image style={{width:200,height:250,alignSelf:'center'}}
                            source={{
                              uri:Sig,
                            }}
                            
                            />

                        </View>
                        <View style={{marginBottom:25,marginTop:10,alignItems:'center'}} >
                      <Text style={{color:'black',fontSize:20}}  >{t("Konum")} </Text>
                        <Text style={{color:'black',fontSize:16}}  >{t("Enlem")}  {loc} </Text>
                        <Text style={{color:'black',fontSize:16}} >{t("Boylam")}  {loc1} </Text>
                      </View>
                        </ViewShot>
                        <TouchableOpacity  style={{borderWidth:1,borderRadius:5,height:50,backgroundColor:'#5FD068',}} onPress={ () => saveData() }  >
                            <Text style={{alignSelf:'center',marginVertical:'3%'}} >{t("Kaydet")}</Text>
                        </TouchableOpacity>
                    
                 
                       
            </ScrollView> 
        
    );
    

};

const styles = StyleSheet.create({
    text:{
        margin:10,
        backgroundColor:'white',
        height:300,
        width:335,
        textAlignVertical:'top'

    },
    view:{
      backgroundColor:'white',
        marginTop:'10%',
        marginHorizontal:'5%',
    },
    view2:{
        marginTop:'10%',
        marginHorizontal:'5%',
        backgroundColor:'#73777B',
        width:355,
        height:340,
    },
    container: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        marginHorizontal:40,
    },
    text3:{
        borderWidth:1,
        paddingVertical:10,
        textAlign:'center',
        backgroundColor:'#ff5c5c',
        color:'white',
        fontWeight:'bold',
        
    },
    text4:{
        borderWidth:1,
        paddingVertical:10,
        textAlign:'center',
        backgroundColor:'#8FDD7D',
        color:'white',
        fontWeight:'bold',   
    }
});


export default Permis;

