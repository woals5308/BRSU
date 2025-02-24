import React, { useState } from "react";
import {
  StyleSheet,
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
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  mapContainer: { flex: 1 },

  map: { width: "100%", height: "100%" },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
    elevation: 5,
  },

  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#CCC",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },

  infoBox: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  modalInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  qrButton: {
    backgroundColor: "#0A9A5A",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  qrButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9F9F9",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  checkboxText: {
    fontSize: 14,
    color: "#666",
  },

  supportButton: {
    backgroundColor: "#0A9A5A",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  supportButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
