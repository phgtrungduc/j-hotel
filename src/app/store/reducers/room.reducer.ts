import { Action } from '@ngrx/store';
import { initialRoomState, RoomState } from '../state/room.state';

export function roomReducer (
  state: RoomState | undefined,
  _action: Action,
): RoomState {
  return state ?? initialRoomState;
}
