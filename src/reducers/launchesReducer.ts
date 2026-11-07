import type { Launch } from "../types/Launch";

type State = {
  launches: Launch[];
  loading: boolean;
  error: string;
  selectedLaunch: Launch | null;
};

type Action =
  | { type: "launches_loaded"; payload: Launch[] }
  | { type: "request_failed"; payload: string }
  | { type: "launch_selected"; payload: Launch }
  | { type: "modal_closed" };

export const initialState: State = {
  launches: [],
  loading: true,
  error: "",
  selectedLaunch: null,
};

export const launchesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "launches_loaded":
      return {
        ...state,
        launches: action.payload,
        loading: false,
        error: "",
      };

    case "request_failed":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "launch_selected":
      return {
        ...state,
        selectedLaunch: action.payload,
      };

    case "modal_closed":
      return {
        ...state,
        selectedLaunch: null,
      };

    default:
      return state;
  }
};
