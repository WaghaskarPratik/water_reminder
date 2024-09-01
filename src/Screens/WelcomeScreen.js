import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
} from 'react-native';
import { Colors, Strings, Images } from '../common/App';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../Redux';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

function WelcomeScreen(props) {
    const navigation = useNavigation();

    const handleGetStartedPress = () => {
        props.navigation.navigate('WakeUpTimeScreen'); // Navigate to the Login Screen or other appropriate screen
    };

    return (
        <LinearGradient colors={[Colors.primaryColor, Colors.accentColor]} style={styles.gradient}>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.logoView}>
                        <Image source={Images.logo} style={styles.logo} />
                    </View>

                    <View style={styles.animationContainer}>
                        <LottieView style={{ flex: 1 }} source={Images.water_animation} autoPlay loop />
                    </View>

                    <Text style={styles.title}>{Strings.welcomeTitle}</Text>
                    <Text style={styles.subtitle}>{Strings.welcomeSubtitle}</Text>

                    <TouchableOpacity onPress={handleGetStartedPress} style={styles.button}>
                        <Text style={styles.buttonText}>{Strings.getStartedButton}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoView: {
        marginBottom: 20,
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    animationContainer: {
        aspectRatio: 1,
        height: 250,
        marginBottom: 50
    },
    lottie: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 32,
        color: Colors.textColor,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: Colors.subtleTextColor,
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: Colors.buttonColor,
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: Colors.secondaryColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: Colors.backgroundColor,
        fontWeight: 'bold',
        fontSize: 20,
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);