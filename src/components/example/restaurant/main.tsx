import { APP_COLORS } from "@/src/constants/Colors";
import { processDataRestaurantMenu } from "@/src/utils/restaurant";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Info from "./info";
import ItemOrder from "./orders/item.order";
import StickyOrder from "./orders/sticky.order";
import StickyHeader from "./sticky.header";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const { height: sHeight, width: sWidth } = Dimensions.get("window");

const HEADER_HEIGHT = 120;
const IMAGE_HEIGHT = 220;
const INFO_HEIGHT = 250;
const SLIDE_MENU_HEIGHT = 50;

interface IProps {
  restaurant: IRestaurent | any;
}
const baseBackend = "http://10.0.2.2:8080/images/restaurant";
const baseBackendLink = "http://10.0.2.2:8080/images/menu-item";

const RMain = ({ restaurant }: IProps) => {
  const scrollY = useSharedValue(0);
  console.log("restaurant", restaurant);
  const sectionListRef = useRef<SectionList>(null);
  const flatListRef = useRef<FlatList>(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | string>(0);
  const blockUpdateRef = useRef<boolean>(false);

  // Scroll handler to update the scrollY value
  const onScroll = useAnimatedScrollHandler((event) => {
    // Lấy ra giá trị scroll bao nhiêu, ví dụ như mình quy định là 0 - 100, thì tới 100 các animation được apply
    scrollY.value = event.contentOffset.y;
    // console.log(scrollY.value)
  });
  console.log(`${baseBackend}/${restaurant.image}`);
  // Fade-in effect for the restaurant header
  const animatedStickyHeaderStyle = useAnimatedStyle(() => {
    //cho range 0 tới 100 để mà hiệu ứng sticky nó ẩn hiện.
    //  ví dụ như như scroll nó càng lướt lên thì hiệu ứng ẩn - hiện nó sẽ càng hiện ra dần  (opacity )
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      Extrapolation.CLAMP
    );
    const pointerEvents = opacity === 0 ? "none" : "auto";

    return {
      opacity,
      pointerEvents, //on/off click input
    };
  });

  // Sticky positioning for the menu below the header
  const animatedMenuStyle = useAnimatedStyle(() => {
    // sử dụng thuộc tính transform, giá trị âm thì lên trên, dương thì xuống dươi,
    //  range để làm sticky khi header + image nó cuộn tới đúng range của menu slider thì bắt sự kiện sticy
    const range = IMAGE_HEIGHT + INFO_HEIGHT - HEADER_HEIGHT;
    const translateY = interpolate(
      scrollY.value,
      [0, range], // Define scroll range
      [0, -range - 2], //2px menu border
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
      position: "absolute",
      top: IMAGE_HEIGHT + INFO_HEIGHT,
      zIndex: 2,
      width: "100%",
      backgroundColor: "white",
    };
  });

  const animatedInfoStyle = useAnimatedStyle(() => {
    const range = IMAGE_HEIGHT + INFO_HEIGHT - HEADER_HEIGHT;

    const translateY = interpolate(
      scrollY.value,
      [0, range], // Define scroll range
      [0, -range],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
      position: "absolute",
      top: IMAGE_HEIGHT,
      zIndex: 1,
      width: "100%",
    };
  });

  const animatedHeartIconStyle = useAnimatedStyle(() => {
    const range = IMAGE_HEIGHT + INFO_HEIGHT - HEADER_HEIGHT;

    const translateY = interpolate(
      scrollY.value,
      [0, range], // Define scroll range
      [0, -range],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });

  // Animated styles for background
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, 100],
        ["rgba(0,0,0,0.3)", "transparent"]
      ),
    };
  });

  // Animate arrow color
  const animatedArrowColorStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scrollY.value,
        [0, 100],
        ["white", APP_COLORS.ORANGE] // Arrow color range
      ),
    };
  });
  const DATA = processDataRestaurantMenu(restaurant);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && !blockUpdateRef.current) {
        const visibleSectionIndex = viewableItems[0].section.index;
        setActiveMenuIndex(visibleSectionIndex);
        flatListRef.current?.scrollToIndex({
          index: visibleSectionIndex,
          animated: true,
        });
      }
    }
  ).current;

  return (
    <View>
      <StickyHeader
        headerHeight={HEADER_HEIGHT}
        imageHeight={IMAGE_HEIGHT}
        animatedBackgroundStyle={animatedBackgroundStyle}
        animatedArrowColorStyle={animatedArrowColorStyle}
        animatedStickyHeaderStyle={animatedStickyHeaderStyle}
        animatedHeartIconStyle={animatedHeartIconStyle}
      />

      {/*  Image */}
      <View style={styles.header}>
        <Image
          source={{
            uri: `${baseBackend}/${restaurant?.image || ""}`,
          }}
          style={styles.headerImage}
        />
      </View>

      {/* Info */}

      {/* Sử dung component Animated, chúng ta sẽ trang trí được những cái hiệu ứng -> chính là css nhưng mà nó sẽ thay đổi động có logic mà chúng ta mong muốn  */}
      <Animated.View style={[animatedInfoStyle]}>
        <Info infoHeight={INFO_HEIGHT} restaurant={restaurant} />
      </Animated.View>

      {/* Sticky Menu */}
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        data={DATA}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              blockUpdateRef.current = true;
              setActiveMenuIndex(index);
              sectionListRef.current?.scrollToLocation({
                sectionIndex: item.index,
                itemIndex: 0,
                viewOffset: HEADER_HEIGHT + SLIDE_MENU_HEIGHT,
              });
            }}
          >
            <View
              style={{
                paddingHorizontal: 7,
                height: SLIDE_MENU_HEIGHT,
                justifyContent: "center",
                borderBottomColor:
                  item.index === activeMenuIndex
                    ? APP_COLORS.ORANGE
                    : APP_COLORS.GREY,
                borderBottomWidth: 2,
              }}
            >
              <Text
                style={{
                  color:
                    item.index === activeMenuIndex
                      ? APP_COLORS.ORANGE
                      : "black",
                  marginHorizontal: 5,
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={[animatedMenuStyle]}
      />

      {/* Scrollable Content */}
      {/* Lỗi ở đây là do AnimatedSectionList chưa hỗ trợ được generic typescript  */}
      <AnimatedSectionList
        ref={sectionListRef as any}
        style={{ zIndex: 1 }}
        onScroll={onScroll}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{
          paddingTop: IMAGE_HEIGHT + INFO_HEIGHT + SLIDE_MENU_HEIGHT,
          paddingBottom: 60,
        }}
        sections={DATA}
        renderItem={({ item, index }: { item: any; index: any }) => {
          console.log("item", item);
          const menuItem = item as IMenuItem;
          return (
            <View className="flex-row items-center gap-3 bg-white p-2">
              <View className="bg-white">
                <Image
                  className="w-[115px] h-[115px] object-cover"
                  source={{
                    uri: `${baseBackendLink}/${menuItem.image || ""}`,
                  }}
                ></Image>
              </View>
              <View className="bg-white flex-1">
                <Text className="text-red-400">{menuItem.title}</Text>
                {menuItem.description && (
                  <Text className="text-slate-400 my-4 self-start">
                    {menuItem.description}
                  </Text>
                )}

                <View className="flex-row items-center justify-between">
                  <Text className="text-slate-400 font-bold">
                    {menuItem.basePrice}
                  </Text>
                  <ItemOrder menuItem={menuItem}></ItemOrder>
                </View>
              </View>
            </View>
          );
        }}
        renderSectionHeader={({ section }: { section: any }) => (
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingTop: 25,
            }}
          >
            <Text style={{ textTransform: "uppercase" }}>{section.title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <>
            <View style={{ backgroundColor: "white", paddingHorizontal: 10 }}>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#ccc",
                  marginVertical: 5,
                }}
              />
            </View>
          </>
        )}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 1,
          waitForInteraction: true,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        onMomentumScrollEnd={() => (blockUpdateRef.current = false)}
      />

      <StickyOrder></StickyOrder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_COLORS.ORANGE,
    marginHorizontal: 10,
  },
  header: {
    width: sWidth,
    height: IMAGE_HEIGHT,
    top: 0,
    left: 0,
    position: "absolute",
    zIndex: 1,
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default RMain;
