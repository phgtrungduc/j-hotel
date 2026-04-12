import { Component } from '@angular/core';
import { BaseComponent } from '../../../common/base.component';
import { CommonModule } from '@angular/common';
import { MemberSectionComponent } from '../../Share/member-section/member-section.component';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { getAllRooms } from '../../../store/app-state';
import { Room } from '../../../model/room.model';

interface Amenity {
  id: string;
  title: string;
  description: string;
  image: string;
  locations: {
    name: string;
    address: string;
    image: string;
  }[];
}

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, MemberSectionComponent],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent extends BaseComponent {
  activeTab: string = 'all';

  amenities: Record<string, Amenity> = {};

  constructor (private router: Router) {
    super();

    this.store
      .select(getAllRooms)
      .pipe(first())
      .subscribe((rooms) => {
        this.amenities = this.buildAmenitiesFromRooms(rooms);
      });
  }

  private buildAmenitiesFromRooms (rooms: Room[]): Record<string, Amenity> {
    const basic = rooms.filter((r) => r.RoomClass === 'BasicRoom');
    const premium = rooms.filter((r) => r.RoomClass === 'PremiumRoom');
    const eclass = rooms.filter((r) => r.RoomClass === 'ECLASS');

    const heroImage = (list: Room[]) =>
      list[0]?.ImageUrl ?? 'assets/images/default-room.png';

    const toLocations = (list: Room[]) =>
      list.map((r) => ({
        name: r.Name,
        address: r.SubFolder ?? '',
        image: r.ImageUrl ?? '',
      }));

    return {
      BasicRoom: {
        id: 'BasicRoom',
        title: 'Cơ bản',
        description:
          'Hạng Cơ bản: không gian thoải mái, đầy đủ tiện nghi cho lưu trú ngắn hoặc dài ngày.',
        image: heroImage(basic),
        locations: toLocations(basic),
      },
      PremiumRoom: {
        id: 'PremiumRoom',
        title: 'Premium',
        description:
          'Hạng Premium: thiết kế và tiện nghi cao cấp hơn, phù hợp staycation và công tác.',
        image: heroImage(premium),
        locations: toLocations(premium),
      },
      ECLASS: {
        id: 'ECLASS',
        title: 'Chủ đề',
        description:
          'Các phòng chủ đề độc đáo (ECLASS), mỗi căn một câu chuyện riêng.',
        image: heroImage(eclass),
        locations: toLocations(eclass),
      },
    };
  }

  changeTab (tabId: string): void {
    this.activeTab = tabId;
  }

  navigateToOrder (): void {
    this.router.navigate(['/order']);
  }

  get visibleRoomTypes (): Amenity[] {
    if (this.activeTab === 'all') {
      return Object.values(this.amenities);
    }

    const selected = this.amenities[this.activeTab];

    return selected ? [selected] : [];
  }
}
