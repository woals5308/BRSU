import React from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../style/pointmodal";
import useCart from "../hook/usePoint";

const ShoppingModal = ({ visible, onClose, selectedItem, increaseCartCount }) => {
  if (!selectedItem) return null;

  const { quantity, increaseQuantity, decreaseQuantity, handleAddToCart } = useCart(selectedItem);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.dragBar} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedItem.name}</Text>

            {/* 🔹 수량 조절 & 가격 표시 */}
            <View style={styles.quantityRow}>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                  <Ionicons name="remove-outline" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                  <Ionicons name="add-outline" size={20} color="black" />
                </TouchableOpacity>
              </View>

              {/* 🔹 가격 정보 */}
              <View style={styles.priceContainer}>
                <Text style={styles.oldPrice}>{(selectedItem.price * 2).toLocaleString()}원</Text>
                <Text style={styles.newPrice}>{(selectedItem.points * quantity)}P</Text>
              </View>
            </View>
          </View>

          {/* 🔹 장바구니 담기 버튼 */}
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              if (handleAddToCart()) {
                increaseCartCount();
                onClose();
              }
            }}
          >
            <Text style={styles.addToCartText}>장바구니 담기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ShoppingModal;
