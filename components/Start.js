import { useState } from 'react';
import {
    StyleSheet,
    View, Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';

//BACKGROUND-IMAGE & COLOURS
const bgImage = require('../images/Background_Image.png');
const bgColors = {
    a: '#474056',
    b: '#6C757D',
    c: '#8A95A5',
    d: '#B9C6AE'
}

const StartScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState(bgColors.a);

    return (

        <ImageBackground source={bgImage} style={styles.bgImage}>
            <View style={styles.container}>
                <Text style={styles.appTitle}>TheChatRoom</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Type you username here'
                        placeholderTextColor='black'
                    />

                    <Text style={styles.textColorSelector}>Choose a background color:</Text>
                    <View style={styles.colorSelector}>
                        <TouchableOpacity
                            style={[
                                styles.circle,
                                { backgroundColor: bgColors.a },
                                color === bgColors.a && styles.selectedCircle
                            ]}
                            onPress={() => setColor(bgColors.a)}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.circle,
                                { backgroundColor: bgColors.b },
                                color === bgColors.b && styles.selectedCircle
                            ]}
                            onPress={() => setColor(bgColors.b)}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.circle,
                                { backgroundColor: bgColors.c },
                                color === bgColors.c && styles.selectedCircle
                            ]}
                            onPress={() => setColor(bgColors.c)}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.circle,
                                { backgroundColor: bgColors.d },
                                color === bgColors.d && styles.selectedCircle
                            ]}
                            onPress={() => setColor(bgColors.d)}
                        ></TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: '#ced4da' },

                        ]}
                        onPress={() =>
                            navigation.navigate('ChatScreen',
                                { name: name, color: color })
                        }
                    >
                        <Text style={styles.textButton}>Start chatting!</Text>
                    </TouchableOpacity>
                </View>

                {Platform.OS === 'ios' ?
                    <KeyboardAvoidingView behavior='padding' />
                    : null}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    appTitle: {
        fontSize: 45,
        fontWeight: '500',
        color: '#FFFFFF',
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: '60%'
    },
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        justifyContent: 'space-between',
        padding: '6%'
    },
    inputContainer: {
        flex: 1,
        //flexBasis: 100,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: '6%'
    },
    textInput: {
        fontSize: 16,
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#5c6b73',
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 15
    },
    textColorSelector: {
        marginTop: 30,
        fontSize: 16,
        fontWeight: '300',
        color: '#212529'
    },
    colorSelector: {
        marginTop: 15,
        flexDirection: 'row',
        padding: 5
    },
    circle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 10,
        padding: 3
    },
    selectedCircle: {
        borderWidth: 2,
        borderColor: 'black'
    },
    button: {
        marginTop: 10,
        borderRadius: 4,
        alignContent: 'center',
        backgroundColor: '#841584',
        padding: 10
    },
    textButton: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'light',
    }
});

export default StartScreen;