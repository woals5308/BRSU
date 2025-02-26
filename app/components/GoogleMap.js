import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import useFetchLocationAndData from "../hook/userFetchLocationAndData";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import styles from "../style/mapstyles";
import { Ionicons } from "@expo/vector-icons";



const Map = () => {
  const router = useRouter();
  const { currentLocation, collectionPoints } = useFetchLocationAndData();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);
  const mapRef = React.useRef(null);

  // 🔹 특정 수거함 선택 시 상세 모달 열기
  const handleMarkerPress = (point) => {
    setSelectedPoint(point);
    setModalVisible(true);
    setBottomSheetVisible(false);
  };

  // 🔹 맵 클릭 시 모든 모달 닫기 + 바텀시트 숨김
  const closeModal = () => {
    setModalVisible(false);
    setBottomSheetVisible(false);
  };

  // 🔹 내 위치(파란 점) 클릭 시 기본 모달 다시 표시
  const handleUserLocationPress = () => {
    setBottomSheetVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" style="light" />

      {/* 🔹 왼쪽 상단 뒤로가기 버튼 추가 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* ✅ 지도 영역 (클릭하면 모달 닫힘) */}
      <Pressable style={styles.mapContainer} onPress={closeModal}>
        {currentLocation && (
          <MapView
            ref={mapRef}
            style={styles.map}
            region={currentLocation}
            showsUserLocation
          >
            {/* 🔹 내 위치 클릭 감지 (파란 점) */}
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="내 위치"
              opacity={0} // 마커는 안 보이지만 클릭 가능
              onPress={handleUserLocationPress}
            />

            {/* 🔹 수거함 마커 표시 */}
            {collectionPoints.map((point, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude,
                }}
                title={point.name}
                onPress={() => handleMarkerPress(point)}
              />
            ))}
          </MapView>
        )}
      </Pressable>

      {/* ✅ 기본 하단 모달 (초기 모달) */}
      {bottomSheetVisible && (
        <View style={styles.bottomSheet}>
          <View style={styles.dragIndicator} />

          <TouchableOpacity onPress={()=>router.push('/page/usedetail')}>
          <View style={styles.infoBox}>
            <Text style={styles.modalTitle}>수거함 이용방법</Text>
            <Text style={styles.modalInfo}>배터리가 알려주는 안전한 배터리 이용수칙!</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.qrButton} onPress={() => router.push("/page/QR")}>
            <Text style={styles.qrButtonText}>📷 QR 스캔하기</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ✅ 특정 수거함을 선택한 경우 상세 모달 */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedPoint ? (
              <>
                <View style={styles.infoBox}>
                  <Text style={styles.modalTitle}>{selectedPoint.name}</Text>
                  <Text style={styles.modalInfo}>
                    수거량 {selectedPoint.capacity}% · 배터리 {selectedPoint.batteryCount}개 수거 가능
                  </Text>
                </View>

                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkboxText}>QR코드 인식에 문제가 있나요?</Text>
                  <TouchableOpacity style={styles.supportButton}>
                    <Text style={styles.supportButtonText}>고객센터</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.qrButton} onPress={() => router.push("/page/QR")}>
                  <Text style={styles.qrButtonText}>📷 QR 스캔하기</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.errorText}>수거함 정보를 가져올 수 없습니다.</Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Map;
