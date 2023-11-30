import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export const Card = ({ title, setSchedule }) => {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date());
  const [text, setText] = useState("Horário (Selecione)");
  const [removable, setRemovable] = useState(false);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const onChange = (event, selectedTime) => {
    setShow(Platform.OS === "ios");
    const currentDate = selectedTime || time;
    setTime(currentDate);
    
    const formattedTime = formatTime(currentDate);
    setText(formattedTime);
    setSchedule(formattedTime);
    setRemovable(true);
  };

  const handleRemoval = () => {
    setText("Horário (Selecione)");
    setSchedule(undefined);
    setRemovable(false);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.actionsContainer}>
        {removable && (
          <TouchableOpacity onPress={handleRemoval}>
            <FontAwesome name="trash-o" size={24} color="#FF5555" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          display="default"
          testID="dateTimePicker"
          value={time}
          is24Hour={true}
          mode="time"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = {
  cardContainer: {
    backgroundColor: "#282A36",
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    color: "#fff",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  buttonContainer: {
    height: 50,
    width: 150,
    backgroundColor: "#FFB86C",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
  },
};
