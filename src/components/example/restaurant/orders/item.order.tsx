import APP_COLORS from "@/src/constants/Colors";
import { useAppContext } from "@/src/context/app.context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, Text, View } from "react-native";
interface IProps {
  restaurant: IRestaurent | null;
  menuItem: IMenuItem;
}
const ItemOrder = ({ menuItem, restaurant }: IProps) => {
  const { cart, setCart } = useAppContext();
  const handleMenuItem = (menuItem: IMenuItem, action: "MINUS" | "PLUS") => {
    if (restaurant?._id) {
      const total = action === "MINUS" ? -1 : 1;
      if (!cart[restaurant._id]) {
        cart[restaurant._id] = {
          sum: 0,
          quantity: 0,
          items: {},
        };
      }
      // handle item
      cart[restaurant._id].sum =
        cart[restaurant._id].sum + total * menuItem.basePrice;
      cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;
      // are check item of restaurant that in cart ?
      if (!cart[restaurant._id].items[menuItem._id]) {
        cart[restaurant._id].items[menuItem._id] = {
          data: menuItem,
          quantity: 0,
        };
      }
      cart[restaurant._id].items[menuItem._id] = {
        data: menuItem,
        quantity: cart[restaurant._id].items[menuItem._id].quantity + total,
      };
      setCart((prevState: ICart | Record<string, never>) => ({
        ...prevState,
        cart,
      }));
    }
  };
  let showMinus = false;
  let quantity = 0;
  if (cart[restaurant?._id!]) {
    if (cart[restaurant?._id!].items[menuItem._id]) {
      showMinus = true;
      quantity = cart[restaurant?._id!].items[menuItem._id].quantity ?? 0;
      if(quantity === 0) {
        showMinus = false
      }
    }
  }
  return (
    <View className="flex-row items-center justify-center">
      {showMinus && (
        <Pressable
          className={`size-6 bg-slate-100 items-center justify-center`}
          onPress={() => handleMenuItem(menuItem, "MINUS")}
        >
          <MaterialIcons name="remove" size={24} color="black" />
        </Pressable>
      )}
      <View className="mx-2">
        <Text>{quantity}</Text>
      </View>
      <Pressable
        className={`size-6 bg-[${APP_COLORS.ORANGE}] items-center justify-center`}
        onPress={() => handleMenuItem(menuItem, "PLUS")}
      >
        <FontAwesome6 name="add" size={16} color={`white`} />
      </Pressable>
    </View>
  );
};

export default ItemOrder;
