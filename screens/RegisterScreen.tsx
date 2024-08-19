// RegisterScreen.tsx
import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Image, KeyboardAvoidingView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "react-native-vector-icons/AntDesign";
import { RootStackParamList } from '../App';
import axios from 'axios';



export type productdetailsProps = RouteProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [name, setName] = useState('');



  const handleRegister = async () => {
    const user = {
      name: name,
      email: email,
      password: password
    };

    //send a post request to the backend api
    axios.post('http://10.0.2.2:8000/register', user).then((response:any) => {
      console.log(response);
      Alert.alert(
        "Registration Success",
        "You have successfully registered. Please login to continue."
      );
      setName('');
      setPassword('');
      setEmail('');
    }).catch((error :any) => {
      Alert.alert(
        "Registration Error",
        "an error occured during registration"
      );
      console.log("registration failed", error);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" , marginTop:50}}>

      <View>
        <Image style={{ width: 150, height: 100 }} source={{ uri: "https://klop.com.my/wp-content/uploads/2022/08/KLOP-logo-FA_version-1-White_Artboard-23-e1660010768528-1024x353.png" }} />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Register to your account</Text>
        </View>

        <View style={{ marginTop: 70 }}>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <AntDesign style={{ marginLeft: 8 }} name="adduser" size={24} color="grey" />
            <TextInput
              value={name}
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: name ? 16 : 16 }}
              placeholder="Name"
              placeholderTextColor="black"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <AntDesign style={{ marginLeft: 8 }} name="mail" size={24} color="grey" />
            <TextInput
              value={email}
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }}
              placeholder="Email"
              placeholderTextColor="black"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
              <AntDesign style={{ marginLeft: 8 }} name="lock1" size={24} color="grey" />
              <TextInput
                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }}
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>

          <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text>
              keep me logged in
            </Text>
            <Text style={{ color: "#007FFF", fontWeight: "500", }}>
              Forgot Password
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <Pressable onPress={handleRegister} style={{ width: 200, backgroundColor: "#FEBE10", borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
              <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}> Register</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 15 }}>
              <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                Already have an account? Log in
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default RegisterScreen;
