import { Component } from '@angular/core';
import { BaseComponent } from '../../../common/base.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input'; // nếu bạn dùng <input matInput>
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RoomOrderCardComponent } from '../../Share/room-order-card/room-order-card.component';
import { Room } from '../../../model/room.model';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule , FormsModule, MatSliderModule, MatIconModule , RoomOrderCardComponent, NgxPaginationModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent extends BaseComponent {
  rooms: Room[]  = [
    {
      Id: 'P202',
      Name: 'Superior Room P202',
      Description: 'Phòng Superior hiện đại với thiết kế tinh tế, đầy đủ tiện nghi cao cấp. Không gian thoáng đãng với ánh sáng tự nhiên, tạo cảm giác thư thái và thoải mái cho khách lưu trú.',
      ImageUrl: 'assets/images/room-class/SuperiorRoom/P202/R4_00443.jpg',
      Tags: 'Nghỉ dưỡng, công tác ngắn ngày, Staycation',
      Price: 900000,
      RoomClass: 'SuperiorRoom',
      SubFolder: 'P202',
      Images: ['R4_00443.jpg', 'R4_00456.jpg']
    } as Room,
    {
      Id: 'P302',
      Name: 'Superior Room P302',
      Description: 'Phòng Superior với view đẹp, thiết kế hiện đại và sang trọng. Trang bị đầy đủ tiện nghi cao cấp, mang lại trải nghiệm lưu trú thoải mái và đẳng cấp.',
      ImageUrl: 'assets/images/room-class/SuperiorRoom/P302/R4_00708.jpg',
      Tags: 'Nghỉ dưỡng, công tác ngắn ngày, Staycation',
      Price: 900000,
      RoomClass: 'SuperiorRoom',
      SubFolder: 'P302',
      Images: ['R4_00708.jpg']
    } as Room,
    {
      Id: 'P402',
      Name: 'Superior Room P402',
      Description: 'Phòng Superior cao cấp với không gian rộng rãi và thoáng mát. Thiết kế tinh tế kết hợp với các tiện nghi hiện đại, mang lại sự thoải mái tối đa cho khách hàng.',
      ImageUrl: 'assets/images/room-class/SuperiorRoom/P402/R4_00598.jpg',
      Tags: 'Nghỉ dưỡng, công tác ngắn ngày, Staycation',
      Price: 900000,
      RoomClass: 'SuperiorRoom',
      SubFolder: 'P402',
      Images: ['R4_00598.jpg']
    } as Room,
    {
      Id: 'P301',
      Name: 'Deluxe Room P301',
      Description: 'Phòng Deluxe sang trọng với thiết kế đẳng cấp và view tuyệt đẹp. Không gian rộng rãi, thoải mái với đầy đủ tiện nghi cao cấp, phù hợp cho kỳ nghỉ dưỡng hoàn hảo.',
      ImageUrl: 'assets/images/room-class/DeluxeRoom/P301/R4_00807.jpg',
      Tags: 'Nghỉ dưỡng, công tác ngắn ngày, Staycation',
      Price: 900000,
      RoomClass: 'DeluxeRoom',
      SubFolder: 'P301',
      Images: ['R4_00807.jpg', 'R4_00834.jpg']
    } as Room,
    {
      Id: 'P401',
      Name: 'Deluxe Room P401',
      Description: 'Phòng Deluxe cao cấp với thiết kế sang trọng và tinh tế. Trang bị đầy đủ tiện nghi hiện đại, mang lại trải nghiệm lưu trú đẳng cấp và thoải mái nhất.',
      ImageUrl: 'assets/images/room-class/DeluxeRoom/P401/R4_00544.jpg',
      Tags: 'Nghỉ dưỡng, công tác ngắn ngày, Staycation',
      Price: 900000,
      RoomClass: 'DeluxeRoom',
      SubFolder: 'P401',
      Images: ['R4_00544.jpg']
    } as Room,
    {
      Id: 'P501',
      Name: 'Deluxe Room P501',
      Description: 'Phòng Deluxe tầng cao với view panoramic tuyệt đẹp. Không gian sang trọng, hiện đại với các tiện nghi cao cấp, mang lại trải nghiệm nghỉ dưỡng đẳng cấp.',
      ImageUrl: 'assets/images/room-class/DeluxeRoom/P501/R4_00378.jpg',
      Tags: 'Nghỉ dưỡng, công tác ngắn ngày, Staycation',
      Price: 900000,
      RoomClass: 'DeluxeRoom',
      SubFolder: 'P501',
      Images: ['R4_00378.jpg']
    } as Room,
    {
      Id: 'BlackPink',
      Name: 'E-Class BlackPink Theme',
      Description: 'Phòng E-Class với chủ đề BlackPink độc đáo và sáng tạo. Thiết kế hiện đại, màu sắc nổi bật tạo không gian trẻ trung và năng động, phù hợp cho những ai yêu thích phong cách K-pop.',
      ImageUrl: 'assets/images/room-class/ECLASS/BlackPink/R4_00195.jpg',
      Tags: 'Nghỉ dưỡng, Staycation, Chủ đề đặc biệt',
      Price: 900000,
      RoomClass: 'ECLASS',
      SubFolder: 'BlackPink',
      Images: ['R4_00195.jpg', 'R4_00214.jpg']
    } as Room,
    {
      Id: 'PinkFlower',
      Name: 'E-Class Pink Flower Theme',
      Description: 'Phòng E-Class với chủ đề hoa hồng lãng mạn và nữ tính. Không gian ấm cúng với tông màu hồng pastel, tạo cảm giác thư thái và lãng mạn cho kỳ nghỉ của bạn.',
      ImageUrl: 'assets/images/room-class/ECLASS/PinkFlower/R4_00311.jpg',
      Tags: 'Nghỉ dưỡng, Staycation, Lãng mạn',
      Price: 900000,
      RoomClass: 'ECLASS',
      SubFolder: 'PinkFlower',
      Images: ['R4_00311.jpg']
    } as Room,
    {
      Id: 'PlayBoy',
      Name: 'E-Class PlayBoy Theme',
      Description: 'Phòng E-Class với chủ đề PlayBoy sang trọng và quyến rũ. Thiết kế táo bạo với màu sắc đen trắng chủ đạo, tạo không gian hiện đại và cá tính.',
      ImageUrl: 'assets/images/room-class/ECLASS/PlayBoy/R4_00252.jpg',
      Tags: 'Nghỉ dưỡng, Staycation, Cá tính',
      Price: 900000,
      RoomClass: 'ECLASS',
      SubFolder: 'PlayBoy',
      Images: ['R4_00252.jpg']
    } as Room,
    {
      Id: '50ST',
      Name: 'S-Class 50 Shades Theme',
      Description: 'Phòng S-Class cao cấp nhất với chủ đề 50 Shades of Grey sang trọng và bí ẩn. Thiết kế đẳng cấp với không gian rộng rãi, tiện nghi 5 sao, mang lại trải nghiệm nghỉ dưỡng đỉnh cao.',
      ImageUrl: 'assets/images/room-class/SCLASS/50ST/R4_00014.jpg',
      Tags: 'Nghỉ dưỡng cao cấp, Staycation, Đẳng cấp',
      Price: 900000,
      RoomClass: 'SCLASS',
      SubFolder: '50ST',
      Images: ['R4_00014.jpg', 'R4_00080.jpg', 'R4_00106.jpg', 'R4_00119.jpg']
    } as Room,
  ];


    //sldier
  price = 5400000;
  selectedCategory = '';
  checkOut = null;
  checkIn = null;
  category =  '';
  min = 400000;
  max = 5400000;
  value = 500000; 


  //paging 
  page = 1;

  constructor() {
    super();
  }
}