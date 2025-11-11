import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-section',
  templateUrl: './member-section.component.html',
  styleUrls: ['./member-section.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MemberSectionComponent {
  @Input() subtitle: string = 'Trở thành';
  @Input() title: string = 'HỘI VIÊN J VILLAGE MORE';
  @Input() description: string = 'để mở khóa nhiều đặc quyền.';
  @Input() primaryButtonText: string = 'Đăng ký hội viên';
  @Input() secondaryButtonText: string = 'Đặt phòng';
  @Input() showButtons: boolean = true;
} 