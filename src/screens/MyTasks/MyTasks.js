import  React from 'react';
import {View , Text,Button,StatusBar,ScrollView,StyleSheet,SafeAreaView} from 'react-native';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OfflineForm from '../OfflineForm/OfflineForm';
import LogInScreen from '../LogIn/LogInScreen';
import { DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Drawer } from '../../Drawer/DataSend';
import { useTranslation } from 'react-i18next';


function  MyTasks (props)    {
    const {t,i18n} = useTranslation();


    return (
         <View>
             <Text style={{fontSize:25,color:'black'}}>
                {t("Bu sayfa işe alındıktan sonra tamamlanacaktır")}</Text>
         </View>   
        
    );
};
export default MyTasks;

