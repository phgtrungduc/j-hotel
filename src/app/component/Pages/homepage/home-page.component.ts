import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../common/base.component';
import { HttpClient } from '@angular/common/http';
import { LoginApiService } from '../../../core/api-services/login-api.service';
import { LoggerService } from '../../../common/service/logger.service';
import { Router } from '@angular/router';
import { Footer } from '../../Common/footer/footer.component';
import { Header } from '../../Common/header/header.component';
import { RoomCardComponent } from '../../Share/room-card/room-card.component';
import { MemberSectionComponent } from '../../Share/member-section/member-section.component';
import { Room } from '../../../model/room.model';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { takeUntil } from 'rxjs';
import { getAllRooms } from '../../../store/app-state';

interface RoomClassTab {
  id: string;
  name: string;
  description?: string;
  rooms: { name: string; imageUrl: string }[];
}

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [Footer, Header, RoomCardComponent, MemberSectionComponent, CommonModule, NgxPaginationModule
  ]
})
export class HomePage extends BaseComponent implements OnInit {

  roomClasses: RoomClassTab[] = [
    { id: 'all', name: 'Tất cả các phòng', rooms: [] },
  ];

  activeRoomClass = 'all';

  roomList: Room[] = [
    {
      Id: 'R001',
      Name: 'J Hotel Nguyễn Du',
      Description: 'Giữa lòng Quận 1 sôi động, J Hotel Nguyễn Du mang đến không gian tĩnh lặng và thanh bình hiếm có. Ánh sáng tự nhiên, cây xanh và thiết kế tối giản ấm cúng tạo không gian lý tưởng để làm việc, thư giãn với các tiện ích như khu coworking, bếp chung, phòng giặt và khu vườn nhỏ trên sân thượng.',
      ImageUrl: 'assets/images/room-card/1.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
    {
      Id: 'R002',
      Name: 'Express By J Hotel 46 Thảo Điền',
      Description: 'Điểm dừng chân hiện đại giữa lòng Thảo Điền nhộn nhịp. Express by J Hotel mang đến không gian lưu trú gọn gàng và tiện nghi cùng khu coworking, phòng gym, quầy bar, bếp chung và khu giặt sấy – lý tưởng cho những chuyến công tác hoặc nghỉ ngơi.',
      ImageUrl: 'assets/images/room-card/2.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
    {
      Id: 'R003',
      Name: 'J Hotel Premier Thi Sách',
      Description: 'Bước vào hành trình du hành Á Đông độc đáo giữa nhịp sống đậm bản sắc tại Phố Nhật, Quận 1. Đến và tận hưởng J Hotel Premier Thi Sách ngay hôm nay',
      ImageUrl: 'assets/images/room-card/3.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
    {
      Id: 'R001',
      Name: 'J Hotel Nguyễn Du',
      Description: 'Giữa lòng Quận 1 sôi động, J Hotel Nguyễn Du mang đến không gian tĩnh lặng và thanh bình hiếm có. Ánh sáng tự nhiên, cây xanh và thiết kế tối giản ấm cúng tạo không gian lý tưởng để làm việc, thư giãn với các tiện ích như khu coworking, bếp chung, phòng giặt và khu vườn nhỏ trên sân thượng.',
      ImageUrl: 'assets/images/room-card/1.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
    {
      Id: 'R002',
      Name: 'Express By J Hotel 46 Thảo Điền',
      Description: 'Điểm dừng chân hiện đại giữa lòng Thảo Điền nhộn nhịp. Express by J Hotel mang đến không gian lưu trú gọn gàng và tiện nghi cùng khu coworking, phòng gym, quầy bar, bếp chung và khu giặt sấy – lý tưởng cho những chuyến công tác hoặc nghỉ ngơi.',
      ImageUrl: 'assets/images/room-card/2.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
    {
      Id: 'R003',
      Name: 'J Hotel Premier Thi Sách',
      Description: 'Bước vào hành trình du hành Á Đông độc đáo giữa nhịp sống đậm bản sắc tại Phố Nhật, Quận 1. Đến và tận hưởng J Hotel Premier Thi Sách ngay hôm nay',
      ImageUrl: 'assets/images/room-card/3.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
    {
      Id: 'R001',
      Name: 'J Hotel Nguyễn Du',
      Description: 'Giữa lòng Quận 1 sôi động, J Hotel Nguyễn Du mang đến không gian tĩnh lặng và thanh bình hiếm có. Ánh sáng tự nhiên, cây xanh và thiết kế tối giản ấm cúng tạo không gian lý tưởng để làm việc, thư giãn với các tiện ích như khu coworking, bếp chung, phòng giặt và khu vườn nhỏ trên sân thượng.',
      ImageUrl: 'assets/images/room-card/1.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
    {
      Id: 'R002',
      Name: 'Express By J Hotel 46 Thảo Điền',
      Description: 'Điểm dừng chân hiện đại giữa lòng Thảo Điền nhộn nhịp. Express by J Hotel mang đến không gian lưu trú gọn gàng và tiện nghi cùng khu coworking, phòng gym, quầy bar, bếp chung và khu giặt sấy – lý tưởng cho những chuyến công tác hoặc nghỉ ngơi.',
      ImageUrl: 'assets/images/room-card/2.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
    {
      Id: 'R003',
      Name: 'J Hotel Premier Thi Sách',
      Description: 'Bước vào hành trình du hành Á Đông độc đáo giữa nhịp sống đậm bản sắc tại Phố Nhật, Quận 1. Đến và tận hưởng J Hotel Premier Thi Sách ngay hôm nay',
      ImageUrl: 'assets/images/room-card/3.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
    {
      Id: 'R001',
      Name: 'J Hotel Nguyễn Du',
      Description: 'Giữa lòng Quận 1 sôi động, J Hotel Nguyễn Du mang đến không gian tĩnh lặng và thanh bình hiếm có. Ánh sáng tự nhiên, cây xanh và thiết kế tối giản ấm cúng tạo không gian lý tưởng để làm việc, thư giãn với các tiện ích như khu coworking, bếp chung, phòng giặt và khu vườn nhỏ trên sân thượng.',
      ImageUrl: 'assets/images/room-card/1.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
    {
      Id: 'R002',
      Name: 'Express By J Hotel 46 Thảo Điền',
      Description: 'Điểm dừng chân hiện đại giữa lòng Thảo Điền nhộn nhịp. Express by J Hotel mang đến không gian lưu trú gọn gàng và tiện nghi cùng khu coworking, phòng gym, quầy bar, bếp chung và khu giặt sấy – lý tưởng cho những chuyến công tác hoặc nghỉ ngơi.',
      ImageUrl: 'assets/images/room-card/2.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
    {
      Id: 'R003',
      Name: 'J Hotel Premier Thi Sách',
      Description: 'Bước vào hành trình du hành Á Đông độc đáo giữa nhịp sống đậm bản sắc tại Phố Nhật, Quận 1. Đến và tận hưởng J Hotel Premier Thi Sách ngay hôm nay',
      ImageUrl: 'assets/images/room-card/3.jpg',
      ShortAddess: 'Hồ Chí Minh'
    },
  ];

  //paging 
  page = 1;

  storiesList: {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
  }[] = [];

  constructor(private httpClient: HttpClient,
    private loginService : LoginApiService,
    private logService : LoggerService,
    private router: Router
  ){
    super();
  }

  ngOnInit (): void {
    this.store
      .select(getAllRooms)
      .pipe(takeUntil(this.destroy$))
      .subscribe((rooms) => {
        this.roomClasses = this.buildRoomClassTabs(rooms);
        this.storiesList = this.buildStoriesList(rooms);
      });
  }

  private buildRoomClassTabs (rooms: Room[]): RoomClassTab[] {
    const hotel = rooms.filter((r) => r.RoomClass && r.SubFolder && r.ImageUrl);
    const basic = hotel.filter((r) => r.RoomClass === 'BasicRoom');
    const premium = hotel.filter((r) => r.RoomClass === 'PremiumRoom');
    const vip = hotel.filter((r) => r.RoomClass === 'VIP');
    const eclass = hotel.filter((r) => r.RoomClass === 'ECLASS');

    const toShowcase = (list: Room[]) =>
      list.map((r) => ({
        name: r.Name,
        imageUrl: r.ImageUrl ?? '',
      }));

    return [
      { id: 'all', name: 'Tất cả các phòng', rooms: [] },
      {
        id: 'basic',
        name: 'Cơ bản',
        description: 'Hạng phòng Cơ bản (BasicRoom)',
        rooms: toShowcase(basic),
      },
      {
        id: 'premium',
        name: 'Premium',
        description: 'Hạng phòng Premium',
        rooms: toShowcase(premium),
      },
      {
        id: 'vip',
        name: 'V.I.P',
        description: 'Hạng phòng V.I.P',
        rooms: toShowcase(vip),
      },
      {
        id: 'eclass',
        name: 'Chủ đề',
        description: 'Phòng chủ đề (ECLASS)',
        rooms: toShowcase(eclass),
      },
    ];
  }

  private buildStoriesList (rooms: Room[]): {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
  }[] {
    const pick = (id: string) => rooms.find((r) => r.Id === id);

    const basic301 = pick('BasicRoom-301');
    const premium202 = pick('PremiumRoom-202');
    const vip801 = pick('VIP-801');
    const playBoy = pick('ECLASS-P603-PlayBoy');
    const kimochi = pick('ECLASS-P302-Kimochi');
    const fifty = pick('ECLASS-P701-50ST');

    return [
      {
        id: 1,
        imageUrl: 'assets/images/stories/1.jpg',
        title: 'J Hotel',
        description: 'Trải nghiệm lưu trú đa phong cách',
      },
      {
        id: 2,
        imageUrl: basic301?.ImageUrl ?? 'assets/images/stories/1.jpg',
        title: 'Hạng Cơ bản',
        description: 'Không gian thoải mái, đủ tiện nghi',
      },
      {
        id: 3,
        imageUrl: playBoy?.ImageUrl ?? 'assets/images/stories/2.jpg',
        title: 'Chủ đề — PlayBoy',
        description: 'Phong cách hiện đại và cá tính',
      },
      {
        id: 4,
        imageUrl: kimochi?.ImageUrl ?? 'assets/images/stories/3.jpg',
        title: 'Chủ đề — Kimochi',
        description: 'Thiết kế tinh tế',
      },
      {
        id: 5,
        imageUrl: fifty?.ImageUrl ?? 'assets/images/stories/4.jpg',
        title: 'Chủ đề — 50 Sắc Thái',
        description: 'Không gian sang trọng',
      },
      {
        id: 6,
        imageUrl: vip801?.ImageUrl ?? premium202?.ImageUrl ?? 'assets/images/stories/4.jpg',
        title: 'Hạng V.I.P',
        description: 'Không gian riêng tư và tiện nghi cao cấp',
      },
    ];
  }

  changeRoomClass(classId: string): void {
    this.activeRoomClass = classId;
    this.page = 1; // Reset to first page when changing filter
  }

  get filteredRooms() {
    if (this.activeRoomClass === 'all') {
      // Return all rooms from all classes
      return this.roomClasses.slice(1).flatMap(rc => rc.rooms);
    }
    const roomClass = this.roomClasses.find(rc => rc.id === this.activeRoomClass);
    return roomClass ? roomClass.rooms : [];
  }
}