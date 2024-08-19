import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';
import { openDB } from './Database';
import { RootStackParamList } from '../App';
import { RouteProp } from '@react-navigation/native';

export type productdetailsProps = RouteProp<RootStackParamList, 'ProductList'>;

interface Product {
  prodId: number;
  name: string;
  imageUrl: string;
  price: number;
}

const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = await openDB();
        const results = await db.executeSql('SELECT * FROM Products');
        let loadedProducts: Product[] = [];
        for (let i = 0; i < results[0].rows.length; i++) {
          loadedProducts.push(results[0].rows.item(i));
        }
        setProducts(loadedProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.prodId.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductListScreen;
