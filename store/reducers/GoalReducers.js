import { ADD_GOAL, DELETE_GOAL, SET_STATUS } from "../actions/GoalActions";

const intialState = {
  goals: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case ADD_GOAL:
      const goal = {
        id: Math.random(),
        goal: action.goal,
        category: action.category,
        TaskComplete: false,
      };
      return { ...state.goals, goals: state.goals.concat(goal) };

    case SET_STATUS:
      let index = state.goals.findIndex(
        (item) => item.id.toString() == action.id.toString()
      );
      let newArray = [...state.goals];

      newArray[index] = { ...newArray[index], TaskComplete: action.status };

      console.log(newArray);
      return { ...state.goals, goals: newArray };

    case DELETE_GOAL:
      let updatedGoal = state.goals.filter((data) => data.id.toString() !== action.id.toString());
       console.log("...........Delete call")
      console.log(updatedGoal);
      return {  goals: updatedGoal };
    default:
      return state;
  }
};
