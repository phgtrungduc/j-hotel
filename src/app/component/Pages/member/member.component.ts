import { Component } from '@angular/core';
import { BaseComponent } from '../../../common/base.component';
import { CommonModule } from '@angular/common';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isExpanded: boolean;
}

interface FAQSection {
  id: string;
  title: string;
  isExpanded: boolean;
  items: FAQItem[];
}

interface TestimonialAttribution {
  title: string;
  company: string;
}

interface Testimonial {
  id: string;
  category: string;
  quote: string;
  attribution: TestimonialAttribution;
  backgroundImage: string;
}

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent extends BaseComponent {
  faqSections: FAQSection[] = [
    {
      id: 'A',
      title: 'CẬP NHẬT THÔNG TIN TÀI KHOẢN HỘI VIÊN',
      isExpanded: false,
      items: [
        {
          id: 'A1',
          question: 'Tôi có thể tra cứu thông tin tài khoản Hội Viên bằng cách nào?',
          answer: 'Hội viên có quyền truy cập, tra cứu thông tin cá nhân, số lượng đơn đặt phòng/đêm ở tích lũy thông qua:\n- Đăng nhập qua Website hoặc ứng dụng M Village\n- Liên hệ qua bộ phận Chăm sóc khách hàng tại:\n+ Facebook/ Instagram: M Village\n+ Email: Booking@mvillage.vn\n+ Zalo OA: https://zalo.me/1854985158538915095\n+ Hotline: 1900 3311',
          isExpanded: false
        },
        {
          id: 'A2',
          question: 'Làm thế nào để tăng Hạng Hội Viên',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        },
        {
          id: 'A3',
          question: 'Tại sao Hạng Hội Viên bị giảm?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        },
        {
          id: 'A4',
          question: 'Thay đổi & Điều chỉnh thông tin cá nhân',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        },
        {
          id: 'A5',
          question: 'Gặp vấn đề trong quá trình đăng ký tài khoản',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        },
        {
          id: 'A6',
          question: 'Hạng thành viên sẽ thay đổi như thế nào nếu tôi chuyển từ tài khoản cá nhân sang tài khoản công ty?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        }
      ]
    },
    {
      id: 'B',
      title: 'CÁCH SỬ DỤNG QUYỀN LỢI HỘI VIÊN',
      isExpanded: false,
      items: [
        {
          id: 'B1',
          question: 'Cách sử dụng điểm tích lũy?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        },
        {
          id: 'B2',
          question: 'Làm thế nào để đổi quà tặng?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        },
        {
          id: 'B3',
          question: 'Các ưu đãi đặc biệt cho hội viên VIP?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        },
        {
          id: 'B4',
          question: 'Chính sách hoàn điểm như thế nào?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        }
      ]
    },
    {
      id: 'C',
      title: 'CÁC THÔNG TIN KHÁC',
      isExpanded: false,
      items: [
        {
          id: 'C1',
          question: 'Chính sách bảo mật thông tin?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        },
        {
          id: 'C2',
          question: 'Điều khoản sử dụng dịch vụ?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        },
        {
          id: 'C3',
          question: 'Liên hệ hỗ trợ khách hàng?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        },
        {
          id: 'C4',
          question: 'Thông tin về M Village?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          isExpanded: false
        }
      ]
    }
  ];

  testimonials: Testimonial[] = [
    {
      id: '1',
      category: 'DOANH NGHIỆP',
      quote: 'Dù thường phải đặt phòng gấp do lịch trình dự án, J Village với <span class="highlight">ưu đãi giá tốt</span>, <span class="highlight">xác nhận nhanh chóng</span>, <span class="highlight">hỗ trợ tận tình</span> và <span class="highlight">luôn sẵn phòng</span> vẫn giúp chuyến công tác của chúng tôi trơn tru hơn bao giờ hết.',
      attribution: {
        title: 'Giám đốc nhân sự',
        company: 'Global Tech Firm'
      },
      backgroundImage: '/assets/images/member-slide/1.png'
    },
    {
      id: '2',
      category: 'ĐƠN VỊ LỮ HÀNH',
      quote: 'J Village giúp chúng tôi có <span class="highlight">giá và ưu đãi hợp lý</span>, luôn <span class="highlight">chủ động</span>, <span class="highlight">phản ứng nhanh</span> với mọi thay đổi.',
      attribution: {
        title: 'Chuyên viên tư vấn',
        company: 'Corporate Travel Agency'
      },
      backgroundImage: '/assets/images/member-slide/2.png'
    },
    {
      id: '3',
      category: 'KHÁCH CÁ NHÂN',
      quote: 'Trải nghiệm tuyệt vời với J Village. <span class="highlight">Dịch vụ chất lượng</span>, <span class="highlight">giá cả phải chăng</span> và <span class="highlight">đội ngũ nhân viên thân thiện</span>. Chắc chắn sẽ quay lại!',
      attribution: {
        title: 'Khách hàng thường xuyên',
        company: 'Freelance Consultant'
      },
      backgroundImage: '/assets/images/member-slide/3.png'
    }
  ];

  currentSlide: number = 0;

  constructor() {
    super();
  }

  toggleSection(section: FAQSection): void {
    section.isExpanded = !section.isExpanded;
  }

  toggleItem(item: FAQItem): void {
    item.isExpanded = !item.isExpanded;
  }

  formatAnswer(answer: string): string {
    if (!answer) return '';
    return answer.replace(/\n/g, '<br>');
  }

  formatQuote(quote: string): string {
    if (!quote) return '';
    return quote;
  }

  previousSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  nextSlide(): void {
    if (this.currentSlide < this.testimonials.length - 1) {
      this.currentSlide++;
    }
  }

  getCarouselTransform(): number {
    // Calculate transform to center the active slide
    // Each card takes up 60% of container width, with 20% visible on each side
    const cardWidth = 60; // 60% of container
    const offset = 20; // 20% offset to show adjacent cards
    return -(this.currentSlide * cardWidth) + offset;
  }
}