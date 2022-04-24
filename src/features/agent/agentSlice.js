import { createSlice } from "@reduxjs/toolkit";

const agentInitialState = {
  addAgent: {
    agentData: {},
    agentAddress: {},
    agentLogo: {},
  },
};

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
  },
});

export const { setAgentData, setAgentAddress, setAgentLogo } =
  agentSlice.actions;

export default agentSlice.reducer;
