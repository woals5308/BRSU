import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
    },
    safeArea: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      marginBottom: 20,
    },
    loginBox: {
      width: "100%",
      backgroundColor: "#222",
      padding: 20,
      borderRadius: 10,
    },
    label: {
      color: "#aaa",
      fontSize: 14,
      marginBottom: 5,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#333",
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 15,
    },
    input: {
      flex: 1,
      color: "white",
      paddingVertical: 12,
    },
    icon: {
      fontSize: 16,
      color: "#bbb",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    checkmark: {
      color: "green",
      fontSize: 14,
    },
    checkboxText: {
      color: "white",
      fontSize: 14,
      marginLeft: 10,
    },
    linkText: {
      color: "#bbb",
      fontSize: 14,
      textDecorationLine: "underline",
    },
    loginButton: {
      backgroundColor: "green",
      padding: 15,
      borderRadius: 5,
      alignItems: "center",
    },
    loginButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    socialButton: {
      width: "100%",
      paddingVertical: 12,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 10,
    },
    kakaoButton: {
      backgroundColor: "#FEE500",
    },
    kakaoText: {
      color: "#3C1E1E",
      fontWeight: "bold",
      fontSize: 16,
    },
    appleButton: {
      backgroundColor: "white",
    },
    appleText: {
      color: "black",
      fontWeight: "bold",
      fontSize: 16,
    },
    naverButton: {
      backgroundColor: "#03C75A",
    },
    naverText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    registerText: {
      color: "green",
      fontSize: 14,
      marginTop: 20,
      textDecorationLine: "underline",
    },
  });



export default styles;