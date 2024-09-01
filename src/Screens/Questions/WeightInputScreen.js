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
import Slider from '@react-native-community/slider';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

function WeightInputScreen(props) {
  const [weightKg, setWeightKg] = useState(56.2); // default weight in kilograms
  const [isLoading, setLoading] = useState(false);

  // Convert kg to lbs (1 kg = 2.20462 lbs) for slider
  const weightLbs = (weightKg * 2.20462).toFixed(1);

  const handleCalculate = () => {
    props.setWeight(weightKg);
    props.navigation.navigate('DailyIntakeScreen');

  };

  return (
    <LinearGradient colors={[Colors.primaryColor, Colors.accentColor]} style={styles.gradient}>
      <SafeAreaView style={styles.maincontainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.goBack()}>
            <Image source={Images.left} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.logoView}>
            <LottieView style={{ flex: 1 }} source={Images.weight_animation} autoPlay loop />
          </View>
          <Text style={styles.title}>{Strings.weightTitle}</Text>

          <View style={styles.weightDisplay}>
            <Text style={styles.weightText}>{weightKg.toFixed(1)} kg</Text>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={30} // Minimum weight in kg
            maximumValue={150} // Maximum weight in kg
            step={0.1}
            value={weightKg}
            onValueChange={(value) => setWeightKg(value)}
            minimumTrackTintColor={Colors.buttonColor}
            maximumTrackTintColor={Colors.subtleTextColor}
            thumbTintColor={Colors.buttonColor}
          />

          <TouchableOpacity onPress={handleCalculate} style={styles.button}>
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
  weightDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  weightText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.textColor,
  },
  slider: {
    width: screenWidth * 0.8,
    height: 40,
    marginBottom: 30,
  },
  updateText: {
    fontSize: 14,
    color: Colors.subtleTextColor,
    marginBottom: 40,
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
    marginBottom: 20,
    height: 200,
    aspectRatio: 1,
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


export default connect(mapStateToProps, mapDispatchToProps)(WeightInputScreen);