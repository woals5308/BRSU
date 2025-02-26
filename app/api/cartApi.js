import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";



// 장바구니 상품 불러오기
export const fetchCartItems = async () =>{
    try{
        const response = await axiosInstance.get("/")
        return response.data;
    }catch(error){
        console.error(error);
        return [];
    }
};


//장바구니 상품 수량 수정