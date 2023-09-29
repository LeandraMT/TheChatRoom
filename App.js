import StartScreen from './components/Start';
import ChatScreen from './components/Chat';

import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { Alert } from 'react-native';

import { initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// Create navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAn6ge9ADK4qhEjdT9vnXil0gvdXJPc224",
    authDomain: "thechatroom-60c42.firebaseapp.com",
    projectId: "thechatroom-60c42",
    storageBucket: "thechatroom-60c42.appspot.com",
    messagingSenderId: "156313900086",
    appId: "1:156313900086:web:d95f2eb55d11d88568f497"
  };

  // Initialize Firebase and store location reference
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Defining network connection
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('No connection');
      disableNetwork(db);
    }
    else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
      >

        <Stack.Screen
          name='Home'
          component={StartScreen}
        />
        <Stack.Screen
          name='ChatScreen'
        >
          {props =>
            <ChatScreen
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          }
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;