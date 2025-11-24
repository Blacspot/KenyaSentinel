import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated, Easing, Image } from "react-native";
import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import Slider from "@react-native-assets/slider";
import { Ionicons } from "@expo/vector-icons";

const getInnerRecordButtonStyle = (recording: boolean) => ({
  width: recording ? 40 : 65,
  height: recording ? 40 : 65,
  backgroundColor: recording ? "#ff4444" : "#ff0000",
  borderRadius: recording ? 10 : 35,
});

export default function CameraScreen({ onClose, onSend }: { onClose: () => void; onSend: (uri: string) => void }) {
  const cameraRef = useRef<any>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const MAX_DURATION = 180000;

  const [zoom, setZoom] = useState(0);
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number } | null>(null);
  const focusAnim = useRef(new Animated.Value(1)).current;

  const startTimer = () => {
    progressAnim.setValue(0);

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: MAX_DURATION,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) stopRecording();
    });
  };

  const stopTimer = () => {
    progressAnim.stopAnimation();
  };

  const triggerFocusAnimation = () => {
    focusAnim.setValue(1);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(() => setFocusPoint(null));
  };

  const toggleCameraFacing = () => {
    setCameraFacing(prev => prev === "back" ? "front" : "back");
  };



  const onCameraPress = (event: any) => {
    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;

    setFocusPoint({ x, y });
    triggerFocusAnimation();
  };
    


  useEffect(() => {
    if (!cameraPermission?.granted) requestCameraPermission();
    if (!microphonePermission?.granted) requestMicrophonePermission();
  }, [cameraPermission?.granted, microphonePermission?.granted, requestCameraPermission, requestMicrophonePermission]);
  if (!cameraPermission || !microphonePermission) return <View/>;
  if (!cameraPermission.granted || !microphonePermission.granted) {
    return (
        <View style={styles.center}>
           <Text style={{marginBottom: 10}}>Camera & microphone access is required</Text>
           <TouchableOpacity
            onPress={() => {
            requestCameraPermission();
             requestMicrophonePermission();
            }} 
            style={styles.button}>
            <Text style={styles.buttonText}>Grant Permission</Text>

           </TouchableOpacity>
        </View>
    );
  }
 const startRecording = async () => {
  if (!cameraRef.current) return;

  try {
    setIsRecording(true);
    startTimer();

    const video = await cameraRef.current.recordAsync({
      maxDuration: 180,
      quality: "1080p",
    });

    stopTimer();
    setIsRecording(false);

    setRecordedUri(video.uri);

  } catch (e) {
    console.log(e);
    setIsRecording(false);
    stopTimer();
  }
};

  const stopRecording = async () => {
    if (!cameraRef.current) return;

    try {
      cameraRef.current.stopRecording();
      setIsRecording(false);
      stopTimer();
    } catch (e) {
      console.log(e);
    }
  };

  
  return(
    <View style={styles.container}>
        {!recordedUri ? (
        <>
          <CameraView
            ref={cameraRef}
            facing={cameraFacing}
            style={StyleSheet.absoluteFill}
            zoom={zoom}
          />
          <TouchableOpacity
            style={[StyleSheet.absoluteFill, { bottom: 150 }]}
            onPress={onCameraPress}
            activeOpacity={1}
          />
        </>
      ) : (
        <Image source={{ uri: recordedUri }} style={styles.preview} />
      )}
       {focusPoint && (
        <Animated.View
          style={[
            styles.focusBox,
            {
              left: focusPoint.x - 40,
              top: focusPoint.y - 40,
              opacity: focusAnim,
              transform: [{ scale: focusAnim }],
            },
          ]}
        />
      )}

       <View style={styles.zoomContainer}>
        <Slider
          style={{ width: 80 }}
          minimumValue={0}
          maximumValue={1}
          value={zoom}
          onValueChange={setZoom}
        />
      </View>

        <View style={styles.controls}>
        <TouchableOpacity onPress={onClose} style={styles.iconButton}>
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleCameraFacing} style={styles.iconButton2}>
          <Ionicons name="camera-reverse" size={32} color="#fff" />
        </TouchableOpacity>

        {/* Record Button */}
        <TouchableOpacity
          disabled={recordedUri !== null}
          onPress={isRecording ? stopRecording : startRecording}
          style={styles.recordButtonContainer}
        >
          {/* Circular Progress Timer */}
          {isRecording && (
            <Animated.View
              style={[
                styles.circularProgress,
                {
                  transform: [{
                    rotate: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    })
                  }],
                  opacity: progressAnim.interpolate({
                    inputRange: [0, 0.1, 0.9, 1],
                    outputRange: [0.8, 1, 1, 0.8],
                  }),
                },
              ]}
            />
          )}
          <View style={getInnerRecordButtonStyle(isRecording)} />
        </TouchableOpacity>

        {/* Send Button */}
        {recordedUri ? (
          <TouchableOpacity
            onPress={() => onSend(recordedUri)}
            style={styles.iconButton}
          >
            <Ionicons name="send" size={32} color="#4CAF50" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    center: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
    controls: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    alignItems: "center",
  },
    recordButton: {
        padding: 10,
    },
     recordButtonContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    left: -45,
  },

  circularProgress: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 6,
    borderColor: "rgba(255,0,0,0.5)",
  },

  zoomContainer: {
    position: "absolute",
    right: 20,
    top: "60%",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },

  preview: {
    flex: 1,
    resizeMode: "cover",
  },

  focusBox: {
    position: "absolute",
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "#ffe400",
    borderRadius: 8,
  },

  iconButton: {
    padding: 6,
    top: -670,
    left: 320,
  },
  iconButton2: {
    padding: 6,
    top: -5,
    left: 190,
  },

    recording: {
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderRadius: 100,
    },
    closeBtn: {
        position: "absolute",
        top: -620,
        right: 20,
    },
    flipBtn: {
    position: "absolute",
    top: -5,
    left: 45,
  },
});