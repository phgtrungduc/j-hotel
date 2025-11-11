import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vndCurrency',
  standalone: true
})
export class VndCurrencyPipe implements PipeTransform {
  
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '0';
    }
    
    // Chuyển đổi về số
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) {
      return '0';
    }
    
    // Format theo kiểu Việt Nam: 1.400.000
    return numValue.toLocaleString('vi-VN');
  }
}
