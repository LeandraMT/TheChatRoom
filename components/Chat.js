import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ChatScreen = ({ route, navigation }) => {
    const { name, color } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text style={styles.textChat}>Hello {name}!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textChat: {
        fontSize: 18,
        fontWeight: '400'
    }
});

export default ChatScreen;