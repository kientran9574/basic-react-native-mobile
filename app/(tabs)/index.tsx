import CustomFlatList from "@/src/components/CustomFlatList/CustomFlatList";
import CollectionHome from "@/src/components/home/collection.home";
import SearchHome from "@/src/components/home/search.home";
import TopListHome from "@/src/components/home/top-list.home";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

// const data = Array(10).fill(1);

const data = [
  { key: 1, name: "Top Quán Rating 5* tuần này", refApi: "top-rating" },
  { key: 2, name: "Quán Mới Lên Sàn", refApi: "newcomer" },
  { key: 3, name: "Ăn Thỏa Thích, Freeship 0Đ", refApi: "top-freeship" },
];

const HomeTab = () => {
  return (
    <SafeAreaView className="flex-1 mt-12">
      <CustomFlatList
        data={data}
        className="bg-gray-300 mb-2 -z-10"
        style={styles.list}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => (
          <CollectionHome name={item.name} refApi={item.refApi} />
        )}
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
