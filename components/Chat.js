import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Component
import CustomAction from './CustomAction';

const ChatScreen = ({ route, navigation, db, isConnected, storage }) => {
    const { name, color, userID } = route.params;
    const [messages, setMessages] = useState([]);

    let unsubMessages;

    useEffect(() => {
        navigation.setOptions({ title: name });

        if (isConnected === true) {
            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    });
                    cachedMessages(newMessages);
                    setMessages(newMessages);
                });
            })
        } else loadCachedMessages();
        return () => {
            if (unsubMessages) unsubMessages();
            unsubMessages = null;
        }
    }, [isConnected]);

    const cachedMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        }
        catch (error) {
            console.error('Something went wrong. Try again later', error);
        }
    }

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0]);
    }

    const renderInputToolBar = (props) => {
        if (isConnected)
            return <InputToolbar {...props} />;
        else return null;
    }

    const renderBubble = (props) => {
        return <Bubble
            userID={userID}
            {...props}
            wrapperStyle={{
                right: { backgroundColor: '#93a8ac' },
                left: { backgroundColor: '#f9eae1', color: '#fff' }
            }}
        />
    }

    const renderCustomView = (props) => {
        const { currentMessage } = props;

        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            )
        }
    }

    const renderCustomAction = (props) => {
        return <CustomAction
            storage={storage}
            {...props}
        />

    }

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                renderInputToolbar={renderInputToolBar}
                renderBubble={renderBubble}
                renderActions={renderCustomAction}
                renderCustomView={renderCustomView}
                onSend={messages => onSend(messages)}
                user={{ _id: userID, name }}
            />

            {Platform.OS === 'android' ?
                <KeyboardAvoidingView behavior='height' />
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ChatScreen;