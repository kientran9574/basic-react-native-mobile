import CustomFlatList from "@/src/components/CustomFlatList/CustomFlatList";
import CollectionHome from "@/src/components/home/collection.home";
import SearchHome from "@/src/components/home/search.home";
import TopListHome from "@/src/components/home/top-list.home";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

// const data = Array(10).fill(1);

const data = [
  { key: 1, name: "Top Quán Rating 5* tuần này", ref: "" },
  { key: 2, name: "Quán Mới Lên Sàn", ref: "" },
  { key: 3, name: "Ăn Thỏa Thích, Freeship 0Đ", ref: "" },
];

const HomeTab = () => {
  // const MyComponent = () => {
  // https://stackoverflow.com/questions/45939823/react-native-horizontal-flatlist-with-multiple-rows
  //   return (
  //     <View style={styles.topList}>
  //       <ScrollView
  //         horizontal
  //         showsHorizontalScrollIndicator={false}
  //         directionalLockEnabled={true}
  //         alwaysBounceVertical={false}
  //       >
  //         <FlatList
  //           //  Nếu như sử dụng props numColumns nó chỉ hỗ trợ theo chiều dọc thôi, not support ngang
  //           // ý tưởng bọc vào ScrollView -> việc cuộn chuột thì do thằng ScrollView
  //           // Hiển thị data thì là thằng FlatList
  //           contentContainerStyle={{ alignSelf: "flex-start" }}
  //           numColumns={Math.ceil(data1.length / 2)}
  //           showsVerticalScrollIndicator={false}
  //           showsHorizontalScrollIndicator={false}
  //           data={data1}
  //           renderItem={({ item, index }) => {
  //             return (
  //               <View
  //                 style={{
  //                   padding: 10,
  //                   margin: 5,
  //                   borderWidth: 1,
  //                   borderColor: "#ccc",
  //                   width: 50,
  //                   height: 50,
  //                   alignSelf: "flex-start",
  //                 }}
  //               >
  //                 <Text>{index + 1}</Text>
  //               </View>
  //             );
  //           }}
  //         />
  //       </ScrollView>
  //     </View>
  //   );
  // };
  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={({ item }) => <CollectionHome name={item.name} />}
        HeaderComponent={<></>}
        StickyElementComponent={<SearchHome></SearchHome>}
        // TopListElementComponent={<View style={styles.topList} />}
        TopListElementComponent={<TopListHome></TopListHome>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    padding: 8,
    marginTop: 34,
  },
  header: {
    borderColor: "red",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },
  item: {
    borderColor: "green",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },
  list: {
    overflow: "hidden",
  },
  sticky: {
    backgroundColor: "#2555FF50",
    borderColor: "blue",
    borderWidth: 5,
    height: 100,
    marginBottom: 12,
    width: "100%",
  },
  topList: {
    borderColor: "orange",
    borderWidth: 5,
    minHeight: 100,
    marginBottom: 6,
    width: "100%",
  },
});

export default HomeTab;
