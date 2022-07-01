import  React from 'react';
import { useState } from 'react';
import {View , Text,Button,StatusBar,Switch,StyleSheet,SafeAreaView} from 'react-native';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import OfflineForm from '../OfflineForm/OfflineForm';
import DeviceInfo from 'react-native-device-info';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {NetInfo,useNetInfo} from "@react-native-community/netinfo";




function Settings({})  {

    const navigation = useNavigation();
    const {t,i18n} = useTranslation();
    const [isEnabled, setIsEnabled] = useState(false);
    const state = useNetInfo();
    //const [bilgi,Setbilgi] = useState('inaktif')
    var bilgi="inaktif";
    const  ToggleSwitch  =  function()  {
        setIsEnabled(previousState => !previousState);
        if(i18n.language=='tr'){
        if(isEnabled)
        {
            // her dile ayrı yap
            navigation.navigate('Formlar',bilgi="inaktif")
        }
        else
        {
            navigation.navigate('Formlar',bilgi="aktif")
        }
    }

    if(i18n.language=='en'){
        if(isEnabled)
        {
            // her dile ayrı yap
            navigation.navigate('Forms',bilgi="inaktif")
        }
        else
        {
            navigation.navigate('Forms',bilgi="aktif")
        }
    }

    if(i18n.language=='de'){
        if(isEnabled)
        {
            // her dile ayrı yap
            navigation.navigate('Formen',bilgi="inaktif")
        }
        else
        {
            navigation.navigate('Formen',bilgi="aktif")
        }
    }



    };

    
    

    return (
        <View>
        <View style={styles.View} >
             <Text  style={styles.text}>
                 {t("ÇevrimDışı Mod")}
             </Text>
             <View>
             <Switch
        trackColor={{ false: "gray", true: "#A8DCDC" }}
        thumbColor={isEnabled ? "#7CCBCB" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={ToggleSwitch}
        value={isEnabled}/> 
         </View>
         </View>

        <View style={styles.View2}>
        <TouchableOpacity style= {styles.touch} onPress={ () => navigation.navigate('Languages')}  >
        <Text style={styles.text} > {t("Dil")}                                                                            <AntDesign name='right' size={20} />  </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.View} >
        <TouchableOpacity style= {styles.touch}  onPress={ () => navigation.navigate('CameraSettings')}  >
        <Text style={styles.text} > {t("Resim ve Kamera Ayarları")}                                  <AntDesign name='right' size={20}  />   </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.View2} >
        <Text style={styles.text2} > {t("Cihaz UUID")} </Text>
        <Text style={styles.uuid}>
          {DeviceInfo.getUniqueId()}
        </Text>
        </View>


         </View>
    );
};


const styles = StyleSheet.create({
    touch: {
        paddingVertical:10,
    },
    text:{
        fontWeight:'bold',
        fontSize:16,
        //color:'black',        
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
    },
        View: {
           borderBottomWidth:0.2,
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal:16,
            paddingVertical:10,
    },
    View2: {
        borderBottomWidth:0.2,
        paddingHorizontal:16,
        paddingVertical:10,
    },
    uuid: {
        color:'gray',
        fontSize:15,
        textAlign:'left',
        marginBottom:5
    },
    text2: {
        fontWeight:'bold',
        fontSize:16,
        //color:'black',
    }

});
export default Settings;


