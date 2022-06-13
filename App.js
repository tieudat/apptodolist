
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToDo from './src/screens/ToDo';
import Splash from './src/screens/Splash';
import Done from './src/screens/Done';
import Task from './src/screens/Task';
import Camera from './src/screens/Camera';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
      <Tab.Navigator
        screenOptions = {
          ({route}) => ({
              tabBarIcon: ({focused,size,color}) =>{
                let iconName;
                if(route.name === 'To-Do'){
                  iconName ='clipboard-list';
                  size = focused ? 25 :20;
                }else if (route.name === 'Done'){
                  iconName ='clipboard-check';
                  size = focused ? 25 :20;
                }
                return (
                    <FontAwesome5 
                      name = {iconName}
                      size = {size}
                      color = {color}
                    />
                )
              }
          })
        }
        activeTintColor='#0080ff'
        inactiveTintColor='#777777'
        labelStyle ={{fontSize:15, fontWeight:'bold'}}
      >
        <Tab.Screen 
          name = {'To-Do'}
          component={ToDo}
          options={
            {
              headerShown: false,
            }
          }
          
        />
        <Tab.Screen 
          name = {'Done'}
          component={Done}
          options={
            {
              headerShown: false,
            }
          }
        />
      </Tab.Navigator>
  )
}

const RootStack = createStackNavigator();

function App() {

  return (
     <Provider store = {Store}>
         <NavigationContainer>
              <RootStack.Navigator
                initialRouteName='Splash'
                screenOptions ={{
                  headerShown:true,
                  swipeEnabled:true,
                  gestureEnabled:true,
                  headerTitleAlign:'center',
                  headerStyle:{
                    backgroundColor:'#0030ff'
                  },
                  headerTitleColor:'#fff',
                  headerTitleStyle:{
                    fontSize:25,
                    fontWeight:'bold'
                  }
                }}
              >
                  <RootStack.Screen 
                      name="Splash" 
                      component={Splash} 
                      options={{
                        headerShown:false,
                      }
                      }
          
                  />
                   <RootStack.Screen 
                      name="My Tasks" 
                      component={HomeTabs} 
                
                  />
                  <RootStack.Screen 
                      name="Task" 
                      component={Task} 
                
                  />
                  <RootStack.Screen 
                      name="Camera" 
                      component={Camera} 
                
                  />
                
              </RootStack.Navigator>
          </NavigationContainer>
     </Provider>
  )
};

const styles = StyleSheet.create({
  body:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },

  text:{
      fontSize:25,
      fontWeight: 'bold',
    }

});

export default App;
