import { StyleSheet, Text, View, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { UserType } from '../UserContext'

const AddAddressScreen = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId } = useContext(UserType);
    console.log("userId",userId);

    useEffect(() => {
        fetchAddresses();
    }, []);
    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/addresses/${userId}`);
            const { addresses } = response.data;

            setAddresses(addresses);
        } catch (error) {
            console.log(error, "error");
        }
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
            <View style={{ backgroundColor: "#00CED1", padding: 10, flexDirection: "row", alignItems: "center" }}>
                <Pressable style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white", borderRadius: 3, height: 38, flex: 1 }}>
                    <AntDesign
                        style={{ paddingLeft: 10 }}
                        name="search1"
                        size={22}
                        color="black"
                    />
                    <TextInput placeholder="Search Klop.in" />
                </Pressable>
                <Ionicons name="mic" size={24} color="black" />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>your address</Text>
                <Pressable onPress={() => navigation.navigate("Add")} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, borderColor: "#D0D0D0", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, paddingVertical: 7, paddingHorizontal: 5 }}>
                    <Text style={{ color: "black" }}>add a new address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>

                <Pressable>

                </Pressable>

            </View>
        </ScrollView>
    )
}

export default AddAddressScreen

const styles = StyleSheet.create({})