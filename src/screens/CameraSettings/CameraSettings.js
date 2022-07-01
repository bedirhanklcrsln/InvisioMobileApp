import React from 'react';
import {useState,useEffect} from 'react';
import {View,Text,StyleSheet,Alert,Button, RefreshControl,SafeAreaView, ScrollView} from 'react-native';
import { useTranslation } from 'react-i18next';
import {  useNavigation } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import CustomButton2 from '../../components/CustomButton/CustomButton2';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



let kamera,flash,quality;

function SelectCamera () {

    const navigation = useNavigation();
    const {t,i18n} = useTranslation();
    const route = useRoute();
    

   /* function SelectRear () {
        Alert.alert(t("Arka Kamera Seçildi"));
        navigation.navigate('CameraTest',kamera="back");
    } */
    async function SelectRear () {
        Alert.alert(t("Arka Kamera Seçildi"));
        try {
            let cameraSet = {
                type:"back"
            }
            await AsyncStorage.setItem('CameraSet',JSON.stringify(cameraSet));
        } catch (error) {
            console.log(error);
        }
        //navigation.navigate('CameraTest',kamera="front");
     }

   async function SelectFront () {
        Alert.alert(t("Ön Kamera Seçildi"));
        try {
            let cameraSet = {
                type:"front"
            }
            await AsyncStorage.setItem('CameraSet',JSON.stringify(cameraSet));
        } catch (error) {
            console.log(error);
        }
        //navigation.navigate('CameraTest',kamera="front");
     }

        return(
                
            <View style={styles.View}>
            <Text style={styles.text}>{t("Seçilen Kamera")}</Text>
            <CustomButton2  text={t('Ön')} onPress={() => SelectFront()}/>

             <CustomButton2  text={t('Arka')} onPress={() => SelectRear()}/>

            </View>  
        );  
            }
            
            
            
 function SelectFlash  () {
                const {t,i18n} = useTranslation();
                const navigation = useNavigation();
            
                function SelectFlashOn () {
                    navigation.navigate('CameraTest',flash="on");
                }
                function SelectFlashOff () {
                    navigation.navigate('CameraTest',flash="off");
                 }

            
                    return(
                            
                        <View style={styles.View}>
                            <Text style={styles.text}>{t("Flaş Modu")}</Text>
                            <CustomButton2  text={t('On')} onPress={() => SelectFlashOn()}/>    
                         <View>
                         <CustomButton2  text={t('Off')} onPress={() => SelectFlashOff()}/>
                         </View>
            
                        </View>  
                    );  
                        }



function SelectQuality  () {
                const {t,i18n} = useTranslation();
                const navigation = useNavigation();
            
                function Select720 () {
                    navigation.navigate('CameraTest',quality="720");
                     
                }
                function Select1080 () {
                    navigation.navigate('CameraTest',quality="1080");
                 }

            
                    return(
                            
                        <View style={styles.View}>
                            <Text style={styles.text}>{t("Video Kalitesi")}</Text>
                            <CustomButton2  text={t('720p')} onPress={() => Select720()}/>    
            
            
                         <View>
                         <CustomButton2  text={t('1080p')} onPress={() => Select1080()}/>
                         </View>
            
                        </View>  
                    );  
                        }

                      
                        const wait = (timeout) => {
                            return new Promise(resolve => setTimeout(resolve, timeout));
                          }

const CameraSettings = (props) => {
    const navigation = useNavigation();

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
   

    return(
        <SafeAreaView    >
            <ScrollView  refreshControl={<RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
            
            />}  >
            
            <SelectCamera {...props} />
            <SelectFlash {...props}/>
            <SelectQuality {...props}/>
            </ScrollView>
        </SafeAreaView>



    );
};

const styles = StyleSheet.create({
    text:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
        marginBottom:20,
        color:'black',        
    },
        View: {
            marginTop:'10%',marginHorizontal:'5%'
    },
    View2: {
        borderBottomWidth:0.2,
        paddingHorizontal:16,
        paddingVertical:10,
    },
});

export default CameraSettings;