import React from "react";
import { Dimensions, Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const BannerHome = () => {
  const width = Dimensions.get("window").width;
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const carousels = [
    { id: 1, source: require("@/assets/images/banner/bn1.jpg") },
    { id: 2, source: require("@/assets/images/banner/bn2.jpg") },
    { id: 3, source: require("@/assets/images/banner/bn3.jpg") },
  ];
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <View className="w-full my-2">
      <Carousel
        ref={ref}
        width={width}
        height={width / 4}
        data={carousels}
        onProgressChange={progress}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Image
              source={item.source}
              className="w-full h-full"
              resizeMode="cover"
              width={320}
              height={320}
            ></Image>
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={carousels}
        dotStyle={{ backgroundColor: "orange", width: 10, height: 3 }}
        containerStyle={{
          gap: 5,
          position: "absolute",
          left: 5,
          bottom: 10,
          marginTop: 20,
        }}
        activeDotStyle={{ backgroundColor: "gray" }}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default BannerHome;
