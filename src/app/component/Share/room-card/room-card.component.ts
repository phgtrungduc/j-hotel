import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../common/base.component';
import { Room } from '../../../model/room.model';

@Component({
  selector: 'room-card',
  imports: [],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss'
})
export class RoomCardComponent extends BaseComponent{
  @Input() currentRoom : Room = {} as Room;
  constructor(
  ){
    super();
  }
}
