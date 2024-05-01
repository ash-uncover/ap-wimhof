import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ROUND_DEFAULT,
  ROUNDS_LONG,
  ROUNDS_MEDIUM,
  ROUNDS_SHORT,
  SessionPreset,
  SessionRound,
  SessionState,
} from "./session.state";

// STATE //

const AP_WIMHOF = "ap-wimhof-session";
const USE_LOCAL_STORAGE = false;

if (!USE_LOCAL_STORAGE) {
  localStorage.removeItem(AP_WIMHOF);
}

const store = (state: SessionState) => {
  localStorage.setItem(AP_WIMHOF, JSON.stringify(state));
};

const load = () => {
  return JSON.parse(localStorage.getItem(AP_WIMHOF) || "{}");
};

const storedState = USE_LOCAL_STORAGE ? load() : {};

const initialState: SessionState = {
  preset: "SHORT",
  rounds: ROUNDS_SHORT,
  date: "NOW",
  ...storedState,
};

// REDUCERS //

const setPreset: CaseReducer<SessionState, PayloadAction<SessionPreset>> = (
  state,
  action
) => {
  const preset = action.payload;
  state.preset = preset;
  switch (preset) {
    case "SHORT": {
      state.rounds = ROUNDS_SHORT;
      break;
    }
    case "MEDIUM": {
      state.rounds = ROUNDS_MEDIUM;
      break;
    }
    case "LONG": {
      state.rounds = ROUNDS_LONG;
      break;
    }
  }
  store(state);
};

interface updateRoundPayload {
  index: number;
  round: SessionRound;
}
const updateRound: CaseReducer<
  SessionState,
  PayloadAction<updateRoundPayload>
> = (state, action) => {
  const { index, round } = action.payload;
  state.rounds[index] = round;
  state.preset = "CUSTOM";
  store(state);
};

const setRoundNumber: CaseReducer<SessionState, PayloadAction<number>> = (
  state,
  action
) => {
  const number = action.payload;
  if (state.rounds.length < number) {
    const rounds = [];
    for (let i = 0; i < number - state.rounds.length; i++) {
      rounds.push(ROUND_DEFAULT);
    }
    state.rounds = [...state.rounds, ...rounds];
    state.preset = "CUSTOM";
  } else if (state.rounds.length > number) {
    const rounds = state.rounds.filter((round, index) => index < number);
    state.rounds = [...rounds];
    state.preset = "CUSTOM";
  }
  store(state);
};

const deleteRound: CaseReducer<SessionState, PayloadAction<number>> = (
  state,
  action
) => {
  const index = action.payload;
  const rounds = state.rounds.slice();
  rounds.splice(index, 1);
  state.rounds = rounds;
  state.preset = "CUSTOM";
  store(state);
};

// SLICE //

export const SessionSlice = createSlice({
  name: "session",
  initialState,

  reducers: {
    setPreset,
    updateRound,
    setRoundNumber,
    deleteRound,
  },
});
