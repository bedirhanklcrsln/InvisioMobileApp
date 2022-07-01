import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const CustomButton2 = ({ onPress, text}) => {


    return(
<Pressable onPress={onPress} style={styles.container} >
    <Text style= {styles.text}>{text}</Text>

</Pressable>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FF8D29',
        width: '60%',
        padding:15,
        marginVertical: 10,
        alignSelf:'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    text: {
        color:'black',
        fontWeight: 'bold',

    },


});

    export default CustomButton2