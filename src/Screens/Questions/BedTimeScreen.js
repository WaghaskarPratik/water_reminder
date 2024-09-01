import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Strings, Spinner, Images } from '../../common/App';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

function BedTimeScreen(props) {
    const [bedTime, setBedTime] = useState(new Date());
    const [timeError, setTimeError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleNextPress = () => {
        props.setBedTime(bedTime);
        props.navigation.navigate('WeightInputScreen'); 
    };

    return (
        <LinearGradient colors={[Colors.primaryColor, Colors.accentColor]} style={styles.gradient}>
        <SafeAreaView style={styles.maincontainer}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.goBack()}>
                    <Image source={Images.left} style={styles.backIcon} />
                </TouchableOpacity>
                <View style={styles.logoView}>
                    <Image source={Images.sleep} style={styles.logo} />
                </View>
                <Text style={styles.title}>{Strings.bedTimeTitle}</Text>

                <View style={styles.inputContainer}>
                    <DatePicker
                        date={bedTime}
                        onDateChange={setBedTime}
                        mode="time"
                        locale="en"
                        minuteInterval={5}
                        is24hourSource="locale"
                        fadeToColor="none"
                        textColor={Colors.textColor}
                        style={styles.datePicker}
                    />
                </View>

                <TouchableOpacity onPress={handleNextPress} style={styles.button}>
                    <Text style={styles.buttonText}>{Strings.nextButton}</Text>
                </TouchableOpacity>
            </View>
            <Spinner visible={isLoading} />
        </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    maincontainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        color: Colors.textColor,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Arial',
    },
    inputContainer: {
        marginBottom: 20,
        alignItems: 'center',
        padding: 15,
    },
    datePicker: {
        width: screenWidth * 0.9,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: Colors.buttonColor,
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 25,
        alignItems: 'center',
        marginVertical: 20,
        shadowColor: Colors.secondaryColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: Colors.backgroundColor,
        fontWeight: 'bold',
        fontSize: 20, // Increased font size for button text
    },
    logoView: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 180, // Increased logo size for better visibility
        height: 180,
        marginBottom: 10,
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 10,
        zIndex: 1, // Ensure the button is above other components
    },
    backIcon: {
        width: 44,
        height: 44,
        tintColor: Colors.textColor, // Adjust color as needed
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(BedTimeScreen)