import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { UserType } from '../UserContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const AddressScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [street, setStreet] = useState('');
    const [landmark, setLandmark] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const { userId, setUserId } = useContext(UserType);
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('authToken');
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        }

        fetchUser();
    }, []);
    console.log(userId);

    const handleAddAddress = async () => {
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode,
        }

        axios.post('http://10.0.2.2:8000/addresses', { userId, address }).then((response) => {
            Alert.alert("Success", "Address Added Successfully");
            setName('');
            setMobileNo('');
            setHouseNo('');
            setStreet('');
            setLandmark('');
            setPostalCode('');

            setTimeout(() => {
                navigation.goBack();
            }, 500)
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                Alert.alert("Error", `Failed to add address: ${error.response.data.message}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                Alert.alert("Error", "No response from server");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                Alert.alert("Error", error.message);
            }
        })
    };

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ height: 50, backgroundColor: "#00CED1" }} />

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", color: "black" }}>Add a new Address</Text>
                <TextInput placeholder='Malaysia' placeholderTextColor={"black"} style={{ color: "black", padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>full name(first and last name)</Text>
                    <TextInput value={name} onChangeText={(text) => setName(text)} placeholder='enter your name' placeholderTextColor={"black"} style={{ color: "black", padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>phone number</Text>
                    <TextInput value={mobileNo} onChangeText={(text) => setMobileNo(text)} placeholder='enter your phone number' placeholderTextColor={"black"} style={{ color: "black", padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>Flat, House, No, Building, Company</Text>
                    <TextInput value={houseNo} onChangeText={(text) => setHouseNo(text)} placeholder='' placeholderTextColor={"black"} style={{ color: "black", padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>Area, Street, Sector, Village</Text>
                    <TextInput value={street} onChangeText={(text) => setStreet(text)} placeholder='' placeholderTextColor={"black"} style={{ color: "black", padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>Landmark</Text>
                    <TextInput value={landmark} onChangeText={(text) => setLandmark(text)} placeholder='Eg near KLCC' placeholderTextColor={"black"} style={{ color: "black", padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>Postal Code</Text>
                    <TextInput value={postalCode} onChangeText={(text) => setPostalCode(text)} placeholder='Eg 43000' placeholderTextColor={"black"} style={{ color: "black", padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>

                <Pressable onPress={handleAddAddress} style={{ backgroundColor: "#FFC72C", padding: 19, borderRadius: 6, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>Add Address</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default AddressScreen

const styles = StyleSheet.create({})