import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { signup } from "../api/signupApi";
import styles from "../style/singstyles";


const Signup = () => {
  // 입력값 상태 관리
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userphoneNunber, setUserphoneNumber] = useState("");

  // 회원가입 처리 함수
  const handleSingup = () => {
    if (!userId || !userPw || !userName || !userphoneNunber) {
      alert("모든 정보를 입력해주세요!");
      return;
    }
    signup(userId, userPw, userphoneNunber, userName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      {/* 아이디 입력 */}
      <TextInput
        style={styles.input}
        placeholder="아이디 :"
        placeholderTextColor="#bbb"
        value={userId}
        onChangeText={setUserId}
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호 :"
        placeholderTextColor="#bbb"
        secureTextEntry={true}
        value={userPw}
        onChangeText={setUserPw}
      />

      {/* 닉네임 입력 */}
      <TextInput
        style={styles.input}
        placeholder="닉네임 :"
        placeholderTextColor="#bbb"
        value={userName}
        onChangeText={setUserName}
      />

      {/* 폰 번호*/}
      <TextInput
        style={styles.input}
        placeholder="핸드폰 번호 :"
        placeholderTextColor="#bbb"
        value={userphoneNunber}
        onChangeText={setUserphoneNumber}
      />


      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSingup}>
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
