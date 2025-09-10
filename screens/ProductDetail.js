import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  StyleSheet, 
  Dimensions,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (route.params?.product) {
      setProduct(route.params.product);
    }
  }, [route.params]);

  const [product, setProduct] = useState({
    title: "Lay's Classic Salted",
    price: 'Rs 50',
    image: 'https://tiimg.tistatic.com/fp/1/007/865/crispy-delicious-fresh-tasting-classic-salted-best-quality-lays-potato-chips-443.jpg',
    description: 'The original potato chips with perfect amount of salt that started it all. Made with specially selected potatoes for a light, crispy crunch.'
  });

  const relatedProducts = [
    { 
      id: '1', 
      title: "Lay's Sour Cream & Onion", 
      price: 'Rs 80', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCRtA2RKJFWA1Aongr8sBEkeZ8zXfiV1w1g&s',
      description: 'Tangy, creamy, and packed with onion flavor. A perfect balance of smooth sour cream with zesty onion taste.'
    },
    { 
      id: '2', 
      title: "Lay's BBQ", 
      price: 'Rs 80', 
      image: 'https://images-cdn.ubuy.co.in/66ecafaac2bd654318665bce-lay-s-barbecue-flavored-potato-chips.jpg',
      description: 'Sweet, smoky, and slightly spicy BBQ flavor that brings the taste of a backyard cookout to your snack time.'
    },
    { 
      id: '3', 
      title: "Lay's Salt & Vinegar", 
      price: 'Rs 100', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCRtA2RKJFWA1Aongr8sBEkeZ8zXfiV1w1g&s',
      description: 'A bold combination of tangy vinegar and salt that delivers a punch of flavor with every crispy bite.'
    },
    { 
      id: '4', 
      title: "Lay's Flamin' Hot", 
      price: 'Rs 50', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvcoZfsA4oNB6PbVEWdGczt-RPCyGIP-wMWQ&s',
      description: 'Intensely spicy and fiery hot flavored chips that bring the heat to snack time.'
    }
  ];

  const formatPrice = (price) => {
    return price.replace('Rs', 'Rs ').trim();
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      Alert.alert('Success', 'Added to Cart!');
      await navigation.navigate('Cart');
    } catch (error) {
      Alert.alert('Error', 'Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const renderRelatedProduct = ({ item }) => (
    <View key={item.id} style={styles.relatedItem}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.relatedImage}
        onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
        
      />
      <Text style={styles.relatedName} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.relatedPrice}>{formatPrice(item.price)}</Text>
      <TouchableOpacity 
        style={styles.selectButton}
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <Text style={styles.selectText}>Select Option</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.productImage}
          onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
          
        />
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
        <TouchableOpacity 
          onPress={handleAddToCart} 
          style={[styles.addToCartButton, isLoading && styles.disabledButton]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.addToCartText}>Add to Cart</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.detailsToggle}>
          <Text style={styles.detailsToggleText}>
            {isExpanded ? 'Hide Details' : 'Product Details'}
          </Text>
        </TouchableOpacity>
        {isExpanded && (
          <Text style={styles.detailsText}>
            {product.description || 'Product description not available.'}
          </Text>
        )}
        
        <View style={styles.divider} />
        <Text style={styles.relatedTitle}>Related Products</Text>
        <FlatList
          horizontal
          data={relatedProducts}
          renderItem={renderRelatedProduct}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.relatedListContainer}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '600',
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
    width: '70%',
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsToggle: {
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsToggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  detailsText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#DCDCDC',
    marginVertical: 20,
  },
  relatedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  relatedListContainer: {
    paddingHorizontal: 5,
  },
  relatedItem: {
    width: 160, 
    marginRight: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  relatedImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  relatedName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
    marginBottom: 5,
  },
  relatedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#E6F3FF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

ProductDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
      }),
    }),
  }),
};

export default ProductDetails;
