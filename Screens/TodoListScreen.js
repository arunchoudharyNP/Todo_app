import React, { useLayoutEffect, useState, useEffect } from "react";
import { Text, View, StyleSheet, Switch, TouchableOpacity } from "react-native";
import ButtonCom from "../Components/helpingComponents/ButtonCom";
import { useSelector } from "react-redux";
import GoalListCom from "../Components/GoalListCom";
import InputCom from "../Components/helpingComponents/InputCom";
import { MaterialIcons } from "@expo/vector-icons";

const TodoListScreen = (props) => {
  const goals = useSelector((state) => state.goalReducers.goals);

  const [isFilterEnabled, setisFilterEnabled] = useState(false);
  const [isCompleted, setisCompleted] = useState(false);
  const [filterGoals, setfilterGoals] = useState([]);
  console.log(goals);
  const [category, setcategory] = useState("");
  console.log(filterGoals);

  const toggleFilter = () => {
    console.log("ok");
    setisFilterEnabled((prevState) => !prevState);
  };

  const toggleCompleted = () => {
    setisCompleted((prevState) => !prevState);
  };

  const filter = () => {
    let updatedGoals;

    if (category == "") {
      updatedGoals = goals.filter((data) => data.TaskComplete == isCompleted);
      setfilterGoals(updatedGoals);
      return;
    }

    updatedGoals = goals.filter(
      (data) =>
        data.category.toLowerCase() == category.toLowerCase() &&
        data.TaskComplete == isCompleted
    );
    console.log("updated goals");
    console.log(updatedGoals);
    console.log("..........");

    setfilterGoals(updatedGoals);
  };

  useEffect(() => {
    setfilterGoals(goals);
  }, [isFilterEnabled]);

  useEffect(() => {
    setfilterGoals(goals);
  }, [goals]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ marginRight: 10 }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isFilterEnabled ? "green" : "red"}
              onValueChange={() => toggleFilter()}
              value={isFilterEnabled}
            />
            <Text style={{ color: "white" }}>
              {isFilterEnabled ? "Remove Filter" : "Filter"}
            </Text>
          </View>
        );
      },
    });
  }, [isFilterEnabled]);

  if (goals.length > 0) {
    return (
      <View style={{ flex: 1 }}>
        {isFilterEnabled && (
          <View style={styles.filterContainer}>
            <InputCom
              design={styles.inputDesign}
              icon="text-search"
              iconStyle={{ top: 8 }}
              placeholder="Enter your goal category"
              onChangeText={(text) => {
                setcategory(text);
              }}
              value={category}
            />
            <View style={{ alignSelf: "center" }}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isCompleted ? "green" : "red"}
                onValueChange={() => toggleCompleted()}
                value={isCompleted}
              />
              <Text style={{ fontSize: 10, color: "white" }}>
                {" "}
                {isCompleted ? "Completed" : "Pending"}
              </Text>
            </View>

            <TouchableOpacity
              style={{ position: "absolute", right: 80, top: 30 }}
              onPress={() => {
                filter();
              }}
            >
              <MaterialIcons name="search" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}

        <GoalListCom data={filterGoals} />
        <ButtonCom
          center
          padding={10}
          round
          color="green"
          outerStyle={{ marginVertical: 20 }}
          onPress={() => {
            props.navigation.navigate("addTodoScreen");
          }}
        >
          <Text style={{ color: "white", fontSize: 24 }}>Add Goals</Text>
        </ButtonCom>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>No goals added yet. Click add button to add goals</Text>
      <ButtonCom
        center
        padding={10}
        round
        color="green"
        outerStyle={{ marginVertical: 20 }}
        onPress={() => {
          props.navigation.navigate("addTodoScreen");
        }}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Add Goals</Text>
      </ButtonCom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    flexDirection: "row",
    height: 80,
    width: "100%",
    backgroundColor: "#04665B",
  },
  inputDesign: {
    backgroundColor: "white",
    borderRadius: 20,
    margin: 5,
  },
});

export default TodoListScreen;
