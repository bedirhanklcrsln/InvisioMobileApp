import React, {useState} from 'react';
import {Component} from 'react';
import {
  SafeAreaView, StyleSheet,Image, View, Text, Button, Navigator  
} from 'react-native';
import { DrawerActions, NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from './src/screens/LogIn/LogInScreen';
import UUID from './src/screens/UUID/UUID';
import Home from './src/screens/HomeScreen/Home';
import OfflineForm from './src/screens/OfflineForm/OfflineForm';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from './src/screens/Settings/Settings';
import MyTasks from './src/screens/MyTasks/MyTasks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DataSend from './src/Drawer/DataSend';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Navigation from './src/navigation/navigation';
import Languages from './src/screens/Languages/Languages';
import CameraSettings from './src/screens/CameraSettings/CameraSettings';
import QuitButton from './src/screens/QuitButton/QuitButton';
import { useTranslation } from 'react-i18next';
import SavedForms from './src/screens/Forms/SavedForms';
import CameraTest from './src/screens/CameraSettings/CameraTest';
import navigation from './src/navigation/navigation';
import Permis from './src/screens/Forms/Permis';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 220, height:50 }}
      source={require('./assets/images/inviso.png')}
      resizeMode="contain"
    />
  );
}

function DrawerRoutes(props){
  const route = useRoute();
  const {t,i18n} = useTranslation();


  return(
    <Drawer.Navigator  drawerContent={props => <DataSend {...props}/>} initialRouteName="Home">
      <Drawer.Screen   name={t("Formlar")} component={Home}  options={{ headerTitle: (props) => <LogoTitle  {...props} /> ,
        drawerIcon: () => (
          <MaterialCommunityIcons name='form-select' size={25} />
        ) 
      }} />
      <Drawer.Screen name = {t("Görevlerim")} component={MyTasks}  options={{
        drawerIcon: () => (
          <AntDesign name='form' size={25}  />
        ) 
      }} />
      <Drawer.Screen name = {t("ÇevrimDışı Kaydedilen Formlar")} component={OfflineForm}  options={{
        drawerIcon: () => (
          <Entypo name='download' size={25}  />
          
        ) 
      }}  />
      <Drawer.Screen name = {t("Ayarlar")} component={Settings}  options={{
        drawerIcon: () => (
          <Ionicons name='settings-sharp' size={25}   />
        ) 
      }}  />
    <Drawer.Screen   name= {t("Çıkış Yap")}  component={QuitButton} options={{ drawerLabelStyle:({color:"red", alignSelf:'center'})            
    }} />
    </Drawer.Navigator>  
  );

}

const App = () =>  {
 
  return (
    
    <NavigationContainer>
        <Stack.Navigator  initialRouteName='UUID' screenOptions={{headerShown: false}}  >  
            <Stack.Screen name = "LogIn" component={LogInScreen}/>
            <Stack.Screen name = "UUID" component={UUID}/>
            <Stack.Screen name = "Home" component={DrawerRoutes}/>
            <Stack.Screen name = "OfflineForm" component={DrawerRoutes}  />
            <Stack.Screen name = "Settings" component={Settings}/>
            <Stack.Screen name = "Languages" component={Languages}/>
            <Stack.Screen name = "Permis" component={Permis}/>
            <Stack.Screen name = "CameraSettings" component={CameraSettings} />
            <Stack.Screen name = "CameraTest" component={CameraTest}/>
            <Stack.Screen name = "Navigation" component={Navigation}/>
            <Stack.Screen name = "SavedForms" component={SavedForms} options={{headerShown:true,headerTitle: ()  => <LogoTitle />,animationEnabled:false
            }}/>
            </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
