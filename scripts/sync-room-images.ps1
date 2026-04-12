#Requires -Version 5.1
<#
  Đồng bộ CHỈ theo cấu trúc thư mục image-source:
  - Mỗi thư mục con cấp 1 (BasicRoom, PremiumRoom, ECLASS, ...) = "hạng" (roomClass)
  - Mỗi thư mục con cấp 2 = subFolder (301, 202, P203-ChuyenTauDinhMenh, ...)
  - Ảnh: resize max 1920px, JPEG 60%, đặt tên R4_00001.jpg ...
  - Xóa toàn bộ src/assets/images/room-class rồi ghi lại (không giữ thư mục thừa).

  Không còn phụ thuộc room-image-mapping.json. Không đổi tên image-source (tùy chọn -RenameImageSource).
#>
param(
  [string] $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
  [switch] $RenameImageSource
)

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Add-Type -AssemblyName System.Drawing

$imageSource = Join-Path $RepoRoot 'image-source'
$destRoot = Join-Path $RepoRoot 'src\assets\images\room-class'
$renamesPath = Join-Path $PSScriptRoot 'image-source-renames.json'
$manifestPath = Join-Path $destRoot 'manifest.json'

function Save-JpegResized {
  param(
    [string] $SourcePath,
    [string] $DestPath,
    [int] $MaxWidth = 1920,
    [long] $JpegQuality = 60L
  )

  $img = $null
  $newImg = $null
  $graphics = $null

  try {
    $img = [System.Drawing.Image]::FromFile($SourcePath)
    $ratio = 1.0

    if ($img.Width -gt $MaxWidth) {
      $ratio = [double]$MaxWidth / [double]$img.Width
    }

    $newWidth = [int]([Math]::Round($img.Width * $ratio))
    $newHeight = [int]([Math]::Round($img.Height * $ratio))

    if ($newWidth -lt 1) { $newWidth = 1 }
    if ($newHeight -lt 1) { $newHeight = 1 }

    $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($newImg)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)

    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
      Where-Object { $_.MimeType -eq 'image/jpeg' } |
      Select-Object -First 1

    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
      [System.Drawing.Imaging.Encoder]::Quality,
      $JpegQuality
    )

    $dir = Split-Path -Parent $DestPath
    if (-not (Test-Path -LiteralPath $dir)) {
      New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    $newImg.Save($DestPath, $encoder, $encoderParams)
  }
  finally {
    if ($null -ne $graphics) { $graphics.Dispose() }
    if ($null -ne $newImg) { $newImg.Dispose() }
    if ($null -ne $img) { $img.Dispose() }
  }
}

if (-not (Test-Path -LiteralPath $imageSource)) {
  throw "image-source not found: $imageSource"
}

if (Test-Path -LiteralPath $destRoot) {
  Remove-Item -LiteralPath $destRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $destRoot -Force | Out-Null

$manifest = @()
$tierDirs = Get-ChildItem -LiteralPath $imageSource -Directory | Sort-Object Name

foreach ($tierDir in $tierDirs) {
  $roomClass = $tierDir.Name
  $subDirs = Get-ChildItem -LiteralPath $tierDir.FullName -Directory | Sort-Object Name

  foreach ($subDir in $subDirs) {
    $subFolder = $subDir.Name
    $outDir = Join-Path (Join-Path $destRoot $roomClass) $subFolder

    $extensions = @('*.jpg', '*.jpeg', '*.JPG', '*.JPEG')
    $files = @()
    foreach ($ext in $extensions) {
      $files += Get-ChildItem -LiteralPath $subDir.FullName -File -Filter $ext -ErrorAction SilentlyContinue
    }
    $files = $files | Sort-Object Name -Unique

    $index = 0
    $names = @()
    $relSource = Join-Path $roomClass $subFolder

    foreach ($f in $files) {
      if ($f.Extension -match 'heic') { continue }
      $index++
      $newName = ('R4_{0:D5}.jpg' -f $index)
      $destPath = Join-Path $outDir $newName
      try {
        Save-JpegResized -SourcePath $f.FullName -DestPath $destPath
        $names += $newName
        Write-Host "OK $relSource -> $roomClass/$subFolder/$newName"
      }
      catch {
        Write-Warning "Error $($f.FullName): $_"
      }
    }

    if ($names.Count -gt 0) {
      $manifest += [ordered]@{
        roomClass    = $roomClass
        subFolder    = $subFolder
        sourceRelative = ($relSource -replace '\\', '/')
        images       = $names
      }
    }
    else {
      Write-Warning "Skip empty (no JPEG): $relSource"
    }
  }
}

$manifest | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $manifestPath -Encoding UTF8
Write-Host ""
Write-Host "Manifest: $manifestPath" -ForegroundColor Green

if ($RenameImageSource -and (Test-Path -LiteralPath $renamesPath)) {
  $renameCfg = Get-Content -LiteralPath $renamesPath -Encoding UTF8 | ConvertFrom-Json
  $themeRoot = Join-Path $imageSource $renameCfg.themeRootOldName
  if (Test-Path -LiteralPath $themeRoot) {
    foreach ($row in $renameCfg.themeSubfolders) {
      $oldPath = Join-Path $themeRoot $row.from
      if (Test-Path -LiteralPath $oldPath) {
        Rename-Item -LiteralPath $oldPath -NewName $row.to -Force
      }
    }
    $newThemeRoot = Join-Path $imageSource $renameCfg.themeRootNewName
    if (-not (Test-Path -LiteralPath $newThemeRoot)) {
      Rename-Item -LiteralPath $themeRoot -NewName $renameCfg.themeRootNewName -Force
    }
  }
  $basicRoot = Join-Path $imageSource $renameCfg.basicRootOldName
  if (Test-Path -LiteralPath $basicRoot) {
    $newBasic = Join-Path $imageSource $renameCfg.basicRootNewName
    if (-not (Test-Path -LiteralPath $newBasic)) {
      Rename-Item -LiteralPath $basicRoot -NewName $renameCfg.basicRootNewName -Force
    }
  }
  $premiumRoot = Join-Path $imageSource $renameCfg.premiumRootOldName
  if (Test-Path -LiteralPath $premiumRoot) {
    $newPrem = Join-Path $imageSource $renameCfg.premiumRootNewName
    if (-not (Test-Path -LiteralPath $newPrem)) {
      Rename-Item -LiteralPath $premiumRoot -NewName $renameCfg.premiumRootNewName -Force
    }
  }
}

Write-Host "Done." -ForegroundColor Green
