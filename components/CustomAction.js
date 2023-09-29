import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { TouchableOpacity, View, Text, Alert, StyleSheet } from 'react-native';

const CustomAction = ({ wrapperStyle, iconTextStyle, onSend }) => {

    const actionSheet = useActionSheet();

    const onActionPress = () => {
        const options = [
            'Choose Photo from Library',
            'Take a Picture',
            'Send Location',
            'Cancel'
        ];

        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions({
            options,
            cancelButtonIndex,
        },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();

                    default:
                }
            },);
    }


    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissions?.granted) {
            let result = ImagePicker.launchImageLibraryAsync();

            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);

            else Alert.alert('Permissions has not been granted');
        }
    }

    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();

        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();

            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);

            else Alert.alert('Permissions has not been granted');
        }
    }

    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();

        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});

            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    }
                });
            }
            else {
                Alert.alert('Could not fetch location');
            }
        }
        else {
            Alert.alert('Permissions to read location has not been granted');
        }
    }

    return (
        <TouchableOpacity
            style={styles.container}
            title='Action button'
            onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>
                    +
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#474056',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#6C757D',
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor: 'transparent',
        textAlign: 'center',
    }
});

export default CustomAction