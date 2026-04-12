# Hướng dẫn tối ưu hóa ảnh cho dự án j-hotel

## Tổng quan

Hướng dẫn này mô tả quy trình chuẩn hóa tên file/folder và tối ưu hóa dung lượng ảnh cho website j-hotel. Quy trình này đã giúp giảm dung lượng ảnh từ **361.71 MB xuống 2.24 MB** (giảm 87.8%), cải thiện đáng kể tốc độ tải trang.

## Cấu trúc thư mục (theo nguồn thực tế)

```
j-hotel/
├── src/assets/images/room-class/   # Ảnh phòng đã tối ưu (Angular assets)
│   └── manifest.json               # Sinh tự động khi chạy script đồng bộ
├── image-source/                   # Nguồn gốc (không build); 3 hạng mẫu:
│   ├── BasicRoom/                  # Cơ bản — mỗi thư mục con (301, 401…) = một phòng
│   ├── PremiumRoom/                # Premium — tương tự (202, 303…)
│   └── ECLASS/                     # Chủ đề — mỗi thư mục con = một theme (vd. P603-PlayBoy)
```

**Đồng bộ một lệnh:** từ thư mục gốc `j-hotel`, chạy `powershell -ExecutionPolicy Bypass -File scripts/sync-room-images.ps1`. Script quét toàn bộ `image-source` (cấp 1 = hạng, cấp 2 = phòng), xóa sạch `src/assets/images/room-class` rồi ghi lại ảnh JPEG đã resize (1920px, chất lượng 60%) với tên `R4_00001.jpg`… Thư mục không có file JPEG/HEIC (chỉ HEIC) sẽ bị bỏ qua.

Các ví dụ bên dưới (Deluxe Room, đường dẫn `public/images`…) là quy trình thủ công cũ; có thể tham khảo lệnh rename/nén file, nhưng **nguồn chuẩn cho build hiện tại là `image-source` + script trên**.

## Quy trình tối ưu hóa

### Bước 1: Chuẩn hóa tên thư mục (loại bỏ dấu cách)

```powershell
# Di chuyển đến thư mục chứa ảnh
cd "d:\PERSONAL\j-hotel\image-source"

# Đổi tên các thư mục chính (loại bỏ dấu cách)
Rename-Item "Deluxe Room" "DeluxeRoom"
Rename-Item "E CLASS" "ECLASS"
Rename-Item "S CLASS" "SCLASS"
Rename-Item "Superior Room" "SuperiorRoom"

# Đổi tên các thư mục con
# Ví dụ: "P 301" -> "P301", "Black Pink" -> "BlackPink"
Get-ChildItem -Directory -Recurse | Where-Object { $_.Name -match ' ' } | ForEach-Object {
    $newName = $_.Name -replace ' ', ''
    Rename-Item $_.FullName $newName
}
```

### Bước 2: Chuẩn hóa tên file ảnh

Chỉ giữ lại phần **R4_xxxxx** hoặc **R\d+_\d+**, loại bỏ các từ như "copy", "Bản sao của", "-HDR", "-Pano".

```powershell
# Lấy tất cả file JPG
$files = Get-ChildItem -Path "d:\PERSONAL\j-hotel\image-source" -Recurse -Filter "*.jpg"

# Đổi tên từng file
foreach ($file in $files) {
    # Tìm pattern R4_00xxx hoặc Rxx_xxxx trong tên file
    if ($file.Name -match '(R\d+_\d+)') {
        $newName = $matches[1] + ".jpg"
        
        # Chỉ đổi tên nếu tên mới khác tên hiện tại
        if ($file.Name -ne $newName) {
            $newPath = Join-Path $file.DirectoryName $newName
            Rename-Item -Path $file.FullName -NewName $newName -Force
            Write-Host "Đã đổi: $($file.Name) -> $newName"
        }
    }
}
```

### Bước 3: Nén và tối ưu kích thước ảnh

Sử dụng **System.Drawing** (.NET) để nén ảnh với các thông số:
- **Chất lượng JPEG**: 60%
- **Kích thước tối đa**: 1920px (chiều rộng)
- **Thuật toán**: HighQualityBicubic interpolation

```powershell
# Load assembly System.Drawing
Add-Type -AssemblyName System.Drawing

# Lấy tất cả file ảnh
$files = Get-ChildItem -Path "d:\PERSONAL\j-hotel\image-source" -Recurse -Filter "*.jpg"
$total = $files.Count
$current = 0

foreach ($file in $files) {
    $current++
    
    try {
        # Đọc ảnh gốc
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        
        # Tính toán kích thước mới (giữ tỷ lệ, max width 1920px)
        $maxWidth = 1920
        $ratio = $maxWidth / $img.Width
        
        if ($ratio -lt 1) {
            $newWidth = $maxWidth
            $newHeight = [int]($img.Height * $ratio)
        } else {
            $newWidth = $img.Width
            $newHeight = $img.Height
        }
        
        # Tạo ảnh mới với kích thước đã resize
        $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImg)
        
        # Cài đặt chất lượng cao cho interpolation
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        
        # Vẽ ảnh đã resize
        $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
        
        # Thiết lập encoder cho JPEG với quality 60%
        $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, 60
        )
        
        # Giải phóng file gốc
        $img.Dispose()
        $graphics.Dispose()
        
        # Lưu ảnh đã nén (ghi đè file cũ)
        $newImg.Save($file.FullName, $encoder, $encoderParams)
        $newImg.Dispose()
        
        # Hiển thị tiến trình mỗi 10 file
        if ($current % 10 -eq 0 -or $current -eq $total) {
            Write-Host "Đã xử lý: $current/$total files"
        }
        
    } catch {
        Write-Host "Lỗi khi xử lý $($file.Name): $_" -ForegroundColor Red
    }
}

Write-Host "`nHoàn tất tối ưu hóa!" -ForegroundColor Green
```

### Bước 4: Kiểm tra kết quả

```powershell
# Xem cấu trúc thư mục
$baseDir = "d:\PERSONAL\j-hotel\image-source"
Get-ChildItem $baseDir -Directory | ForEach-Object {
    Write-Host "$($_.Name)/"
    Get-ChildItem $_.FullName -Directory | ForEach-Object {
        Write-Host "  $($_.Name)/ ($((Get-ChildItem $_.FullName -File).Count) files)"
    }
}

# Thống kê dung lượng
$files = Get-ChildItem $baseDir -Recurse -File -Filter "*.jpg"
$totalSize = ($files | Measure-Object -Property Length -Sum).Sum / 1MB

Write-Host "`n=== THỐNG KÊ ==="
Write-Host "Tổng số file: $($files.Count)"
Write-Host "Tổng dung lượng: $([math]::Round($totalSize, 2)) MB"
Write-Host "Trung bình: $([math]::Round($totalSize/$files.Count, 2)) MB/file"
```

## Kết quả đạt được

### Folder `room-class` (public/images/room-class)
- **Trước tối ưu**: 132 files, ~361.71 MB
- **Sau dọn dẹp**: 16 files sử dụng
- **Sau tối ưu lần 1** (80% quality): 50.16 MB
- **Sau tối ưu lần 2** (60% quality): **2.24 MB** ✅
- **Giảm**: 87.8%
- **Trung bình**: ~140 KB/file

### Folder `image-source` (nguồn ảnh)
- **Sau tối ưu**: 77 files, **10.06 MB** ✅
- **Trung bình**: ~130 KB/file
- Cấu trúc:
  - DeluxeRoom: 5 phòng × 3 ảnh = 15 files
  - ECLASS: 3 theme × 5 ảnh = 15 files
  - SCLASS: 1 theme × 5 ảnh = 5 files
  - SuperiorRoom: 14 phòng × 3 ảnh = 42 files

## Cải tiến thêm (tùy chọn)

### 1. Chuyển đổi sang WebP (giảm thêm 25-35%)

```powershell
# Cần cài đặt ImageMagick hoặc dùng online converter
# WebP giảm ~30% dung lượng so với JPEG ở cùng chất lượng
```

### 2. Lazy Loading trong Angular

Đã áp dụng trong `home-page.component.html`:

```html
<img [src]="room.imageUrl" [alt]="room.name" loading="lazy">
```

### 3. Responsive Images

```html
<img 
  [src]="room.imageUrl" 
  [alt]="room.name"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
>
```

## Lưu ý quan trọng

1. **Folder `image-source`** nằm ở root của j-hotel, **KHÔNG** được build vào production
2. Chỉ copy ảnh cần dùng từ `image-source` sang `public/images/room-class`
3. Luôn backup ảnh gốc trước khi nén (nếu cần chất lượng cao sau này)
4. Chất lượng 60% phù hợp cho web, nếu cần chất lượng cao hơn dùng 70-80%
5. Kiểm tra visual trên nhiều thiết bị sau khi nén

## Công cụ sử dụng

- **PowerShell**: Built-in trên Windows
- **System.Drawing**: .NET Framework (có sẵn)
- **Regex pattern**: `R\d+_\d+` để match tên file chuẩn

## Tác giả

Được tối ưu hóa cho dự án j-hotel Hotel Booking
Ngày cập nhật: 17/10/2025
