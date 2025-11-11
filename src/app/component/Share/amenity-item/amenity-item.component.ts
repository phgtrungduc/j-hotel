import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amenity-item',
  templateUrl: './amenity-item.component.html',
  styleUrl: './amenity-item.component.scss',
  imports: [CommonModule],
  standalone: true
})
export class AmenityItemComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
} 