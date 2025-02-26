import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";


//로그인 처리
export const login = async(id,password)=>{
    try{
        const formData = new FormData();
        formData.append("userId",id);
        formData.append("userPw",password);

        const response = await axiosInstance.post("/login", formData,{  //창진이 백코드 root부분
        })

        const token = response.headers.authorization;

        if(token){
            await AsyncStorage.setItem("usertoken",token);
            alert("로그인에 성공하셨습니다.");
            return true;
        }else{
            alert("로그인에 실패하였습니다.");
            return false;
        }
    }catch(error){
        console.error("로그인 요청 실패 : ", error);
        alert("로그인 요청 중 문제가 발생했습니다.");
        return false;
    }
};

