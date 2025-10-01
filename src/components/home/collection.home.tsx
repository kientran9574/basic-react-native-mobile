import APP_COLORS from "@/src/constants/Colors";
import restaurentApi from "@/src/features/restaurent/api";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
interface IProps {
  name?: string;
  refApi: string;
}
const CollectionHome = ({ name, refApi }: IProps) => {
  const [restaurants, setRestaurants] = useState<IRestaurent[]>([]);
  // const restaurentMutation = useRestaurentMutation();
  useEffect(() => {
    const fetchData = async () => {
      const res = await restaurentApi.getRestaurentAPI(refApi);
      console.log("🚀 ~ fetchData ~ res:", res);
      setRestaurants(res.data || []);
    };
    fetchData();
  }, [refApi]);

  const baseBackend = "http://10.0.2.2:8080/images/restaurant";
  return (
    <View className="w-full h-[250px] mb-3 bg-white p-2">
      <View className="flex-row items-center justify-between">
        <Text className={`text-[${APP_COLORS.ORANGE}] text-lg font-extrabold`}>
          {name}*
        </Text>
        <Pressable className="text-sm text-gray-400">
          <Text>See all</Text>
        </Pressable>
      </View>
      <View className="my-1">
        <Text>Description delivery</Text>
      </View>
      {/* dataa */}
      <FlatList
        data={restaurants}
        horizontal
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View className="">
            <Image
              className="w-[150px] h-[150px] object-cover mr-1"
              source={{ uri: `${baseBackend}/${item.image}` }}
            ></Image>

            <View>
              <Text
                numberOfLines={2}
                className="max-w-[150px]"
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

export default CollectionHome;
