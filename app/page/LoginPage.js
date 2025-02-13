import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import { login } from "../api/AuthApi";
// import styles from "../style/loginstyles";
import {
    StyleSheet,
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
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../style/loginstyles";



const Login = () =>{
    const router = useRouter();
    // const [id,setId] = useState("");
    // const [password,setPassword] = useState("");


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
            <StatusBar backgroundColor="black" barStyle="light-content" />
          <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
              <Text style={styles.title}>로그인</Text>
    
              {/* 로그인 입력 박스 */}
              <View style={styles.loginBox}>
                <Text style={styles.label}>아이디</Text>
                <View style={styles.inputContainer}>
                  <TextInput style={styles.input} placeholder="아이디 입력" placeholderTextColor="#bbb" />
                  <TouchableOpacity>
                    <Text style={styles.icon}>❌</Text>
                  </TouchableOpacity>
                </View>
    
                <Text style={styles.label}>비밀번호</Text>
                <View style={styles.inputContainer}>
                  <TextInput style={styles.input} placeholder="비밀번호 입력" placeholderTextColor="#bbb" secureTextEntry />
                  <TouchableOpacity>
                    <Text style={styles.icon}>❌</Text>
                  </TouchableOpacity>
                </View>
    
                {/* 자동 로그인 체크박스 */}
                <View style={styles.row}>
                  <TouchableOpacity style={styles.checkbox}>
                    <Text style={styles.checkmark}>✔</Text>
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>자동로그인</Text>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>아이디/비밀번호 찾기</Text>
                  </TouchableOpacity>
                </View>
    
                {/* 로그인 버튼 */}
                <TouchableOpacity style={styles.loginButton}>
                  <Text style={styles.loginButtonText} onPress={()=>router.push('/page/NickName')}>지금 로그인</Text>
                </TouchableOpacity>
              </View>
    
              {/* 소셜 로그인 버튼 */}
              <TouchableOpacity style={[styles.socialButton, styles.kakaoButton]} onPress={() => handleSocialLogin("카카오")}>
                <Text style={styles.kakaoText}>카카오로 로그인하기</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style={[styles.socialButton, styles.appleButton]} onPress={() => handleSocialLogin("Apple")}>
                <Text style={styles.appleText}>Apple로 로그인하기</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style={[styles.socialButton, styles.naverButton]} onPress={() => handleSocialLogin("네이버")}>
                <Text style={styles.naverText}>네이버로 로그인하기</Text>
              </TouchableOpacity>
    
              {/* 회원가입 링크 */}
              <TouchableOpacity onPress={()=>router.push('/page/SingPage')}>
                <Text style={styles.registerText}>지금 바로 회원가입 →</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      );
    }


export default Login;