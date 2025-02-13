import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL : "http://localhost:8080/",
    timeout : 5000,
    headers:{
        "Content-Type" : "multipart/form-data",
    },
});






//요청 인터셉터 : 모든 요청에 토큰 추가
axiosInstance.interceptors.request.use(
    async(config)=>{
        const token = await AsyncStorage.getItem("usertoken");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error)=>{
        return Promise.reject(error); //요청 에러 처리
    }
);


//응답 인터셉터 : 토큰 만료 처리
axiosInstance.interceptors.response.use(
    (response)=>response, //성공한 응답 그대로 반환
    async (error)=>{
        if(error.response?.status === 401){
            //401 Unauthorized 상태코드 처리
            await AsyncStorage.removeItem("usertoken");
            alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
        }
        return Promise.reject(error); //에러 반환
    }
);

export default axiosInstance;


