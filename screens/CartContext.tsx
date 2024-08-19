import React, { createContext, useContext, useState, useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'products3.0.sqlite', createFromLocation: '~products3.0.sqlite' },
  () => console.log('Database opened successfully.'),
  error => console.error('Error opening database:', error)
);

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-render

  const forceRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1); // Increment to trigger re-render
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    console.log('Cart items updated:', cartItems); // Debug to monitor cart items
  }, [cartItems, refreshKey]); // Also re-run on refreshKey change

  const fetchCart = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM cart',
        [],
        (_, results) => {
          let items = [];
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i));
          }
          console.log('Fetched items:', items); // Debug to see fetched data
          setCartItems(items);
        },
        (tx, error) => {
          console.error('Failed to retrieve items from DB:', error.message);
        }
      );
    });
  };
  
  

  const addToCart = (product) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO cart (product_id, title, price, quantity, image) VALUES (?, ?, ?, ?, ?)',
        [product.id, product.title, product.price, 1, product.image],
        (_, result) => {
          console.log(`Item ${product.title} added successfully with row id ${result.insertId}`);
          fetchCart();  // Refresh the cart items after adding
        },
        error => {
          console.error('Failed to add item to DB:', error.message);
        }
      );
    });
  };

  const removeFromCart = (productiId) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM cart WHERE product_id = ?',
        [productId],
        (_, result) => {
          console.log(`Item with product_id ${productId} removed successfully`);
          fetchCart();  // Refresh the cart items after deleting
        },
        (tx, error) => {
          console.error('Failed to remove item from DB:', error.message);
        }
      );
    });
  };

  const updateQuantity = (productId, quantity) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE cart SET quantity = ? WHERE product_id = ?',
        [quantity, productId],
        (_, result) => {
          console.log(`Updated quantity for product_id ${productId} to ${quantity}`);
          fetchCart();  // Refresh the cart items after updating
        },
        error => {
          console.error('Failed to update item quantity in DB:', error.message);
        }
      );
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
