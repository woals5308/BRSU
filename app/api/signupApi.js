import axiosInstance from "./axiosInstance";


// 회원가입 부분

export const signup = async (userId, userPw, userName, userphoneNumber) => {
    try {
        const requestData = {
            id: userId,
            pw: userPw,
            name: userName,
            phoneNumber: userphoneNumber
        };

        const response = await axiosInstance.post("/join", requestData, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("회원가입 성공:", response.data);
        return response.data; // 회원가입 성공 시 데이터 반환

    } catch (error) {
        console.error("회원가입 요청 실패:", error);

        // error.response가 존재하는 경우와 존재하지 않는 경우를 구분해서 처리
        if (error.response) {
            console.error("응답 데이터:", error.response.data);
            alert(`회원가입 실패: ${error.response.data.message || "서버 오류"}`);
        } else {
            alert("회원가입 요청 중 문제가 발생했습니다. 네트워크 상태를 확인하세요.");
        }
    }
};
