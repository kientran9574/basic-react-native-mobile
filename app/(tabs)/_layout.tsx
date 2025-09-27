import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";
const _layout = () => {
  const getIcons = (routerName: string, focused: boolean, size: number) => {
    if (routerName === "index") {
      return (
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={size}
          color={focused ? "#FE724C" : "gray"}
        />
      );
    } else if (routerName === "order") {
      return (
        <FontAwesome5
          name="list-alt"
          size={size}
          color={focused ? "#FE724C" : "gray"}
        />
      );
    } else if (routerName === "favorite") {
      return (
        <FontAwesome5
          name="heart"
          size={size}
          color={focused ? "#FE724C" : "gray"}
        />
      );
    } else if (routerName === "notification") {
      return (
        <FontAwesome5
          name="bell"
          size={size}
          color={focused ? "#FE724C" : "gray"}
        />
      );
    } else if (routerName === "account") {
      return (
        <FontAwesome5
          name="user-cog"
          size={size}
          color={focused ? "#FE724C" : "gray"}
        />
      );
    }
  };
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // You can return any component that you like here!
          return getIcons(route.name, focused, size);
        },
        headerShown: false,
        tabBarLabelStyle: { paddingBottom: 3 },
        tabBarActiveTintColor: "#FE724C",
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
        }}
      />
    </Tabs>
  );
};

export default _layout;
