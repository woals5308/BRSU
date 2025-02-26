import { useState } from "react";
import { Alert } from "react-native";
import { addToCart } from "../api/pointApi"; // ✅ 장바구니 API

const useCart = (selectedItem) => {
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // ✅ 장바구니에 추가하는 함수
  const handleAddToCart = async () => {
    if (!selectedItem) return;

    const itemsToAdd = [{ ...selectedItem, quantity }];
    
    try {
      // const success = await addToCart(itemsToAdd); // ✅ 백엔드 연동 (현재 주석 처리)
      const success = true; // ✅ 테스트용 (API 주석 해제 시 실제 적용)

      if (success) {
        setCartCount((prev) => prev + quantity);
        Alert.alert("장바구니 추가 완료!", "상품이 장바구니에 추가되었습니다.");
      }
    } catch (error) {
      Alert.alert("장바구니 추가 실패", "다시 시도해주세요.");
      console.error("장바구니 추가 오류:", error);
    }
  };

  return { quantity, increaseQuantity, decreaseQuantity, handleAddToCart, cartCount };
};

export default useCart;
