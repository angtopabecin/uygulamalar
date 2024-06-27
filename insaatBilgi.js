import * as React from 'react';
import {View,Text,TouchableOpacity,Pressable,StyleSheet,TextInput,Button,ImageBackground, ScrollView} from 'react-native';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as SQLite from "expo-sqlite";

const Stack = createNativeStackNavigator();

const insaatBilgi = () => {
    
    const [bina,setBina] = useState([])
    const [binaAdi,setBinaAdi] = useState('')
    const [binaParselNo,setBinaParselNo] = useState()
    const [binaSehir,setBinaSehir] = useState('')
    const [binaYili,setBinaYili] = useState()
    const [binaMetrekare,setBinaMetrekare] = useState()
    const [binaToplamDemir,setBinaToplamDemir] = useState()
    const [binaToplamBeton,setBinaToplamBeton] = useState()


    const binaParselNoInput = (input) =>{
        setBinaParselNo(input)
    }
    const binaAdiInput = (input) =>{
        setBinaAdi(input)
    }

    const binaMetrekareInput = (input) =>{
        setBinaMetrekare(input)
        setBinaToplamBeton(Number(binaMetrekare * 0.38))
        setBinaToplamDemir(Number(binaMetrekare * 40 / 100))
    }
    const binaYiliInput = (input) =>{
        setBinaYili(input)
    }

    const binaSehirInput = (input) =>{
        setBinaSehir(input)
    }


    async function CreateDataBase() {
        try {
            const db = await SQLite.openDatabaseSync('mydatabase.db')
            await db.execAsync('CREATE TABLE IF NOT EXISTS bina (binaParselNo INTEGER PRIMARY KEY NOT NULL,binaAdi TEXT NOT NULL, binaMetrekare INTEGER NOT NULL, binaYili INTEGER NOT NULL, binaSehir TEXT NOT NULL, binaToplamBeton DOUBLE NOT NULL, binaToplamDemir DOUBLE NOT NULL)')
        } 
        catch (e) {
            console.log(e)
        }
      }
    
      async function InsertDataBase() {
        try {
            const db = await SQLite.openDatabaseSync('mydatabase.db')
            const result = await db.runAsync('INSERT INTO bina (binaParselNo, binaAdi, binaMetrekare, binaYili, binaSehir,  binaToplamBeton, binaToplamDemir) VALUES (?, ?, ?, ?, ?, ?, ?)', Number(binaParselNo), binaAdi, Number(binaMetrekare), Number(binaYili), binaSehir, Number(binaToplamBeton), Number(binaToplamDemir))
            alert("Başaryla Kaydedilmiştir..")
            getallDataBase()
        } 
        catch (e) {
            alert("Bu Parsel Numarasına Sahip Ev Var..")
            console.log(e)
        }
      }
    
      async function UpdateDataBase() {
        try {
            const db = await SQLite.openDatabaseSync('mydatabase.db')
            const result = await db.runAsync('UPDATE bina SET binaAdi=?, binaMetrekare=?, binaYili=?, binaSehir=?, binaToplamBeton=?, binaToplamDemir=? WHERE binaParselNo=?', binaAdi, Number(binaMetrekare), Number(binaYili), binaSehir,  Number(binaToplamBeton), Number(binaToplamDemir),Number(binaParselNo))
            alert("Başaryıla Güncellenmiştir..")
            getallDataBase()
        } 
        catch (e) {
            alert("Islem Gerceklestirilemedi")
            console.log(e)
        }
      }
    
      async function DeleteDataBase(binaParselNo) {
        try {
            const db = await SQLite.openDatabaseSync('mydatabase.db')
            const result = await db.runAsync('DELETE FROM bina WHERE binaParselNo=?', Number(binaParselNo))
            alert("Başarıyla Silinmiştir..")
            getallDataBase()
        } 
        catch (e) {
            alert("Bu Parsel Numarasına Ait Ev Yok..")
            console.log(e)
        }
      }

      async function DeleteDataBaseD() {
        try {
            const db = await SQLite.openDatabaseSync('mydatabase.db')
            const result = await db.runAsync('DROP TABLE bina')
            getallDataBase()
        } 
        catch (e) {
            console.log(e)
        }
      }
    

    
      async function getallDataBase() {
        try {
            const db = await SQLite.openDatabaseSync('mydatabase.db')
            const allRows = await db.getAllAsync('SELECT * FROM bina')
            setBina(allRows)
            console.log(bina)
        } 
        catch (e) {
            console.log(e)
        }
      }

    
    const textInpTemizle = () =>{
        setBinaParselNo(null)
        setBinaAdi(null)
        setBinaMetrekare(null)
        setBinaYili(null)
        setBinaSehir(null)
    }
   
    const kaydetme = () =>{
        CreateDataBase()
        console.log(binaToplamBeton) 
        console.log(binaToplamDemir)
        InsertDataBase()
        textInpTemizle()
    }

    const guncelleme = () =>{
        UpdateDataBase()
        textInpTemizle()
    }

    const silme = (binaParselNo) =>{
        DeleteDataBase(binaParselNo)
        textInpTemizle()
    }

    const goruntuleme = () =>{
        getallDataBase()
        textInpTemizle()
    }

  return (
    <ScrollView style={styles.container}>
        <View style={styles.textView}>
            <Text style={styles.textBinaParsel}>Bina Parsel Numarası</Text>
            <TextInput style={styles.textInp1} value={binaParselNo} placeholder='Bina Parsel Numarasini Giriniz' onChangeText={binaParselNoInput} />
            <Text style={styles.textBinaAdi}>Bina Adı</Text>
            <TextInput style={styles.textInp1} value={binaAdi} placeholder='Bina Adını Giriniz' onChangeText={binaAdiInput} />
            <Text style={styles.textBinaMetrekare}>Bina Metrekaresi</Text>
            <TextInput style={styles.textInp1} value={binaMetrekare} placeholder='Bina Metrekaresini Giriniz' onChangeText={binaMetrekareInput} />
            <Text style={styles.textBinaYapimYili}>Bina Yapım Yılı</Text>
            <TextInput style={styles.textInp1} value={binaYili} placeholder='Bina Yapım Yilini Giriniz' onChangeText={binaYiliInput} />
            <Text style={styles.textBinaYapimSehri}>Binanın Yapım Şehri</Text>
            <TextInput style={styles.textInp1} value={binaSehir} placeholder='Bina Yapım Sehrini Giriniz' onChangeText={binaSehirInput} />
            <TouchableOpacity style={styles.kaydetButton} onPress={kaydetme}>
                <Text style={styles.buttonsText}>
                    Kaydet
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.guncellemeButton} onPress={guncelleme}>
                <Text style={styles.buttonsText}>
                    Güncelle
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goruntuleButton} onPress={goruntuleme}>
                <Text style={styles.buttonsText0}>
                    Görüntüle
                </Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.bilgilerText1}>Kayıtlı Yapılar </Text>
        {bina.map((item,index) =>(
            <View key={index} style={styles.bilgilerView}>
                <Text style={styles.bilgilerTextUst}>Bina Bilgileri</Text>
                <Text style={styles.bilgilerText}>Bina Parsel Numarası = {item.binaParselNo}</Text>
                <Text style={styles.bilgilerText}>Bina adi = {item.binaAdi}</Text>
                <Text style={styles.bilgilerText}>Bina Metrekaresi = {item.binaMetrekare}</Text> 
                <Text style={styles.bilgilerText}>Bina Yapim Yılı = {item.binaYili}</Text>
                <Text style={styles.bilgilerText}>Binanın Yapıldığı Şehir = {item.binaSehir}</Text>
                <Text style={styles.bilgilerText}>Binadaki Ortalama Beton Miktarı = {item.binaToplamBeton} Metreküp </Text>
                <Text style={styles.bilgilerText}>Binadaki Ortalama Demir Miktarı = {item.binaToplamDemir} Ton </Text>
                <TouchableOpacity style={styles.silmeButton} onPress={() => silme(item.binaParselNo)}>
                    <Text style={styles.buttonsText}>
                    Kayıt Sil
                    </Text>
                </TouchableOpacity>
            </View>
        ))} 
    </ScrollView>
  );
};

export default insaatBilgi;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    bilgilerView:{
        width:'99%',
        left:2,
        borderWidth:1,
        borderRadius:10,
        marginTop:3,
        backgroundColor:'grey'
    },
    textView:{
        width:'100%',
        borderWidth:1,
        borderRadius:30,
        height:370,
        top:30,
        backgroundColor:'grey'
    },
    textInp1:{
        borderWidth:1,
        width:230,
        height:30,
        borderRadius:30,
        textAlign:'center',
        left:80,
    },
    textBinaParsel:{
        left:130,
    },
    textBinaAdi:{
        left:170
    },
    textBinaMetrekare:{
        left:145
    },
    textBinaYapimYili:{
        left:150
    },
    textBinaYapimSehri:{
        left:135
    },
    kaydetButton:{
        top:15,
        justifyContent:'center',
        alignItems:'center',
        width:135,
        height:25,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'green',
        left:125,
    },
    guncellemeButton:{
        top:22.5,
        justifyContent:'center',
        alignItems:'center',
        width:135,
        height:25,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'green',
        left:125,
    },
    silmeButton:{
        justifyContent:'center',
        alignItems:'center',
        width:100,
        height:20,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'green',
        left:145,
    },
    goruntuleButton:{
        top:30,
        justifyContent:'center',
        alignItems:'center',
        width:135,
        height:25,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'yellow',
        left:125,
    },
    buttonsText:{
        color:'white'
    },
    bilgiler:{
        marginTop:50
    },
    bilgilerText:{
        left:50,
    },
    bilgilerText1:{
        fontSize:25,
        marginTop:40,
        left:120
    },
    bilgilerText2:{
        left:150,
        fontSize:15,
    },
    bilgilerTextUst:{
        left:150
    }

});