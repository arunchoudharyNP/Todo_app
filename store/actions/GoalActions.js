export const ADD_GOAL = "ADD_GOAL";
export const SET_STATUS = "SET_STATUS";
export const DELETE_GOAL ="DELETE_GOAL";

export const addGoal = (goal, category) => {
  console.log("Action Dispatched");
  return { type: ADD_GOAL, goal, category };
};


export const setTaskStatus =(id,status)=>{

    console.log("ID" + id.toString())
    return {type: SET_STATUS,id,status}
}

export const deleteItem =(id)=>{

  return {type:DELETE_GOAL,id}
}
