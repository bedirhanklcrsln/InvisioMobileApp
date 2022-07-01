import  React from 'react';
import {useState} from 'react';
import {View , Text,Button,Image,Alert,StyleSheet,FlatList} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { DrawerActions, NavigationContainer} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/Ionicons';
import OfflineForm from '../OfflineForm/OfflineForm';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import {NetInfo , useNetInfo} from "@react-native-community/netinfo";
  

const  Home = () =>    {

     const route= useRoute();
    console.log(route.params);
   
   const navigation = useNavigation();
    const {t,i18n} = useTranslation();
    const fonc = useState();
    function Conn(props)   {
        const state = useNetInfo();
        if(state.isConnected && route.params=="aktif")
        {
            console.log("1");
            return(
                <Text style={styles.text3}>{t("Çevrimdışısınız")}</Text>
                );
        }
        if(state.isConnected && route.params=="inaktif")
        {
            console.log("2");
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
                        console.log("4");
            return(
                
                <Text style={styles.text4}>{t("Çevrimiçisiniz")}</Text>
                );
        }
    }


    function ChosForm()   {
        const Forms = [
            {
                id:"0",
                head:"İzin Talep Formu"
            },
            {
                id:"1",
                head:"Örnek Form 2"
            },
            {
                id:"2",
                head:"Örnek Form 3"
            },
        ];

    const Item = ({head}) => {
        <View style={{backgroundColor:'red',marginHorizontal:16}} >
            <Text style={{fontSize:32}} >
                {head}
            </Text>

        </View>
    }
    
    const renderItem= ({item}) => {
            <Item  head={item.head}  />
    }
    
  

        return(
            <View style={{width:80,height:80}} >
               <FlatList 
               data={ Forms }
               renderItem= {renderItem}
               keyExtractor={item => item.id}
               />


            </View>


        )

    }


    return (
        
         <View  >
             <Conn />
            <TextInput style={styles.button1} placeholder={t("Form Ara")}
            />
             <TouchableOpacity style={styles.button2} onPress={ () => navigation.navigate('SavedForms',route.params)} >
             
                 <Text style={styles.text1} > {t("İzin Talep Formu")}</Text>
                 <Text style={styles.text2} > {t("Versiyon Numarası")} 1.2                                    <FontAwesome
            name="play"
            size={20}
          /> </Text>
             </TouchableOpacity>
            
         </View>   
        
    );
};

const styles = StyleSheet.create({
    button1: {
        borderWidth:1,
        marginBottom:20,
        paddingHorizontal:20,
        paddingVertical:10,
        marginHorizontal:50,

    },
    button2: {
        marginHorizontal:40,
        paddingVertical:20,
        borderWidth:1,
        borderColor:'#868B8E',
    },
    text1:{
        
        marginRight:30,
        fontWeight:'bold',
        color:'black',
        alignSelf:'flex-start',
    },
    text2:{
        alignSelf:'flex-start',
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

export default Home;

