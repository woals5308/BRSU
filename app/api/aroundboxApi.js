import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";


// 내 주변 수거함 가져오기
export const getNearbyCollectionPoints = async (latitude, longitude) =>{
    try{
        const token = await AsyncStorage.getItem("usertoken");
        if(!token){
            alert("로그인이 필요합니다.");
            return [];
        }
        const response = await axiosInstance.get(`/nearby?latitude=${latitude}&longitude=${longitude}&radius=400`)

        return response.data.map((item)=>{
            const match = item.location.match(/POINT \(([^ ]+) ([^ ]+)\)/);
            if(match){
                return {
                    ...item,
                    latitude:parseFloat(match[2]),
                    longitude:parseFloat(match[1]),
                };
            }
            return null;
        }).filter(Boolean);
    }catch(error){
        console.error("수거함 데이터 가져오기 실패:",error);
        alert("데이터 로딩 실패");
        return [];
    }
}

