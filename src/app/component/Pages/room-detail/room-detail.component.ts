import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map, switchMap } from 'rxjs/operators';
import { takeUntil } from 'rxjs';
import { AmenityItemComponent } from '../../Share/amenity-item/amenity-item.component';
import { OtherRoomCardComponent } from '../../Share/other-room-card/other-room-card.component';
import { BookingHelpers } from '../../../helper/bookingHelper';
import { Room } from '../../../model/room.model';
import { BaseComponent } from '../../../common/base.component';
import { getOtherRooms, getRoomById } from '../../../store/app-state';

@Component({
  selector: 'room-detail',
  imports: [CommonModule, RouterModule, AmenityItemComponent, OtherRoomCardComponent],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.scss'
})
export class RoomDetailComponent extends BaseComponent implements OnInit {
  roomId: string | null = null;
  currentRoom: Room | null = null;
  roomImages: string[] = [];
  otherRooms: Room[] = [];

  isGalleryOpen: boolean = false;
  currentImageIndex: number = 0;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit (): void {
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => !!id),
      switchMap((id) => {
        this.roomId = id;
        return this.store.select(getRoomById(id));
      }),
      takeUntil(this.destroy$)
    )
      .subscribe((room) => {
        this.currentRoom = room ?? null;
        this.setGalleryFromRoom(room ?? null);
      });

    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => !!id),
      switchMap((id) => this.store.select(getOtherRooms(id, 3))),
      takeUntil(this.destroy$)
    )
      .subscribe((rooms) => {
        this.otherRooms = rooms;
      });
  }

  private setGalleryFromRoom (room: Room | null): void {
    this.roomImages = [];

    if (!room?.Images || !room.RoomClass || !room.SubFolder) {
      return;
    }

    this.roomImages = room.Images.map(
      (img) =>
        `assets/images/room-class/${room.RoomClass}/${room.SubFolder}/${img}`
    );
  }

  formatPriceLabel (price?: number): string {
    if (price == null) {
      return '';
    }

    return `${price.toLocaleString('vi-VN')} VNĐ/đêm`;
  }

  onNavigateToRoom (roomId: string): void {
    this.router
      .navigate(['/room', roomId])
      .then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  onBookRoom (): void {
    BookingHelpers.openFacebookBooking();
  }

  onOtherRoomBook (): void {
    BookingHelpers.openFacebookBooking();
  }

  openGallery (index: number): void {
    this.currentImageIndex = index;
    this.isGalleryOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeGallery (): void {
    this.isGalleryOpen = false;
    document.body.style.overflow = 'auto';
  }

  nextImage (): void {
    if (this.roomImages.length === 0) {
      return;
    }

    this.currentImageIndex = (this.currentImageIndex + 1) % this.roomImages.length;
  }

  previousImage (): void {
    if (this.roomImages.length === 0) {
      return;
    }

    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.roomImages.length) % this.roomImages.length;
  }

  goToImage (index: number): void {
    this.currentImageIndex = index;
  }
}
