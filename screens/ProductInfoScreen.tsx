import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './CartContext';

const ProductInfo = ({ route }) => {
  const { item } = route.params;
  const { addToCart } = useCart();
  const navigation = useNavigation();

  return (
    <View style={styles.fullScreen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <Text style={styles.rate}>Rating: {item.rate} Stars</Text>
        <Text style={styles.description}>{item.description || "No additional description available."}</Text>
      </ScrollView>
      <Button
        title="Buy Now"
        onPress={() => {
          addToCart(item);
          navigation.navigate('Cart'); // Optionally navigate to the Cart screen
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginVertical: 10,
  },
  rate: {
    fontSize: 18,
    color: '#FFC72C',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buyNow: {
    backgroundColor: '#FFC72C',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buyNowText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductInfo;
