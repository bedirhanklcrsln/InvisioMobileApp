import  React, {useState,useRef,useEffect} from 'react';
import {View , Text,Button,Alert,StyleSheet,ScrollView,Image,TextInput,TouchableOpacity, LogBox,AsyncStorageStatic} from 'react-native';
import {useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import {NetInfo , useNetInfo} from "@react-native-community/netinfo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioForm from 'react-native-simple-radio-button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from "react-native-image-picker";
import SignatureScreen from "react-native-signature-canvas";
import Navigation from '../../navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from 'react-native-view-shot';
import Geolocation from '@react-native-community/geolocation';



const data = require('./AllInOneForm.json');



function Conn(props)   {
    const state = useNetInfo();
    const route= useRoute(); 
    const {t,i18n} = useTranslation();
    if(state.isConnected && route.params=="aktif")
    {
        return(
            <Text style={styles.text3}>{t("Çevrimdışısınız")}</Text>
            );
    }
    if(state.isConnected && route.params=="inaktif")
    {
        return(
        <Text style={styles.text4}>{t("Çevrimiçisiniz")}</Text>
        );
    }
    if(!state.isConnected){
      console.log("3");

      return(
          

          <Text style={styles.text3}>{t("Çevrimdışısınız")}</Text>
          );
  }
    else
    {
        return(
            <Text style={styles.text4}>{t("Çevrimiçisiniz")}</Text>
            );
    }
}




 const SavedForms = () => {

  const se= useRoute();
  //const [Sig,setSig] = useState('');
  const Sig = se.params;
 
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
                      saveToPhotos:true,
                      quality:0.8,
                       },
                       (response) => {
                        if(response.didCancel){
                          console.log("Cancel")
                        } else {
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
                        } else {
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
      

   
    const route= useRoute(); 
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
    const [Genderv,setGenderv] = useState("Erkek");
    const [name, setName] = useState('');
    const [check,setCheck] = useState('');
    let [camtype,setcamtype] = useState('back');
    let gen = 0;
    const [loc,setloc] = useState(0);
    const [loc1,setloc1] = useState(0);


    useEffect(() => {
      getData();
      _getCurrentLocation();
   },[]);

   const getData = () => {

    try {
      AsyncStorage.getItem('CameraSet')
      .then(cam => {
        if(cam != null){
          let user = JSON.parse(cam);
          setcamtype(user.type);
          console.log(user.type);
          console.log(camtype);
        }
      })

    } catch (error) {
      console.log("permis eror");
    }
   }


    const setData = async () => {
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
          let offline = {
            barkod:"32Bit298hjgs83sp3",
            formName:"İzin Talep Formu",
            stat:"Cihaza Kaydedilmedi",
            cdate:cdate.toString(),
        }
          await AsyncStorage.setItem('OfflineData',JSON.stringify(offline));
          await AsyncStorage.setItem('UserData',JSON.stringify(user));
          console.log(value);
          navigation.navigate(t("ÇevrimDışı Kaydedilen Formlar"))
          
          console.log(user.Name);
      } catch (error) {
          console.log(error);
      }
  }
  

    
    var radio_props = [
        
        {label: t('Erkek'), value: 0 },
        {label: t('Kadın'), value: 1 }
      ];
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
        
 
    
const ViewShotRef = useRef();

            return (
                <ScrollView  >
                    <Conn />
                    <ViewShot ref={ViewShotRef} style={{flex:1,backgroundColor:'white'}} options={{format:'jpg',quality:0.8}}  >
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
                        initial={value}
                        onPress={() => {
                            if(value==0){
                              setGenderv("Kadın")
                              setValue(1);
                              console.log(Genderv)
                            }
                            else{
                              setGenderv("Erkek")
                              setValue(0);
                              console.log(Genderv);
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

                    </ViewShot>
                    <TouchableOpacity  style={{borderWidth:1,borderRadius:5,height:50,backgroundColor:'#C4DDFF',marginBottom:50}} onPress={ () => navigation.navigate("Navigation") }  >
                            <Text style={{alignSelf:'center',marginVertical:'3%'}} >{t("İmza")}</Text>
                        </TouchableOpacity>
                      <View style={{marginBottom:25,marginTop:10,alignItems:'center'}} >
                      <Text style={{color:'black',fontSize:20}}  >{t("Konum")} </Text>
                        <Text style={{color:'black',fontSize:16}}  >{t("Enlem")}  {loc} </Text>
                        <Text style={{color:'black',fontSize:16}} >{t("Boylam")}  {loc1} </Text>
                        
                      </View>
                        <TouchableOpacity  style={{borderWidth:1,borderRadius:5,height:50,backgroundColor:'#5FD068',}} onPress={ () => setData() }  >
                            <Text style={{alignSelf:'center',marginVertical:'3%'}} >{t("Gönder")}</Text>
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


export default SavedForms;

