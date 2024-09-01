import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { Colors, Images, Strings, Spinner} from '../../common/App';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isLoading, setLoading] = useState(false);
  const handleRegisterPress = () => {
    navigation.replace('RegisterScreen');
  };

  const validateForm = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError(Strings.emailRequired);
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(Strings.emailInvalid);
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError(Strings.passwordRequired);
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(Strings.passwordMinLength);
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const loginUser = () => {
    if (validateForm()) {
      setLoading(true)
      auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log("Login res ---------->", res)
          setLoading(false)
          navigation.replace("WakeUpTimeScreen");
        })
        .catch((err) => {
          setLoading(false)
          console.log("Sign In Error: ", err);
        });
    }
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>{Strings.loginTitle}</Text>
        <View style={styles.inputContainer}>
          <Image source={Images.email} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={Strings.placeholderEmail}
            placeholderTextColor={Colors.subtleTextColor}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View style={styles.inputContainer}>
          <Image source={Images.password} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={Strings.placeholderPassword}
            placeholderTextColor={Colors.subtleTextColor}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <TouchableOpacity onPress={loginUser} style={styles.button}>
          <Text style={styles.buttonText}>{Strings.loginButton}</Text>
        </TouchableOpacity>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>{Strings.noAccountText} </Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={styles.link}>{Strings.registerLink}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Spinner visible={isLoading}/>
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
    backgroundColor: '#fff',
    shadowColor: '#000',
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
    shadowColor: '#000',
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
    fontSize: 14,
    marginBottom: 15,
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
