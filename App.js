import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import anaSayfa from './sayfalar/anaSayfa';
import insaatBilgi from './sayfalar/insaatBilgi';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Ana Sayfa"  component={anaSayfa} />
        <Stack.Screen name="Yapı Kayıt" component={insaatBilgi} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

