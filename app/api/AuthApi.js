import axios from "axios";
import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useState } from "react";
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



// 로그아웃처리
export const logout = async () =>{
    try{
        await AsyncStorage.removeItem("usertoken");
        alert("로그아웃되었습니다.");
    }catch(error){
        console.log("로그아웃 요청 실패: ",error);
    }
}


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



//내정보에 데이터 가져오기
export const fetchMyInfo = async () =>{


    try{
        const token = await AsyncStorage.getItem("usertoken");
        if(!token){
            alert("로그인이 필요합니다.");
            router.push("/page/LoginPage");
            return;
        }
        console.log(token)

        const response = await axiosInstance.get("msp/myInfo")
        console.log(response.data);
    }catch(error){
        console.error(error);
    }
};



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






//qr 카메라로 QR바코드 찍고 데이터 
export const QR = async(data) =>{
    try{
        const token = await AsyncStorage.getItem("usertoken");
        if(!token){
            Alert.alert("로그인이 필요합니다.");
            return;
        }
        const response = await axiosInstance.get(`/map/openBox/${data}`)
        router.push({
            pathname:"/page/QRload",
            params:{data},
        });
    }catch(error){
        console.error(error);
    }
}
