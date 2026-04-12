import { createSelector } from "@ngrx/store";
import { SessionState } from "./state/session.state";
import { UserState } from "./state/user.state";
import { RoomState } from "./state/room.state";

export interface AppStates {
  session: SessionState;
  user : UserState;
  room: RoomState;
}

export const getSession = (state: AppStates) => state.session;
export const getBearerToken = createSelector(getSession, session => session.BearerToken);

export const getCurrentUser = (state: AppStates) => state.user;

export const getRoomState = (state: AppStates) => state.room;
export const getAllRooms = createSelector(getRoomState, (room) => room.rooms);
export const getRoomsLoading = createSelector(getRoomState, (room) => room.isLoading);

export const getRoomById = (roomId: string) => createSelector(
  getAllRooms,
  (rooms) => rooms.find((room) => room.Id === roomId)
);

export const getRoomsByRoomClass = (roomClass: string) => createSelector(
  getAllRooms,
  (rooms) => rooms.filter((room) => room.RoomClass === roomClass)
);

export const getOtherRooms = (currentRoomId: string, limit: number = 3) => createSelector(
  getAllRooms,
  (rooms) => rooms.filter((room) => room.Id !== currentRoomId).slice(0, limit)
);
