import * as React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ImageBackground,Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import insaatBilgi from './insaatBilgi';


const Stack = createNativeStackNavigator();

const anaSayfa = ({navigation}) => {

  return (
    <View style={styles.container}>
        <Image
        style={styles.resim}
        source={require('../assets/resim.jpg')}/>
        <TouchableOpacity style={styles.touch1} onPress={(e)=>navigation.navigate("Yapı Kayıt",{insaatBilgi})}>
            <Text>
                Yapı Kayıt
            </Text>
        </TouchableOpacity>
    </View>
  );
};

export default anaSayfa;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    touch1:{
        width:300,
        height:40,
        borderRadius:10,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        bottom:150,
    },
    resim:{
        width:395,
        height:500,
        bottom:180
    },



});

