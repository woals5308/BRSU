import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
} from "react-native";
import MapView, { Marker} from "react-native-maps"; // 지도 
import styles from "../style/mapstyles";
import useFetchLocationAndData from "../hook/userFetchLocationAndData";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";


const Map = () => {
  const [search, setSearch] = useState(""); // 검색어 상태
  const {currentLocation ,collectionPoints} = useFetchLocationAndData();   //현재 위치랑 그 수거함 위치포인트 
  const [selectedPoint, setSelectedPoint] = useState(null); // 선택한 수거함 정보
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태
  const mapRef = React.useRef(null); // MapView 참조를 위한 ref
  const [qrScanned, setQrScanned] = useState(false);  //qr 여부

  const handleMarkerPress = (point) => {
    setSelectedPoint(point);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPoint(null);
  };

  const handleSearch = () => {
    const point = collectionPoints.find((p) => p.name === search);
    if (point) {
      mapRef.current.animateToRegion(
        {
          latitude: point.latitude,
          longitude: point.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    } else {
      Alert.alert("수거함을 찾을 수 없습니다.");
    }
  };

  // const getBoxStatus = (used) => {
  //   if (used <= 50) {
  //     return {
  //       color: "green",
  //       status: "사용 가능",
  //       image: require("../../assets/icons/littlebattery.png"),
  //     };
  //   } else if (used <= 80) {
  //     return {
  //       color: "yellow",
  //       status: "사용 가능(혼잡)",
  //       image: require("../../assets/icons/middlebattery.png"),
  //     };
  //   } else {
  //     return {
  //       color: "red",
  //       status: "사용 불가",
  //       image: require("../../assets/icons/pullbattery.png"),
  //     };
  //   }
  // };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="수거함 번호 입력 : ex) 수거함1"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>수거함 찾기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        {currentLocation && (
          <MapView
            ref={mapRef}
            style={styles.map}
            region={currentLocation}
            showsUserLocation
          >
            {collectionPoints.map((point, index) => {
              const { image } = getBoxStatus(point.used);
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  title={point.name}
                  image={image} // Set the custom marker image here
                  onPress={() => handleMarkerPress(point)}
                />
              );
            })}
          </MapView>
        )}
      </View>
   {/* ✅ 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedPoint && (
              <>
                <Text style={styles.modalTitle}>{selectedPoint.name}</Text>
                <Text style={styles.modalInfo}>
                  수거량 {selectedPoint.capacity}% · 배터리 {selectedPoint.batteryCount}개 수거 가능
                </Text>
              </>
            )}

            {/* QR 코드 문제 체크 박스 */}
            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxText}>QR코드 인식에 문제가 있나요?</Text>
              <TouchableOpacity style={styles.supportButton}>
                <Text style={styles.supportButtonText}>고객센터</Text>
              </TouchableOpacity>
            </View>

            {/* QR 스캔 버튼 */}
            <TouchableOpacity style={styles.scanButton} onPress={() => setModalVisible(false)}>
              <TouchableOpacity style={styles.scanButtonText} onPress={()=>router.push('/page/QR')}>QR 스캔하기</TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default Map;
