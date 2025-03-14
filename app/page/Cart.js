import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Checkbox } from "expo-checkbox";

const dummyCartItems = [
  { id: "1", name: "소각용 종량제봉투 20L", price: 15000, discountedPrice: 7500, points: 60, quantity: 2 },
  { id: "2", name: "재사용 종량제봉투 20L", price: 7500, discountedPrice: 7500, points: 30, quantity: 1 },
  { id: "3", name: "음식물용 종량제봉투 1L", price: 7500, discountedPrice: 7500, points: 30, quantity: 1 },
];

const CartScreen = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(dummyCartItems);
  const [selectedItems, setSelectedItems] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSelectAll = () => {
    if (Object.keys(selectedItems).length === cartItems.length) {
      setSelectedItems({});
      setIsChecked(false);
    } else {
      setSelectedItems(Object.fromEntries(cartItems.map((item) => [item.id, true])));
      setIsChecked(true);
    }
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const deleteSelectedItems = () => {
    setCartItems((prevItems) => prevItems.filter((item) => !selectedItems[item.id]));
    setSelectedItems({});
    setIsChecked(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 🔹 상단 네비게이션 바 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>장바구니</Text>
      </View>

      {/* 🔹 전체 선택 & 선택 삭제 UI */}
      <View style={styles.selectionContainer}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={toggleSelectAll}>
          <Checkbox status={isChecked ? "checked" : "unchecked"} onPress={toggleSelectAll} />
          <Text style={styles.selectText}>전체 선택 ({Object.keys(selectedItems).length}/{cartItems.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteSelectedItems}>
          <Text style={styles.deleteText}>선택삭제</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.divider} />

      {/* 🔹 상품 목록 */}
      {cartItems.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          {/* 체크박스 */}
          <Checkbox status={selectedItems[item.id] ? "checked" : "unchecked"} onPress={() => toggleSelectItem(item.id)} />
          
          {/* 상품 이미지 */}
          <Image source={{ uri: "https://via.placeholder.com/70" }} style={styles.itemImage} />

          {/* 상품 정보 */}
          <View style={styles.itemDetails}>
            {/* 🔹 아이템 이름 */}
            <Text style={styles.itemName}>{item.name}</Text>

            {/* 🔹 수량 조절 & 가격 */}
            <View style={styles.quantityRow}>
              {/* 수량 조절 */}
              <View style={styles.quantityControls}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.circleButton}>
                  <Ionicons name="remove-outline" size={18} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.circleButton}>
                  <Ionicons name="add-outline" size={18} color="black" />
                </TouchableOpacity>
              </View>

              {/* 🔹 가격 정보 */}
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>{item.price.toLocaleString()}원</Text>
                <Text style={styles.discountedPrice}>{item.points}P</Text>
              </View>
            </View>
          </View>

          {/* 삭제 버튼 (포인트 위에 위치) */}
          <TouchableOpacity onPress={() => deleteSelectedItems(item.id)} style={styles.deleteIcon}>
            <Ionicons name="close-outline" size={20} color="black" />
          </TouchableOpacity>

          {/* 구분선 (각 아이템 아래에 위치) */}
          <View style={styles.divider} />
        </View>
      ))}
          <View style={styles.footerContainer}>
      {/* 🔹 결제 정보 */}
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>결제금액</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>총 상품 금액</Text>
          <Text style={styles.paymentAmount}>2P</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>보유 포인트</Text>
          <Text style={styles.paymentAmount}>150P</Text>
        </View>
      </View>

      {/* 🔹 주문하기 버튼 */}
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderText}>150P 주문하기</Text>
      </TouchableOpacity>
    </View>
      
    </View>
  );
};



export default CartScreen;
