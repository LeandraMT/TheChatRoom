import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, getDocs, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ route, navigation, db, isConnected }) => {
    const { name, color, userID } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name });
        let unsubMessages;

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
                    cacheMessages(newMessages);
                    setMessages(newMessages);
                });
            })
        } else loadCachedMessages();
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        }
        catch (error) {
            console.error('Something went wrong. Try again later', error);
        }
    }

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(cacheMessages));
    }

    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0]);
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

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
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