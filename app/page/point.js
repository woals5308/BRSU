import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StatusBar, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "../components/BottomNavigation";
import Pointmodal from "../components/PointModal";
import { fetchShopItems } from "../api/pointApi"; // ✅ 백엔드 API 함수
import styles from "../style/pointstyles";

const dummyItems = [
  { id: "1", name: "소각용 종량제봉투 20L", description: "소각 가능한 종량제 봉투", price: 7500, points: 30, image: "" },
  { id: "2", name: "재사용 종량제봉투 20L", description: "재사용 가능한 종량제 봉투", price: 7500, points: 30, image: "" },
  { id: "3", name: "음식물용 종량제봉투 1L", description: "음식물 전용 종량제 봉투", price: 7500, points: 30, image: "" },
];

const ShoppingScreen = () => {
  const router = useRouter();
  const [items, setItems] = useState(dummyItems);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0); // ✅ 장바구니 개수 상태 추가

  useEffect(() => {
    const loadItems = async () => {
      try {
        setItems(dummyItems); // ✅ 현재는 더미 데이터 사용
      } catch (error) {
        console.error("상품 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    loadItems();
  }, []);

  // ✅ 장바구니 개수 증가 함수 (최대 3개)
  const increaseCartCount = () => {
    setCartCount((prevCount) => (prevCount < 3 ? prevCount + 1 : prevCount));
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 🔹 상단 네비게이션 바 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>쇼핑</Text>

        {/* ✅ 장바구니 아이콘 & 배지 */}
        <TouchableOpacity style={styles.cartButton} onPress={() => router.push("/cart")}>
          <Ionicons name="bag-outline" size={30} color="black" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* 🔹 상품 목록 */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => selectItem(item)}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item.image || "https://via.placeholder.com/100" }} style={styles.itemImage} />
                <TouchableOpacity style={styles.favoriteIcon}>
                  <Ionicons name="heart-outline" size={22} color="gray" />
                </TouchableOpacity>
              </View>

              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>{item.price.toLocaleString()}원</Text>
                  <Text style={styles.itemPoints}>{item.points}P</Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => selectItem(item)} style={styles.cartIcon}>
                <Ionicons name="bag-outline" size={24} color="black" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* 🔹 모달창 */}
      <Pointmodal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedItem={selectedItem}
        increaseCartCount={increaseCartCount} // ✅ 장바구니 개수 증가 함수 전달
      />

      <BottomNavigation />
    </View>
  );
};

export default ShoppingScreen;
