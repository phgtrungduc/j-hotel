import { ActionReducerMap } from "@ngrx/store";
import { AppStates} from "../app-state";
import { sessionReducer } from "./session.reducer";
import { initialSessionState } from "../state/session.state";
import { userReducer } from "./user.reducer";
import { initialUserState } from "../state/user.state";
import { roomReducer } from "./room.reducer";
import { initialRoomState } from "../state/room.state";

export const reducers: ActionReducerMap<AppStates> = {
  session: sessionReducer,
  user: userReducer,
  room: roomReducer,
}

export const initialState = {
  session: initialSessionState,
  user: initialUserState,
  room: initialRoomState,
}
