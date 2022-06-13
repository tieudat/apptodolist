import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable
} from 'react-native';

function Notifications({navigation, route}){
    const {ItemName,ItemId} = route.params;

    const onPressHandler = () =>{
      navigation.navigate('Home',{Message:'Message from Nati'})
      // navigation.goBack();
      // navigation.setParams({ItemId: 12})
    }
    return(
      <View  style = {styles.body}>
        <Text>This is NotificationsScreen</Text>
        <Pressable
          onPress = {onPressHandler}
        >
            <Text> Go to the Home</Text>
        </Pressable>
        <Text style = {styles.text}> {ItemName}</Text>
        <Text style = {styles.text}> {ItemId}</Text>
      
      </View>
    )
  }
  
  export default Notifications;
  const styles = StyleSheet.create({
    body:{
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      fontFamily:'WaterBrush-Regular'
    },
  
    text:{
        fontSize:40,
        fontWeight:'bold',
        fontFamily:'WaterBrush-Regular'
      }
  
  });