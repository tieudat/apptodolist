import React from 'react';
import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  Alert, 
} from 'react-native';
import { FlatList, TextInput , TouchableOpacity} from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import CustomButton from '../utils/CustomButton';
import GlobalStyle from '../utils/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import {setName,setAge, increaseAge, getCities} from '../redux/actions'
import PushNotification from "react-native-push-notification";



const db =SQLite.openDatabase(
    {
      name: 'MainDB',
      location: 'default',
    },
    () => { },
    error => { console.log(error) }
);



function Home({navigation , route}){
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
    const {name,age, cities} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

  useEffect(() => {
      getData();
      dispatch(getCities());
  }, []);

  const getData = () => {
      try {
          // AsyncStorage.getItem('UserData')
          //     .then(value => {
          //         if (value != null) {
          //             let user = JSON.parse(value);
          //             setName(user.Name);
          //             setAge(user.Age);
          //         }
          //     })
          db.transaction((tx) => {
              tx.executeSql(
                  "SELECT Name, Age FROM Users",
                  [],
                  (tx, results) => {
                      var len = results.rows.length;
                      if (len > 0) {
                          var userName = results.rows.item(0).Name;
                          var userAge = results.rows.item(0).Age;
                          dispatch(setName(userName));
                          dispatch(setAge(userAge));
                      }
                  }
              )
          })
      } catch (error) {
          console.log(error);
      }
  }

  const handleNotification = (item, index) => {
    PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotification({
        channelId: 'test-channel',
        title:'You click on ' + item.country,
        message: item.city,
        bigText: item.city + "is one of the largest and most beautiful city",
        color: "red",
        id:index,
    });


    PushNotification.localNotificationSchedule({
        channelId: 'test-channel',
        title:'Alarm ' ,
        message: "You clicked on " + item.country + " 20 seconds ago",
        date: new Date(Date.now() + 20 * 1000),
        allowWhiteIdle: true,
    })
  }

  const updateData = async () => {
      if (name.length == 0) {
          Alert.alert('Warning!', 'Please write your data.')
      } else {
          try {
              // var user = {
              //     Name: name
              // }
              // await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
              db.transaction((tx) => {
                  tx.executeSql(
                      "UPDATE Users SET Name=?",
                      [name],
                      () => { Alert.alert('Success!', 'Your data has been updated.') },
                      error => { console.log(error) }
                  )
              })
          } catch (error) {
              console.log(error);
          }
      }
  }

  const removeData = async () => {
      try {
          // await AsyncStorage.clear();
          db.transaction((tx) => {
              tx.executeSql(
                  "DELETE FROM Users",
                  [],
                  () => { navigation.navigate('Login') },
                  error => { console.log(error) }
              )
          })
      } catch (error) {
          console.log(error);
      }
  }

  return (
      <View style={styles.body}>
          <Text style={[
              GlobalStyle.CustomFont,
              styles.text
          ]}>
              Welcome {name} !
          </Text>
          <CustomButton 
                title = "Open Camera"
                color = "#0080ff"
                onPressFunction ={ () => { navigation.navigate('Camera')}}

          />
          
          <FlatList 
                data={cities}
                renderItem = { ({item, index}) =>(
                    <TouchableOpacity
                        onPress={() =>{
                            handleNotification(item,index)
                            navigation.navigate('Map',
                            {
                                city: item.city,
                                lat: item.lat,
                                lng: item.lng,

                            })
                            
                        }}
                    
                    >
                        <View style={styles.item}>
                            <Text style={styles.title}>{item.country}</Text>
                            <Text style={styles.subtitle}>{item.city}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor = {(item, index) => index.toString()}
          />

          {/* <Text style={[
              GlobalStyle.CustomFont,
              styles.text
          ]}>
              Your age is {age}
          </Text>
          <TextInput
              style={styles.input}
              placeholder='Enter your name'
              value={name}
              onChangeText={(value) => dispatch(setName(value))}
          />
          <CustomButton
              title='Update'
              color='#ff7f00'
              onPressFunction={updateData}
          />
          <CustomButton
              title='Remove'
              color='#f40100'
              onPressFunction={removeData}
          />
           <CustomButton
              title='Increase Age'
              color='#0080ff'
              onPressFunction={() =>{dispatch(increaseAge())}}
          /> */}
      </View>
  )
}

const styles = StyleSheet.create({
  body: {
      flex: 1,
      alignItems: 'center',
  },
  text: {
      fontSize: 40,
      margin: 10,
  },
  input: {
      width: 300,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 10,
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 130,
      marginBottom: 10,
  },
  item:{
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#ccc',
      borderRadius:7,
      width:350,
      margin:7,
      justifyContent:'center',
      alignItems:'center',
  },
  title:{
      fontSize:30,
      margin:10,
  },
  subtitle:{
      fontSize:20,
      margin:10,
      color: '#999'
  }

})

export default Home;


