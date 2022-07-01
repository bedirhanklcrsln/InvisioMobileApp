import React from 'react';
import { useTranslation } from 'react-i18next';
import {Text,View,StyleSheet} from 'react-native';
import SwitchSelector from "react-native-switch-selector";

const options = [
        {label:'türkçe', value: 'tr'},
        {label:'english', value: 'en'},
        {label:'deutsch', value: 'de'},
];

const Languages = () => {

    const {t,i18n} = useTranslation();

    function selectLanguage() {
        if(i18n.language== 'tr'){
            return 0;
        } else if (i18n.language =='en'){
            return 1;
        } else if (i18n.language=='de'){
            return 2;
        } else {
            return 0;
        }
    }

    return(
        <View style={styles.View} >
           <Text style={styles.text}  >  {t("Dil")}   </Text>
           <SwitchSelector 
           options={options} 
           hasPadding
            initial={selectLanguage()}
           onPress={(Language) => {
               i18n.changeLanguage(Language);
           }

           }
           
           />

        </View>



    );
};
const styles = StyleSheet.create({
    text:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        marginBottom:20,
        color:'black',        
    },
        View: {
            marginVertical:'50%',marginHorizontal:'5%'
    },
    View2: {
        borderBottomWidth:0.2,
        paddingHorizontal:16,
        paddingVertical:10,
    },
});


export default Languages;