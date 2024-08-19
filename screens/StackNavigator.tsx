import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './HomeScreen';
import ProductListScreen from './ProductListScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import AntDesign from "react-native-vector-icons/AntDesign";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../App';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import ProductInfoScreen from './ProductInfoScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import CartScreen from './CartScreen';
import { CartProvider } from './CartContext';
import AddAddressScreen from './AddAddressScreen';
import AddressScreen from './AddressScreen';
import ProfileScreen from './ProfileScreen';




const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator<RootStackParamList>();
    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: { color: "#008E97" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <Entypo
                                style={{ marginLeft: 8 }}
                                name="home"
                                size={24}
                                color={focused ? "blue" : "grey"}
                            />)
                    }} />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarLabelStyle: { color: "#008E97" },
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome
                                style={{ marginLeft: 8 }}
                                name="user-circle"
                                size={24}
                                color={focused ? "blue" : "grey"}
                            />)
                    }} />
                <Tab.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarLabelStyle: { color: "#008E97" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <AntDesign
                                style={{ marginLeft: 8 }}
                                name="shoppingcart"
                                size={24}
                                color={focused ? "blue" : "grey"}
                            />)
                    }} />
            </Tab.Navigator>
        )
    };

    return (
        <CartProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="Product" component={ProductListScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Info" component={ProductInfoScreen} options={({ navigation }) => ({
                        headerTitle: 'Product Details',
                        headerLeft: () => (
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                style={{ marginLeft: 15, color: "black" }}
                                onPress={() => navigation.goBack()}
                            />
                        ),
                        headerRight: () => (
                            <Ionicons
                                name="cart-outline"
                                size={24}
                                style={{ marginRight: 15, color: "black" }}
                                onPress={() => console.log('Go to cart')}
                            />
                        ),
                        headerStyle: {
                            backgroundColor: '#f5f5f5', // you can change this according to your app color theme
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    })} />
                    <Stack.Screen name="Cart" component={CartScreen} />
                    <Stack.Screen name="Address" component={AddAddressScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Add" component={AddressScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({})