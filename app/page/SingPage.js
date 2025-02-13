import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { singup } from "../api/AuthApi"; // 회원가입 API 호출
import styles from "../style/singstyles";


const Singup = () => {
  // 입력값 상태 관리
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userAdd, setUserAdd] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // 회원가입 처리 함수
  const handleSingup = () => {
    if (!userId || !userPw || !userName || !userAdd || !userEmail) {
      alert("모든 정보를 입력해주세요!");
      return;
    }
    singup(userId, userPw, userAdd, userEmail, userName);
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

      {/* 주소 입력 */}
      <TextInput
        style={styles.input}
        placeholder="주소 :"
        placeholderTextColor="#bbb"
        value={userAdd}
        onChangeText={setUserAdd}
      />

      {/* 이메일 입력 */}
      <TextInput
        style={styles.input}
        placeholder="이메일 :"
        placeholderTextColor="#bbb"
        value={userEmail}
        onChangeText={setUserEmail}
      />

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSingup}>
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Singup;
