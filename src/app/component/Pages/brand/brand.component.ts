import { Component } from '@angular/core';
import { BaseComponent } from '../../../common/base.component';
import { CommonModule } from '@angular/common';
import { MemberSectionComponent } from '../../Share/member-section/member-section.component';
import { Router } from '@angular/router';

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
  
  amenities: {[key: string]: Amenity} = {
    DeluxeRoom: {
      id: 'DeluxeRoom',
      title: 'Deluxe Room',
      description: 'Phòng Deluxe sang trọng với thiết kế hiện đại, không gian rộng rãi và đầy đủ tiện nghi cao cấp. Lựa chọn hoàn hảo cho những ai đề cao sự thoải mái và tiện nghi trong suốt thời gian lưu trú.',
      image: 'assets/images/room-class/DeluxeRoom/P301/R4_00807.jpg',
      locations: [
        {
          name: 'Deluxe Room P 301',
          address: 'Tầng 3',
          image: 'assets/images/room-class/DeluxeRoom/P301/R4_00834.jpg'
        },
        {
          name: 'Deluxe Room P 401',
          address: 'Tầng 4',
          image: 'assets/images/room-class/DeluxeRoom/P401/R4_00544.jpg'
        },
        {
          name: 'Deluxe Room P 501',
          address: 'Tầng 5',
          image: 'assets/images/room-class/DeluxeRoom/P501/R4_00378.jpg'
        },
      ] 
    },
    // EClass: {
    //   id: 'EClass',
    //   title: 'E Class',
    //   description: 'Phòng E Class với thiết kế độc đáo, phong cách hiện đại và không gian sống động. Mỗi phòng mang một chủ đề riêng biệt, tạo nên trải nghiệm lưu trú khác biệt và đầy cảm hứng.',
    //   image: 'assets/images/room-class/ECLASS/BlackPink/R4_00195.jpg',
    //   locations: [
    //     {
    //       name: 'E Class - Black Pink',
    //       address: 'Phong cách hiện đại',
    //       image: 'assets/images/room-class/ECLASS/BlackPink/R4_00214.jpg'
    //     },
    //     {
    //       name: 'E Class - Pink Flower',
    //       address: 'Phong cách lãng mạn',
    //       image: 'assets/images/room-class/ECLASS/PinkFlower/R4_00311.jpg'
    //     },
    //     {
    //       name: 'E Class - Play Boy',
    //       address: 'Phong cách cá tính',
    //       image: 'assets/images/room-class/ECLASS/PlayBoy/R4_00252.jpg'
    //     }
    //   ]
    // },
    // SClass: {
    //   id: 'SClass',
    //   title: 'S Class',
    //   description: 'Phòng S Class đẳng cấp với không gian rộng lớn, thiết kế sang trọng và dịch vụ đặc biệt. Đây là lựa chọn hoàn hảo cho những ai tìm kiếm trải nghiệm lưu trú cao cấp nhất.',
    //   image: 'assets/images/room-class/SCLASS/50ST/R4_00014.jpg',
    //   locations: [
    //     {
    //       name: 'S Class - 50 ST',
    //       address: 'Phòng đặc biệt',
    //       image: 'assets/images/room-class/SCLASS/50ST/R4_00080.jpg'
    //     },
    //     {
    //       name: 'S Class - 50 ST',
    //       address: 'Không gian sang trọng',
    //       image: 'assets/images/room-class/SCLASS/50ST/R4_00106.jpg'
    //     },
    //     {
    //       name: 'S Class - 50 ST',
    //       address: 'Tiện nghi đẳng cấp',
    //       image: 'assets/images/room-class/SCLASS/50ST/R4_00119.jpg'
    //     }
    //   ] 
    // },
    SuperiorRoom: {
      id: 'SuperiorRoom',
      title: 'Superior Room',
      description: 'Phòng Superior với không gian thoải mái, thiết kế tinh tế và đầy đủ tiện nghi. Lựa chọn lý tưởng cho cả chuyến công tác và nghỉ dưỡng với chất lượng dịch vụ đáng tin cậy.',
      image: 'assets/images/room-class/SuperiorRoom/P202/R4_00443.jpg',
      locations: [
        {
          name: 'Superior Room P 202',
          address: 'Tầng 2',
          image: 'assets/images/room-class/SuperiorRoom/P202/R4_00456.jpg'
        },
        {
          name: 'Superior Room P 302',
          address: 'Tầng 3',
          image: 'assets/images/room-class/SuperiorRoom/P302/R4_00708.jpg'
        },
        {
          name: 'Superior Room P 402',
          address: 'Tầng 4',
          image: 'assets/images/room-class/SuperiorRoom/P402/R4_00598.jpg'
        }
      ] 
    }
  };

  constructor(private router: Router) {
    super();
  }

  changeTab(tabId: string): void {
    this.activeTab = tabId;
  }

  navigateToOrder() {
    this.router.navigate(['/order']);
  }

  get visibleRoomTypes(): Amenity[] {
    if (this.activeTab === 'all') {
      return Object.values(this.amenities);
    }
    return this.amenities[this.activeTab] ? [this.amenities[this.activeTab]] : [];
  }

  
}