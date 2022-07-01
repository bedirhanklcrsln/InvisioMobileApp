import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { DrawerContentScrollView ,DrawerItem,DrawerItemList } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';



const DataSend = (props) => {
    const route = useRoute();
    const {t,i18n} = useTranslation();

    return(
        <DrawerContentScrollView>
            <Text style={{textAlign:"center",marginBottom:100,fontWeight:"bold",fontSize:18}}>{t("Hosgeldiniz")}, asya</Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>

    );

}
 
export default DataSend;

