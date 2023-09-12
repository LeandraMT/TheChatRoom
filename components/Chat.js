import { useEffect, useState } from 'react';
import {
    StyleSheet,
    View, Text,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const ChatScreen = ({ route, navigation }) => {
    const { name, color } = route.params;
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
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    const renderBubble = (props) => {
        return <Bubble
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
                user={{ _id: 1 }}
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