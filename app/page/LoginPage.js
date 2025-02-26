import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import { login } from "../api/loginApi";
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
  } from "react-native";
import Checkbox from "expo-checkbox";
import styles from "../style/loginstyles";
import { appleSignIn } from "../social/appleAuth";
import { naverSignIn } from "../social/naverAuth"; // 네이버 로그인 함수 import


const Login = () =>{

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [autoLogin, setAutoLogin] = useState(false);
    const router = useRouter();





    //naver로그인 
    const handleNaverLogin = async () => {
      const userInfo = await naverSignIn();
      if (userInfo) {
        console.log("네이버 로그인 성공:", userInfo);
        router.push("/page/Main"); // 로그인 후 메인 페이지로 이동
      }
    };

    // 애플 로그인 처리 함수
    const handleAppleLogin = async () => {
      const credential = await appleSignIn(); // appleSignIn 호출
      if (credential) {
        // 애플 로그인 성공 후 인증 정보를 처리 (예: 로컬 스토리지에 저장)
        console.log('Apple login successful:', credential);
        // 예: AsyncStorage나 SecureStore에 정보 저장 가능
        await SecureStore.setItemAsync('userToken', credential.identityToken);
        router.push("/page/Main"); // 로그인 후 홈 화면으로 이동
      }
    };





    //일반 로그인 처리 함수
    const handleLogin = () =>{

    }
    // const handleLogin = async () =>{
    //     try{
    //         const loginSuccess = await login(id,password);
    //         if(loginSuccess){
    //             router.push("/");
    //         }else{
    //             alert("fail")
    //         }
    //     }catch(error){
    //         console.error(error);
    //         alert("error")
    //     }
    // }
    
 return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Text style={styles.title}>로그인</Text>

        <View style={styles.loginBox}>
          <Text style={styles.label}>아이디</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={id}
              onChangeText={setId}
              placeholder="아이디 입력"
              placeholderTextColor="#fff"
            />
            <TouchableOpacity onPress={() => setId("")}> 
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>비밀번호</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호 입력"
              placeholderTextColor="#fff"
              secureTextEntry
            />
            <TouchableOpacity onPress={() => setId("")}> 
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.checkBoxContainer}
              onPress={() => setAutoLogin(!autoLogin)}
            >
              <Checkbox value={autoLogin} onValueChange={setAutoLogin} color="#0f0" />
              <Text style={styles.autoLoginText}>자동로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.optionText}>아이디/비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={()=>router.push('/page/NickName')}>
            <Text style={styles.loginButtonText}>지금 로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={[styles.button, styles.kakao]}>
            <Image source={require("../assets/icon/kakao.png")} style={styles.icon} />
            <Text style={styles.text}>카카오로 로그인하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.apple]} onPress={handleAppleLogin}>
            <Image source={require("../assets/icon/apple.png")} style={styles.icon} />
            <Text style={styles.text}>Apple로 로그인하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.naver]} onPress={handleNaverLogin} >
            <Image source={require("../assets/icon/naver.png")} style={styles.icon} />
            <Text style={styles.text}>네이버로 로그인하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupText}>지금 바로 회원가입 →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
    }


export default Login;