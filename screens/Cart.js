import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Use a state to manage the cart items with some mock data
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      title: 'Classic Salted Chips',
      price: 50,
      image: 'https://tiimg.tistatic.com/fp/1/007/865/crispy-delicious-fresh-tasting-classic-salted-best-quality-lays-potato-chips-443.jpg',
      quantity: 1,
    },
    {
      id: '2',
      title: 'Honey BBQ Chips',
      price: 80,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwwAqrDx64iZkIgX3Bf8e-z7vTuPjjB_0DVg&s',
      quantity: 2,
    },
  ]);

  
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
const handleQuantityChange = (itemId, change) => {
  setCartItems(cartItems.map(item => {
    if (item.id === itemId) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        return { ...item, quantity: newQuantity };
      } else {
        // Remove item if quantity drops to 0
        return null;
      }
    }
    return item;
  }).filter(Boolean));
};
  
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.itemPrice}>Rs {item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.pageTitle}>Your Cart</Text>
        {cartItems.length > 0 ? (
          <View style={styles.cartContent}>
            <FlatList
              data={cartItems}
              renderItem={renderCartItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>Subtotal:</Text>
              <Text style={styles.summaryPrice}>Rs {calculateSubtotal().toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => Alert.alert('Checkout', 'Proceeding to checkout... (This is a dummy function)')}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            <TouchableOpacity style={styles.continueShoppingButton} onPress={() => navigation.goBack()}>
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
  },
  cartContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  itemPrice: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#E6F3FF',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 10,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    alignItems: 'center',
    padding: 50,
  },
  emptyCartText: {
    fontSize: 20,
    color: '#888',
    marginBottom: 20,
  },
  continueShoppingButton: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
  },
  continueShoppingText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
});

export default Cart;
