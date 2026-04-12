import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../common/base.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RoomOrderCardComponent } from '../../Share/room-order-card/room-order-card.component';
import { Room } from '../../../model/room.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { takeUntil } from 'rxjs';
import { getAllRooms } from '../../../store/app-state';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule , FormsModule, MatSliderModule, MatIconModule , RoomOrderCardComponent, NgxPaginationModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent extends BaseComponent implements OnInit {
  rooms: Room[] = [];

  price = 5400000;
  selectedCategory = '';
  checkOut = null;
  checkIn = null;
  category =  '';
  min = 400000;
  max = 5400000;
  value = 500000;

  page = 1;

  constructor() {
    super();
  }

  ngOnInit (): void {
    this.store
      .select(getAllRooms)
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => {
        this.rooms = list;
      });
  }
}
