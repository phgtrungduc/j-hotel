import { Component, Input } from '@angular/core';
import { Room } from '../../../model/room.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AmenityItemComponent } from '../amenity-item/amenity-item.component';
import { VndCurrencyPipe } from '../../../common/pipes/vnd-currency.pipe';

/**
 * Bảng giá: nghỉ giờ (2 giờ đầu), nghỉ đêm (22:00–12:00), chưa VAT 10%.
 * BasicRoom / PremiumRoom / VIP / ECLASS khớp hạng phòng trong store & thư mục ảnh.
 */
const HOURLY_AND_OVERNIGHT_BY_CLASS: Record<string, { hourly: number; overnight: number }> = {
  BasicRoom: { hourly: 500_000, overnight: 900_000 },
  PremiumRoom: { hourly: 600_000, overnight: 1_000_000 },
  VIP: { hourly: 900_000, overnight: 1_500_000 },
  ECLASS: { hourly: 600_000, overnight: 1_100_000 },
};

const DEFAULT_RATES = HOURLY_AND_OVERNIGHT_BY_CLASS['BasicRoom'];

function resolveHourlyOvernight (roomClass: string | undefined): { hourly: number; overnight: number } {
  if (!roomClass) {
    return DEFAULT_RATES;
  }

  const found = HOURLY_AND_OVERNIGHT_BY_CLASS[roomClass];

  return found ?? DEFAULT_RATES;
}

@Component({
  selector: 'room-order-card',
  imports: [CommonModule, RouterModule, AmenityItemComponent, VndCurrencyPipe],
  templateUrl: './room-order-card.component.html',
  styleUrl: './room-order-card.component.scss',
})
export class RoomOrderCardComponent {
  @Input() currentRoom: Room = {} as Room;

  get hourlyPrice (): number {
    return resolveHourlyOvernight(this.currentRoom.RoomClass).hourly;
  }

  get overnightPrice (): number {
    return resolveHourlyOvernight(this.currentRoom.RoomClass).overnight;
  }
}
