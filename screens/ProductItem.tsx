import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({ item }: any) => {
  const navigation = useNavigation();

  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Pressable onPress={() => navigation.navigate('Info', { item: item })}>
        <Image style={{ width: 150, height: 150, resizeMode: "contain" }} source={{ uri: item?.image }} />
      </Pressable>
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10, color: "black" }}>{item?.title}</Text>
      <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>${item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>{item?.rate} Star</Text>
      </View>
      <Pressable style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 20, justifyContent: "center", alignItems: "center", marginHorizontal: 10, marginTop: 10 }}>
        <Text>Add to Cart</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
