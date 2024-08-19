// LoginScreen.tsx
import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Image, KeyboardAvoidingView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "react-native-vector-icons/AntDesign";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export type LoginScreenProps = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try{
        const token = await AsyncStorage.getItem('authToken');

        if(token){
          navigation.replace('Main');
        }
        }catch(err){
          console.log("error message",err);
        }
      };
      checkLoginStatus();
    },[]);


  

  const handleLogin = async () => {

    const user = {
      email: email,
      password: password
    }

    axios.post('http://10.0.2.2:8000/login', user).then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      navigation.replace("Main");
    })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid email");
        console.log(error);
      })
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center", marginTop:50}}>

      <View>
        <Image style={{ width: 150, height: 100 }} source={{ uri: "https://klop.com.my/wp-content/uploads/2022/08/KLOP-logo-FA_version-1-White_Artboard-23-e1660010768528-1024x353.png" }} />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Login In to your Account</Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <AntDesign style={{ marginLeft: 8 }} name="mail" size={24} color="grey" />
            <TextInput
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
            <Text style={{ color: "007FFF", fontWeight: "500", }}>
              Forgot Password
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <Pressable onPress={handleLogin} style={{ width: 200, backgroundColor: "#FEBE10", borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
              <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}> Login</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Register')} style={{ marginTop: 15 }}>
              <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                Don't have a account? Sign up
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

export default LoginScreen;
