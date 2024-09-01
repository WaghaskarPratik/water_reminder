import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
    Modal,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Strings, Spinner, Images } from '../../common/App';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux';
import LottieView from 'lottie-react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function DailyIntakeScreen(props) {
    const navigation = useNavigation();
    const [selectedIntake, setSelectedIntake] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [calculatedWaterIntake, setCalculatedWaterIntake] = useState(0);
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
        const calculateIntake = () => {
            const selectedWeight = props.weight;
            const calculatedWaterIntake = Math.floor(selectedWeight * 30); // Intake in milliliters
            setCalculatedWaterIntake(calculatedWaterIntake);
            console.log("calculatedWaterIntake in ml ------>", calculatedWaterIntake);
        };

        calculateIntake();
        setTimeout(() => {
            setShowAnimation(false);
        }, 2000);

    }, [props.weight]);

    const intakeOptions = [
        { value: 1000, image: Images.splashLogo },
        { value: 1500, image: Images.splashLogo },
        { value: 2000, image: Images.splashLogo },
        { value: 2500, image: Images.splashLogo },
        { value: 3000, image: Images.splashLogo },
        { value: 3500, image: Images.splashLogo },
        { value: 4000, image: Images.splashLogo },
    ];

    const handleSelectIntake = (intake) => {
        setCalculatedWaterIntake(intake);
        setModalVisible(false);
    };

    const nextScreen = () => {
        props.setDailyIntake(calculatedWaterIntake);
        props.navigation.replace("DashboardScreen");
    }

    return (
        <LinearGradient colors={[Colors.primaryColor, Colors.accentColor]} style={styles.gradient}>
            <SafeAreaView style={styles.mainContainer}>
                {
                    showAnimation ?
                        <View style={styles.container}>
                            <View style={styles.logoView}>
                                <LottieView
                                    style={styles.lottieAnimation}
                                    source={Images.water_glass}
                                    autoPlay
                                    loop={false}
                                    onAnimationFinish={() => setLoading(false)}
                                />
                            </View>
                        </View>
                        :
                        <View style={styles.displayContainer}>

                            <Text style={styles.title}>{Strings.intakeQuestionTitle}</Text>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={[styles.intakeText, {fontSize: 42}]}>
                                    {`${calculatedWaterIntake} ml`}
                                </Text>

                                <View style={styles.intakeLogo}>
                                    <LottieView
                                        style={styles.lottieAnimation}
                                        source={Images.water_intake}
                                        autoPlay
                                        loop={true}
                                        onAnimationFinish={() => setLoading(false)}
                                    />
                                </View>
                            </View>


                            <TouchableOpacity onPress={() => nextScreen()} style={styles.button}>
                                <Text style={styles.buttonText}>
                                    {Strings.nextButton}
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.orContainer}>
                                <View style={styles.divider} />
                                <Text style={styles.orText}>or</Text>
                                <View style={styles.divider} />
                            </View>

                            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                                <Text style={styles.buttonText}>
                                    {Strings.selectIntakeButton}
                                </Text>
                            </TouchableOpacity>
                        </View>
                }


                <Spinner visible={isLoading} />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>{Strings.selectIntakeTitle}</Text>
                            <FlatList
                                data={intakeOptions}
                                numColumns={2}
                                keyExtractor={(item) => item.value.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.intakeOption,
                                            item.value === selectedIntake && styles.selectedOption,
                                        ]}
                                        onPress={() => handleSelectIntake(item.value)}
                                    >
                                        <Image source={item.image} style={styles.intakeImage} />
                                        <Text style={styles.intakeText}>{item.value} ml</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>{Strings.closeButtonText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    displayContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        color: Colors.textColor,
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        marginTop: 80,
    },
    intakeText: {
        fontSize: 14,
        color: Colors.textColor,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    buttonGradient: {
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 25,
        alignItems: 'center',
        width: '100%',
    },
    button: {
        width: screenWidth - 100,
        backgroundColor: Colors.buttonColor,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: Colors.secondaryColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: Colors.backgroundColor,
        fontWeight: 'bold',
        fontSize: 20,
    },
    logoView: {
        width: screenWidth,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    intakeLogo: {
        height: 100,
        marginBottom: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieAnimation: {
        width: 300,
        height: 300,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.subtleTextColor,
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: Colors.textColor,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        width: screenWidth - 50,
        padding: 20,
        backgroundColor: Colors.backgroundColor,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: Colors.textColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.textColor,
    },
    intakeOption: {
        width: (screenWidth - 120) / 2,
        margin: 10,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 15,
        backgroundColor: Colors.primaryColor,
        shadowColor: Colors.subtleTextColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    intakeImage: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    selectedOption: {
        borderColor: Colors.buttonColor,
        borderWidth: 2,
    },
    closeButton: {
        marginTop: 20,
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: Colors.buttonColor,
        borderRadius: 25,
    },
    closeButtonText: {
        color: Colors.backgroundColor,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyIntakeScreen);
