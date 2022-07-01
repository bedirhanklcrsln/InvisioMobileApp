import React from 'react';
import {
  View,
  StyleSheet,
  Button
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createIconSetFromFontello } from 'react-native-vector-icons';

export default function CameraTest() {
  

  const route = useRoute();
  const flash = route.params;
  const kamera = route.params;
  const [{cameraRef},{takePicture}] = useCamera(null);

  const captureHandle = async () => {
    try {
    const data = await takePicture();
    console.log(data.uri);
    const filePath = data.uri;
    const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.jpg';
    RNFS.moveFile(filePath, newFilePath)
    .then(() => {
      console.log('IMAGE MOVED',newFilePath);
    })
    } catch (error) {
      console.log(error);
    }

  }
console.log(route.params);
  return(
    <View style={styles.body} >
      <RNCamera
      ref={cameraRef}
      type={route.params}
      style={styles.preview}
      flashMode={route.params}
      defaultVideoQuality= "720p"
      >
        <Button title='Capture' onPress={() => captureHandle()} />

      </RNCamera>

    </View>

  );
}

const styles = StyleSheet.create({
      body:{
        flex:1,
      },
      preview:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end',
      }


});