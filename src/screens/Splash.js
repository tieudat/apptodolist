// import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useState,useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Button,
    Alert
} from 'react-native';
import CustomButton from '../utils/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import {setName,setAge, increaseAge} from '../redux/actions'
import PushNotification from "react-native-push-notification";
import GlobalStyle from '../utils/GlobalStyle';





export default function Splash({navigation}){

    const {name,age} = useSelector(state => state.taskReducer)
    const dispatch = useDispatch();


    // const [name, setName] = useState('');
    // const [age, setAge] = useState('');

    useEffect(() => {
      
        createChannels();
        setTimeout(() => {
            navigation.replace('My Tasks')
        }
        ,2000);
    }, []);

    

    const createChannels = () =>{
        PushNotification.createChannel(
            {
                channelId:'task-channel',
                channelName:'Task Channel',
            }
        )
    }

   

    return (
        <View style={styles.body} >
        <Image
            style={styles.logo}
            source={require('../../assets/checklist.png')}
        />
        <Text style={[
            GlobalStyle.CustomFontBig
            ,styles.text]}>
            Dat To-Do List
        </Text>
        
    </View>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0080ff',
    },
    logo: {
        width: 300,
        height: 300,
        margin: 10,
    },
    text: {
        fontSize: 30,
        color: '#ffffff',
        marginBottom: 130,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    }
    
})