import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { router } from "expo-router";


//포인트샵 상품 불러오기 
//리턴 값 배열
export const fetchShopItems = async () =>{
    try{
        const response = await axiosInstance.get("/");
        return response.data.map((item) =>({
            ...item,
            quantity:0 , //초기 수량 설정띠
        }));
    }catch(error){
        console.error(error);
        Alert.alert("fail");
        return [];
    }
}


//장바구니에 상품 추가 
// itemsToAdd -> 장바구니에 추가할 상품 목록
export const addToCart = async (itemsToAdd) => {
    try{
        if(itemsToAdd.length === 0){
            Alert.alert("장바구니에 추가할 상품이 없습니다.");
            return false;
        }
        for(const item of itemsToAdd){
            const orderDTO = {itemId: item.id, count: item.quantity};
            await axiosInstance.post("/", orderDTO);
        }
        Alert.alert("장바구니에 상품이 추가되었습니다.");
        return true;
    }catch(error){
        console.error(error);
        Alert.alert("장바구니 추가 중 오류 발생");
        return false;
    }
};



//장바구니 총합 포인트 계산 
export const calculateTotalPoints = (cartItems) =>{
    return cartItems.reduce((total,item)=> total+item.price * item.quantity, 0);
}

