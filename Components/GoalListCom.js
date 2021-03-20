import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useDispatch } from "react-redux";
import * as Actions from "../store/actions/GoalActions";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const GoalListCom = (props) => {
  const data = props.data;

  const dispatch = useDispatch();

  const setSelection = (id) => {
    dispatch(Actions.setTaskStatus(id, true));
  };

  const deleteCall = (id) => {
    dispatch(Actions.deleteItem(id));
  };

  const deleteHandler = (id) => {
    Alert.alert("Please Confirm", "Are you sure to delete this goal?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => deleteCall(id) },
    ]);
  };

  const card = (item) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardText}>
          <Text style={styles.textStyle}>Goal: {item.goal}</Text>
          <Text style={styles.textStyle}>Category: {item.category}</Text>
        </View>
        <View style={{ width: "30%" }}>
          <Text> {item.TaskComplete ? "Completed" : "Pending"}</Text>

          <FontAwesome
            style={{ padding: 5 }}
            name="check-square-o"
            size={24}
            color={item.TaskComplete == false ? "grey" : "green"}
            onPress={() => {
              setSelection(item.id);
            }}
          />
          <TouchableOpacity onPress={() => deleteHandler(item.id)}>
            <MaterialIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => card(item)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 8,
  },
  butonContainer: {
    flex: 1,
    backgroundColor: "#04665B",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterContainer: {
    marginRight: 10,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#D9DFDE",
    borderWidth: 1,
    borderColor: "#9B9F9E",
    padding: 10,
  },
  cardText: {
    width: "70%",
  },
  textStyle: {
    padding: 10,
  },
});

export default GoalListCom;
