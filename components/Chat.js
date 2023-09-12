import { useEffect, useState } from 'react';
import {
    StyleSheet,
    View, Text,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = ({ route, navigation }) => {
    const { name } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    useEffect(() => {
        navigation.setOptions({ title: name })
    }, []);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello Developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{ _id: 1 }}
            />

            {Platform.OS === 'android' ?
                <KeyboardAvoidingView behavior='height'
                />
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