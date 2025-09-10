import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductDetails from './screens/ProductDetail';
import Cart from './screens/Cart';
import NavBar from './components/Navbar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator tabBar={props => <NavBar {...props} />}>
    <Tab.Screen 
      name="ProductDetails" 
      component={ProductDetails} 
      options={{ headerShown: true }} 
    />
    <Tab.Screen name="Cart" component={Cart} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
