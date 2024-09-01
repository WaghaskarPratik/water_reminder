import { View, Text, StyleSheet, Image, StatusBar, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react'
import { Colors, Strings, Images } from '../common/App';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux'; 
import { mapDispatchToProps, mapStateToProps } from '../Redux';

function SplashScreen({ navigation }) {
  useEffect(() => {
    // Hide the native splash screen after the app is loaded
    setTimeout(() => {
      navigation.replace("WelcomeScreen"); 
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.maincontainer}>
      <View style={styles.container}>
        <Image 
          source={Images.splashLogo}
          style={styles.logo}
          resizeMode='contain'
        />

        <Text style={styles.title}>HydrateX</Text>
        <Text style={styles.tagline}>Stay Hydrated, Stay Healthy</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor, // Blush Pink
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: Colors.textColor,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 16,
    color: Colors.subtleTextColor,
    marginTop: 10,
  },
  splashLogo: {
    height: 200,
    aspectRatio: 1,
    marginBottom: 30
  }
});



export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);