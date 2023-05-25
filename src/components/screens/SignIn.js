import { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'

const SignInScreen = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigation = useNavigation();
  const auth = getAuth();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        navigation.navigate('Profile')

        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
          setEmailError('E-mail inválido');
        } else {
          setEmailError('');
        }

        if (error.code === 'auth/wrong-password') {
          setPasswordError('Senha incorreta');
        } else {
          setPasswordError('');
        }
      });
  }

  const handlePasswordRecovery = () => {
    if (email !== '') {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password Recovery Email sent');
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  return (
    <View style={styles.container}>

      {emailError ? <Text>{emailError}</Text> : null}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Endereço de e-mail"
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          value={email}
        />

        {passwordError ? <Text>{passwordError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError('');
          }}
          value={password}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignIn}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Entrar</Text>
        </TouchableOpacity>  
      </View>
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%',
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
  });

export { SignInScreen };
