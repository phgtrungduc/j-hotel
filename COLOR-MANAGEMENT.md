# Hướng Dẫn Quản Lý Màu Sắc - J-Hotel Project

## Tổng Quan

Project J-Hotel sử dụng hệ thống quản lý màu sắc tập trung thông qua SCSS variables để dễ dàng thay đổi màu chủ đạo và maintain consistency across toàn bộ ứng dụng.

## File Quản Lý Màu Chính

📁 **`src/assets/scss-core/_variables.scss`**

Đây là file duy nhất chứa tất cả các định nghĩa màu sắc của project.

## Màu Chủ Đạo

### Primary & Secondary Colors

```scss
$primary:               #2b7a4f;  // Màu xanh lá tươi chủ đạo cho J-Hotel
$secondary:             #ff8c42;  // Màu cam tươi phụ
```

**Cách thay đổi:**
- Chỉ cần thay đổi giá trị hex color trong `_variables.scss`
- Toàn bộ ứng dụng sẽ tự động cập nhật màu mới

### Màu Hệ Thống

```scss
$success:               $green;    // Màu thành công
$info:                  $blue;     // Màu thông tin
$warning:               $orange;   // Màu cảnh báo
$danger:                $red;      // Màu nguy hiểm
```

### Màu Phụ Trợ

```scss
$light-bg:              #f8f9fa;                // Background nhạt
$highlight-color:       #ff6b35;                // Màu highlight/accent
$border-light:          #e0e0e0;                // Border nhạt
$text-muted:            #666666;                // Text mờ
$overlay-dark:          rgba(0, 0, 0, 0.4);     // Overlay tối
$overlay-light:         rgba(255, 255, 255, 0.8); // Overlay sáng
```

## Quy Tắc Sử Dụng Màu

### ✅ ĐÚNG - Sử dụng Variables

```scss
// Component SCSS
@use "../../../../assets/scss-core/variables" as *;

.my-component {
  background-color: $primary;
  color: $white;
  border: 1px solid $secondary;
}

.button-primary {
  background-color: $primary;
  
  &:hover {
    background-color: darken($primary, 10%);
  }
}
```

### ❌ SAI - Hardcode Colors

```scss
// KHÔNG BAO GIỜ LÀM NHƯ NÀY!
.my-component {
  background-color: #2b7a4f;  // ❌ Hardcoded
  color: #fff;                 // ❌ Hardcoded
  border: 1px solid #ff8c42;  // ❌ Hardcoded
}
```

## Import Variables Vào Component

### Component trong Pages hoặc Share

```scss
@use "../../../../assets/scss-core/variables" as *;
// 4 levels up từ component folder
```

### Root Level Files (styles.scss)

```scss
@use "assets/scss-core/variables" as *;
// Từ root không cần ../
```

## Các Biến Màu Có Sẵn

### Màu Cơ Bản
- `$white` - Trắng
- `$black` - Đen
- `$gray` - Xám

### Màu Chủ Đạo
- `$primary` - Màu chính của brand
- `$secondary` - Màu phụ của brand

### Màu Trạng Thái
- `$success` - Xanh lá (thành công)
- `$danger` - Đỏ (lỗi, xóa)
- `$warning` - Cam (cảnh báo)
- `$info` - Xanh dương (thông tin)

### Màu Background & Borders
- `$light-bg` - Background nhạt cho sections
- `$border-light` - Border nhạt
- `$line-border` - Border mặc định

### Màu Text
- `$text-color` - Text chính
- `$text-muted` - Text mờ/phụ
- `$highlight-color` - Text highlight

### Màu Overlay
- `$overlay-dark` - Lớp phủ tối (hero images)
- `$overlay-light` - Lớp phủ sáng (modals)

### Màu Đặc Biệt
- `$amenity-orange` - Màu cho amenities
- `$amenity-bg` - Background cho amenities

## Các Component Đã Được Cập Nhật

✅ Tất cả components đã sử dụng variables:

### Pages Components
- `homepage/home-page.component.scss`
- `brand/brand.component.scss`
- `member/member.component.scss`
- `order/order.component.scss`
- `room-detail/room-detail.component.scss`

### Share Components
- `room-card/room-card.component.scss`
- `room-order-card/room-order-card.component.scss`
- `other-room-card/other-room-card.component.scss`
- `amenity-item/amenity-item.component.scss`
- `member-section/member-section.component.scss`

### Global Styles
- `src/styles.scss`

## Workflow Thay Đổi Màu Chủ Đạo

### Bước 1: Mở File Variables
```bash
src/assets/scss-core/_variables.scss
```

### Bước 2: Thay Đổi Primary Color
```scss
$primary: #YOUR_NEW_COLOR;  // Thay đổi màu chính
```

### Bước 3: Thay Đổi Secondary Color (optional)
```scss
$secondary: #YOUR_NEW_COLOR;  // Thay đổi màu phụ
```

### Bước 4: Save & Compile
- Save file
- Angular sẽ tự động compile và hot-reload
- Kiểm tra lại giao diện

## Best Practices

### 1. Luôn Import Variables
Mọi component SCSS file phải import variables ở đầu file:
```scss
@use "../../../../assets/scss-core/variables" as *;
```

### 2. Không Tạo Màu Mới Trong Component
- ❌ Không khai báo màu trong component SCSS
- ✅ Thêm màu mới vào `_variables.scss`

### 3. Sử dụng SCSS Functions
```scss
// Làm sáng màu
background: lighten($primary, 10%);

// Làm tối màu
background: darken($primary, 10%);

// Opacity
background: rgba($primary, 0.8);
```

### 4. Semantic Naming
Sử dụng tên biến có ý nghĩa:
```scss
// ✅ Good
$primary
$secondary
$success
$danger

// ❌ Bad
$color1
$color2
$green-thing
```

## Kiểm Tra Hardcoded Colors

### Search Hardcoded Hex Colors
```bash
# Tìm tất cả hex colors trong component
grep -r "#[0-9a-fA-F]\{3,6\}" src/app/component/**/*.scss
```

### Replace với Variables
Nếu tìm thấy hardcoded colors, thay thế ngay bằng variables phù hợp.

## Thêm Màu Mới

Nếu cần thêm màu mới cho project:

### 1. Thêm vào _variables.scss
```scss
// Thêm variable mới
$your-new-color: #123456;  // Mô tả màu
```

### 2. Thêm vào Theme Colors (nếu cần)
```scss
$theme-colors: (
  "primary": $primary,
  "secondary": $secondary,
  "your-new-color": $your-new-color,  // Thêm vào đây
);
```

### 3. Sử Dụng Trong Components
```scss
.my-element {
  color: $your-new-color;
}
```

## Troubleshooting

### Lỗi: "Undefined variable"
**Nguyên nhân:** Chưa import variables
**Giải pháp:**
```scss
@use "../../../../assets/scss-core/variables" as *;
```

### Lỗi: Path không đúng
**Nguyên nhân:** Số lượng `../` không chính xác
**Giải pháp:** Đếm số folder từ component đến `src/`:
- Component ở `src/app/component/Pages/xxx/` → 4 levels (`../../../../`)
- Component ở `src/app/component/Share/xxx/` → 4 levels (`../../../../`)

### Màu không thay đổi sau khi update
**Giải pháp:**
1. Clear browser cache
2. Restart Angular dev server
3. Hard refresh (Ctrl + Shift + R)

## Migration từ Hardcoded Colors

Nếu bạn có component cũ với hardcoded colors:

```scss
// TRƯỚC
.old-component {
  background: #2b7a4f;
  color: #ffffff;
  border: 1px solid #e0e0e0;
}

// SAU
@use "../../../../assets/scss-core/variables" as *;

.old-component {
  background: $primary;
  color: $white;
  border: 1px solid $border-light;
}
```

## Liên Hệ & Hỗ Trợ

Nếu có thắc mắc về quản lý màu sắc, vui lòng:
- Tham khảo file `_variables.scss`
- Xem các component mẫu đã implement đúng
- Liên hệ team lead

---

**Lưu Ý Quan Trọng:**
- ⚠️ KHÔNG BAO GIỜ hardcode màu trực tiếp trong component SCSS
- ⚠️ LUÔN LUÔN sử dụng variables từ `_variables.scss`
- ⚠️ Thêm màu mới vào `_variables.scss` thay vì tạo trong component

