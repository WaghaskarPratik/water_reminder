import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Colors, Images, Spinner } from '../../common/App'; // Import Images to use the logo
import auth from '@react-native-firebase/auth';

export default function RegistrationScreen({ navigation }) {

  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userNameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLoginPress = () => {
    // Navigate to the login screen
    navigation.replace('LoginScreen');
  };

  const validateForm = () => {
    let isFormValid = true;

    setEmailErr("");
    setUsernameErr("");
    setPasswordErr("");
    setConfirmPasswordErr("");

    // Username validation
    if (userName.trim() === '') {
      setUsernameErr("Username is required.");
      isFormValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      setEmailErr("Email is required.");
      isFormValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailErr("Please enter a valid email address.");
      isFormValid = false;
    }

    // Password validation
    if (password.trim() === '') {
      setPasswordErr("Password is required.");
      isFormValid = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters.");
      isFormValid = false;
    }

    // Confirm Password validation
    if (confirmPassword.trim() === '') {
      setConfirmPasswordErr("Please confirm your password.");
      isFormValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordErr("Passwords do not match.");
      isFormValid = false;
    }

    return isFormValid;
  };

  const registerUser = () => {
    if (validateForm()) {
      setLoading(true);
      auth().createUserWithEmailAndPassword(email, password).then(() => {
        setLoading(false)
        navigation.replace("DashboardScreen");
      })
        .catch((err) => {
          console.log("Sign up error: ", err);
          setLoading(false)
          Alert.alert("Registration Error", err.message);
        });
    }
  };

  return (
      <SafeAreaView style={styles.maincontainer}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.inputContainer}>
            <Image
              source={Images.username} // Your logo file path
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={Colors.subtleTextColor}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
          </View>
          {userNameErr ? <Text style={styles.errorText}>{userNameErr}</Text> : null}

          <View style={styles.inputContainer}>
            <Image
              source={Images.email} // Your logo file path
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.subtleTextColor}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>
          {emailErr ? <Text style={styles.errorText}>{emailErr}</Text> : null}

          <View style={styles.inputContainer}>
            <Image
              source={Images.password} // Your logo file path
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.subtleTextColor}
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry
            />
          </View>
          {passwordErr ? <Text style={styles.errorText}>{passwordErr}</Text> : null}

          <View style={styles.inputContainer}>
            <Image
              source={Images.password} // Your logo file path
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={Colors.subtleTextColor}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              secureTextEntry
            />
          </View>
          {confirmPasswordErr ? <Text style={styles.errorText}>{confirmPasswordErr}</Text> : null}

          <TouchableOpacity
            onPress={registerUser}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLoginPress}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <Spinner visible={loading}/>
      </SafeAreaView>
     
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    color: Colors.primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: Colors.secondaryColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  icon: {
    width: 23,
    height: 23,
    marginRight: 10,
  },
  input: {
    height: 50,
    flex: 1,
    borderColor: Colors.secondaryColor,
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: Colors.textColor,
    fontSize: 16,
    backgroundColor: '#fff', // Background color for input fields
    shadowColor: '#000', // Shadow for depth effect
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: Colors.buttonColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000', // Shadow for button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: Colors.backgroundColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    marginLeft: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    color: Colors.subtleTextColor,
  },
  link: {
    color: Colors.buttonColor,
    fontWeight: 'bold',
  },
});
