import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, getDocs, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';

const ChatScreen = ({ route, navigation, db }) => {
    const { name, color, userID } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name });

        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                });
            })
            setMessages(newMessages);
        })
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, []);

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