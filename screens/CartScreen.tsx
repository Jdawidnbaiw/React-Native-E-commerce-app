  import React from 'react';
  import { View, Text, FlatList, Button, StyleSheet, Pressable } from 'react-native';
  import { useCart } from './CartContext';

  const CartScreen = () => {
    const { cartItems, getTotalPrice, removeFromCart, updateQuantity } = useCart();

    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={{ color: "black" }}>{item.title} - ${item.price}</Text>
        <View style={styles.quantityContainer}>
          <Pressable onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
          <Pressable onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </Pressable>
      </View>
    );

    return (
      <View style={styles.container}>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={cartItems} // Important to ensure list updates when cartItems changes
          />
        ) : (
          <Text>No items in the cart.</Text>
        )}
        <Text style={{ color: "black" }}>Total: ${getTotalPrice().toFixed(2)}</Text>
        <Button title="Checkout" onPress={() => alert('Proceed to Checkout')} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    itemContainer: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#f9f9f9',
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    button: {
      padding: 10,
      marginHorizontal: 5,
      backgroundColor: '#ccc',
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
    },
    quantityText: {
      fontSize: 16,
      color: 'black',
    },
    removeButton: {
      padding: 10,
      backgroundColor: 'red',
      borderRadius: 5,
      marginTop: 5,
    },
    removeButtonText: {
      color: 'white',
      textAlign: 'center',
    }
  });

  export default CartScreen;