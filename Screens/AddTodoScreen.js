import React, { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import ButtonCom from "../Components/helpingComponents/ButtonCom";
import InputCom from "../Components/helpingComponents/InputCom";
import { useDispatch } from "react-redux";
import * as Actions from "../store/actions/GoalActions";

const AddTodoScreen = (props) => {
  const [goal, setgoal] = useState("");
  const [category, setcategory] = useState("Other");

  const dispatch = useDispatch();

  const addGoalHandler = () => {
    if (goal == "") {
      Alert.alert("Empty Fields", "Please enter your goal", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      return;
    }

    dispatch(Actions.addGoal(goal, category));
    props.navigation.navigate("todoListScreen");
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Text style={styles.titleText}> Add Goals</Text>
      </View>

      <View style={styles.inputContainer}>
        <InputCom
          title="Goal"
          borderBottom
          icon="text-box-check-outline"
          titleStyle={{ fontSize: 18 }}
          placeholder="Enter your Goals"
          value={goal}
          onChangeText={(text) => setgoal(text)}
        />

        <InputCom
          title="Category"
          borderBottom
          icon="format-list-bulleted-type"
          titleStyle={{ fontSize: 18 }}
          placeholder="Enter your category"
          onChangeText={(text) => {
            setcategory(text);
          }}
          value={category}
        />

        <ButtonCom
          activeOpacity={0.8}
          center
          color="green"
          padding={15}
          round
          outerStyle={{ marginTop: 15 }}
          onPress={() => {
            addGoalHandler();
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>Done</Text>
        </ButtonCom>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 36,
    fontWeight: "700",
    color: "green",
  },
  inputContainer: {
    marginVertical: 20,
  },
});

export default AddTodoScreen;
