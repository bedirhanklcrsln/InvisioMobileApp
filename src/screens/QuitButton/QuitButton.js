import  React from 'react';
import { BackHandler} from 'react-native';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-gesture-handler';



function  QuitButton (props)    {
    
    return (
         BackHandler.exitApp()
    );
};
export default QuitButton;

