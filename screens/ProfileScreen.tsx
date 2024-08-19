import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UserType } from '../UserContext';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const ProfileScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const { orders, setOrders } = useState([]);
    const { loading, setLoading } = useState(true);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: {
                backgroudColor: "#00CED1",
            },
            headerLeft: () => (
                <Image
                    style={{ width: 140, height: 120, resizeMode: "contain" }}
                    source={{
                        uri: "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/256x256/9477e926915937c297b6f14515b56ac5",
                    }}
                />
            ),
            headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginRight: 12 }}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <AntDesign name="search1" size={24} color="black" />
                </View>
            ),
        });
    }, []);


    const [user, setUser] = useState();

    useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:8000/profile/${userId}`);
            setUser(response.data.user);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };
    fetchUserProfile();
}, [userId]);

    const logout = async () => {
        clearAuthToken();
    };

    const clearAuthToken = async () => {
        await AsyncStorage.removeItem('authToken');
        console.log("auth token cleared");
        navigation.replace('Login');
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://10.0.2.2:8000/orders/${userId}`);
            setOrders(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchOrders();
    }, [userId]);




    return (
        <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>Welcome {user?.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 }}>
                <Pressable style={{ padding: 10, backgroundColor: "red", borderRadius: 25, flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>Your Order</Text>
                </Pressable>

                <Pressable style={{ padding: 10, backgroundColor: "red", borderRadius: 25, flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>Your Account</Text>
                </Pressable>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 }}>
                <Pressable style={{ padding: 10, backgroundColor: "red", borderRadius: 25, flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>Buy Again</Text>
                </Pressable>

                <Pressable onPress={logout} style={{ padding: 10, backgroundColor: "red", borderRadius: 25, flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>Logout</Text>
                </Pressable>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 }}>
                <Pressable  onPress={() => navigation.navigate('Login')} style={{ padding: 10, backgroundColor: "red", borderRadius: 25, flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>Login</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Register')} style={{ padding: 10, backgroundColor: "red", borderRadius: 25, flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>Register</Text>
                </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : orders > 0 ? (
                    orders.map((order) => (
                        <Pressable
                            style={{
                                marginTop: 20,
                                padding: 15,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: "#d0d0d0",
                                marginHorizontal: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            key={order.id}
                        >
                            {/* Render the order information here*/}
                            {order.products.slice(0,1)?.map((product) => (
                                <View style={{marginVertical:10}} key={product.id}>
                                    <Image
                                        source={{ uri: product.image }}
                                        style={{ width: 100, height: 100, resizeMode: "contain" }}
                                    />
                                </View>
                            ))}
                        </Pressable>
                    ))
                ) : (
                    <Text>No orders yet</Text>
                )
                }
            </ScrollView>


        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})