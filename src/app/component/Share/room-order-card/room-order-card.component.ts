import { Component, Input } from '@angular/core';
import { Room } from '../../../model/room.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AmenityItemComponent } from '../amenity-item/amenity-item.component';
import { VndCurrencyPipe } from '../../../common/pipes/vnd-currency.pipe';
@Component({
  selector: 'room-order-card',
  imports: [CommonModule, RouterModule, AmenityItemComponent, VndCurrencyPipe],
  templateUrl: './room-order-card.component.html',
  styleUrl: './room-order-card.component.scss',
})
export class RoomOrderCardComponent {
  @Input() currentRoom: Room = {} as Room;
}
