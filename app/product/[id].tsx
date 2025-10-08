import RMain from "@/src/components/example/restaurant/main";
import { useRestaurentIDQuery } from "@/src/features/restaurent/hook";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions, View } from "react-native";
const { height: sHeight, width: sWidth } = Dimensions.get("window");
const ProductPage = () => {
  const { id } = useLocalSearchParams();
  const restaurantQuery = useRestaurentIDQuery(id as string);
  if (restaurantQuery.isPending) {
    return (
      <ContentLoader
        speed={2}
        width={700}
        height={sHeight}
        // viewBox="0 0 700 150"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        style={{ width: "100%" }}
      >
        <Rect x="0" y="0" rx="3" ry="3" width={sWidth} height="120" />

        <Rect x="10" y="140" rx="10" ry="10" width={sWidth - 50} height="20" />
        <Rect x="10" y="170" rx="10" ry="10" width={sWidth - 150} height="20" />

        <Rect x="10" y="220" rx="5" ry="5" width={100} height="100" />
        <Rect x="130" y="220" rx="10" ry="10" width={150} height="20" />
        <Rect x="130" y="250" rx="10" ry="10" width={100} height="20" />
        <Rect x="130" y="280" rx="10" ry="10" width={200} height="20" />

        <Rect x="10" y="340" rx="5" ry="5" width={100} height="100" />
        <Rect x="130" y="340" rx="10" ry="10" width={150} height="20" />
        <Rect x="130" y="370" rx="10" ry="10" width={100} height="20" />
        <Rect x="130" y="400" rx="10" ry="10" width={200} height="20" />

        <Rect x="10" y="460" rx="5" ry="5" width={100} height="100" />
        <Rect x="130" y="460" rx="10" ry="10" width={150} height="20" />
        <Rect x="130" y="490" rx="10" ry="10" width={100} height="20" />
        <Rect x="130" y="520" rx="10" ry="10" width={200} height="20" />

        <Rect x="10" y="580" rx="5" ry="5" width={100} height="100" />
        <Rect x="130" y="580" rx="10" ry="10" width={150} height="20" />
        <Rect x="130" y="610" rx="10" ry="10" width={100} height="20" />
        <Rect x="130" y="640" rx="10" ry="10" width={200} height="20" />

        <Rect x="10" y="700" rx="5" ry="5" width={100} height="100" />
        <Rect x="130" y="700" rx="10" ry="10" width={150} height="20" />
        <Rect x="130" y="730" rx="10" ry="10" width={100} height="20" />
        <Rect x="130" y="760" rx="10" ry="10" width={200} height="20" />
      </ContentLoader>
    );
  }
  const restaurant = restaurantQuery.data?.data;
  return (
    <View className="flex-1">
      <RMain restaurant={restaurant}></RMain>
    </View>
  );
};

export default ProductPage;
