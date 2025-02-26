import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";


// 회원가입 부분

export const singup =  async (userId,userPw,userName,userAdd,userEmail) =>{
    try{
        const formData = new FormData();
        formData.append("userId",userId);
        formData.append("userPw",userPw);
        formData.append("userName",userName);
        formData.append("userAdd",userAdd);
        formData.append("userEmail",userEmail);
        
        const response = await axiosInstance.post("/join",formData,{

        }
    );
    }catch(error){
        console.error("회원가입 요청 실패 : ", error);
        alert("회원가입 요청 중 문제가 발생했습니다.");
    }
};
