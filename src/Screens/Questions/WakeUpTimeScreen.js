import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Strings, Spinner, Images } from '../../common/App';
import DatePicker from 'react-native-date-picker';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

function WakeUpTimeScreen(props) {
  const [selectedWakeUpTime, setSelectedWakeUpTime] = useState(new Date());
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

  }, []);


  const handleNextPress = () => {
    props.setWakeUpTIme(selectedWakeUpTime);
    props.navigation.navigate("BedTimeScreen");
  };


  return (
    <LinearGradient colors={[Colors.primaryColor, Colors.accentColor]} style={styles.gradient}>
      <SafeAreaView style={styles.maincontainer}>
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image source={Images.alarm} style={styles.logo} />
          </View>
          <Text style={styles.title}>{Strings.wakeUpTimeTitle}</Text>

          <View style={styles.inputContainer}>
            <DatePicker
              date={selectedWakeUpTime}
              onDateChange={setSelectedWakeUpTime}
              mode="time"
              locale="in"
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
    fontSize: 20,
  },
  logoView: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WakeUpTimeScreen);
