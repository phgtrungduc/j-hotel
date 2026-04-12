import { Room } from '../../model/room.model';
import { createInitialHotelRooms } from '../data/hotel-rooms.seed';

export interface RoomState {
  rooms: Room[];
  isLoading: boolean;
}

export const initialRoomState: RoomState = {
  rooms: createInitialHotelRooms(),
  isLoading: false,
};
