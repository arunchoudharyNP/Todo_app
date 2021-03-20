import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TodoListScreen from "../Screens/TodoListScreen";
import AddTodoScreen from "../Screens/AddTodoScreen";
import { LinearGradient } from "expo-linear-gradient";

const RootNavigation = (props) => {
  const RootStack = createStackNavigator();

  const headerLogo = () => {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          style={styles.logoImage}
          source={require("../assets/Images/Logo.png")}
        />
        <Text style={styles.logoTitle}>TODO APP</Text>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="todoListScreen"
        screenOptions={{
          headerTintColor: "white",
          headerTitle: headerLogo,
          headerBackground: () => (
            <LinearGradient
              colors={["#12AA98", "#04665B"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            />
          ),
        }}
      >
        <RootStack.Screen name="todoListScreen" component={TodoListScreen} />
        <RootStack.Screen name="addTodoScreen" component={AddTodoScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    resizeMode: "contain",
    height: 55,
    width: 40,
    marginLeft: 35,
    marginRight: 10,
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: "500",
    color: "white",
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
});

export default RootNavigation;
