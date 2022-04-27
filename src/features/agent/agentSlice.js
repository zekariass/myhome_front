// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";

const agentInitialState = {
  addAgent: {
    agentData: {},
    agentAddress: {},
    agentLogo: {},
  },
};

export const createAgent = createAsyncThunk(
  "agent/createAgent",
  async (_, thunkAPI) => {
    // console.log("thunkAPI: ", thunkAPI.getState().agent);
    const { addAgent } = thunkAPI.getState().agent;
    const result = await myHomeBackendAPI.post("/agent/create/", addAgent);
  }
);

const agentSlice = createSlice({
  name: "agent",
  initialState: agentInitialState,
  reducers: {
    setAgentData: (state, action) => {
      state.addAgent.agentData = action.payload;
    },
    setAgentAddress: (state, action) => {
      state.addAgent.agentAddress = action.payload;
    },
    setAgentLogo: (state, action) => {
      state.addAgent.agentLogo = action.payload;
    },
    //Create Agent
  },
});

export const { setAgentData, setAgentAddress, setAgentLogo } =
  agentSlice.actions;

export default agentSlice.reducer;
