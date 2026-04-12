import { Room } from '../../model/room.model';

export function buildRoomClassAssetPath (
  roomClass: string,
  subFolder: string,
  fileName: string,
): string {
  return `assets/images/room-class/${roomClass}/${subFolder}/${fileName}`;
}

function buildSequentialImages (count: number): string[] {
  const list: string[] = [];

  for (let i = 1; i <= count; i++) {
    list.push(`R4_${String(i).padStart(5, '0')}.jpg`);
  }

  return list;
}

function seedRoom (params: {
  id: string;
  name: string;
  description: string;
  roomClass: string;
  subFolder: string;
  imageCount: number;
  price?: number;
  tags?: string;
}): Room {
  const images = buildSequentialImages(params.imageCount);
  const primary = images[0];

  return {
    Id: params.id,
    Name: params.name,
    Description: params.description,
    ImageUrl: buildRoomClassAssetPath(params.roomClass, params.subFolder, primary),
    Tags: params.tags ?? 'Nghỉ dưỡng, công tác ngắn ngày, Staycation',
    Price: params.price ?? 900000,
    RoomClass: params.roomClass,
    SubFolder: params.subFolder,
    Images: images,
  };
}

/**
 * Phòng khớp 3 hạng trong image-source: BasicRoom, PremiumRoom, ECLASS (và thư mục con đúng tên).
 */
export function createInitialHotelRooms (): Room[] {
  return [
    seedRoom({
      id: 'BasicRoom-301',
      name: 'Cơ bản — phòng 301',
      description:
        'Hạng Cơ bản: không gian thoải mái, đầy đủ tiện nghi cho lưu trú ngắn hoặc dài ngày.',
      roomClass: 'BasicRoom',
      subFolder: '301',
      imageCount: 4,
      price: 1650000,
    }),
    seedRoom({
      id: 'BasicRoom-401',
      name: 'Cơ bản — phòng 401',
      description:
        'Hạng Cơ bản tầng trung, ánh sáng tự nhiên và nội thất hiện đại.',
      roomClass: 'BasicRoom',
      subFolder: '401',
      imageCount: 4,
      price: 1750000,
    }),
    seedRoom({
      id: 'BasicRoom-501',
      name: 'Cơ bản — phòng 501',
      description:
        'Hạng Cơ bản tầng cao, view nội khu dễ chịu.',
      roomClass: 'BasicRoom',
      subFolder: '501',
      imageCount: 3,
      price: 1850000,
    }),
    seedRoom({
      id: 'PremiumRoom-202',
      name: 'Premium — phòng 202',
      description:
        'Hạng Premium: thiết kế tinh tế, tiện nghi cao cấp hơn hạng Cơ bản.',
      roomClass: 'PremiumRoom',
      subFolder: '202',
      imageCount: 4,
      price: 2150000,
    }),
    seedRoom({
      id: 'PremiumRoom-303',
      name: 'Premium — phòng 303',
      description:
        'Premium với không gian rộng và nhiều góc sáng cho nghỉ dưỡng.',
      roomClass: 'PremiumRoom',
      subFolder: '303',
      imageCount: 5,
      price: 2250000,
    }),
    seedRoom({
      id: 'PremiumRoom-402',
      name: 'Premium — phòng 402',
      description:
        'Premium tầng trung, phù hợp công tác và staycation.',
      roomClass: 'PremiumRoom',
      subFolder: '402',
      imageCount: 4,
      price: 2200000,
    }),
    seedRoom({
      id: 'PremiumRoom-502',
      name: 'Premium — phòng 502',
      description:
        'Premium tầng cao, không gian làm việc và nghỉ ngơi cân bằng.',
      roomClass: 'PremiumRoom',
      subFolder: '502',
      imageCount: 4,
      price: 2300000,
    }),
    seedRoom({
      id: 'PremiumRoom-602',
      name: 'Premium — phòng 602',
      description:
        'Premium gam màu mát, yên tĩnh.',
      roomClass: 'PremiumRoom',
      subFolder: '602',
      imageCount: 4,
      price: 2300000,
    }),
    seedRoom({
      id: 'PremiumRoom-702',
      name: 'Premium — phòng 702',
      description:
        'Premium tầng cao, view đẹp.',
      roomClass: 'PremiumRoom',
      subFolder: '702',
      imageCount: 4,
      price: 2400000,
    }),
    seedRoom({
      id: 'ECLASS-P203-ChuyenTauDinhMenh',
      name: 'Chủ đề — Chuyến tàu định mệnh (203)',
      description:
        'Phòng chủ đề lấy cảm hứng hành trình đầy kịch tính.',
      roomClass: 'ECLASS',
      subFolder: 'P203-ChuyenTauDinhMenh',
      imageCount: 3,
      tags: 'Nghỉ dưỡng, Staycation, Chủ đề',
      price: 2700000,
    }),
    seedRoom({
      id: 'ECLASS-P302-Kimochi',
      name: 'Chủ đề — Kimochi (302)',
      description:
        'Không gian phong cách Nhật ấm cúng, tối giản.',
      roomClass: 'ECLASS',
      subFolder: 'P302-Kimochi',
      imageCount: 3,
      tags: 'Nghỉ dưỡng, Staycation, Chủ đề',
      price: 2750000,
    }),
    seedRoom({
      id: 'ECLASS-P403-Morocco',
      name: 'Chủ đề — Morocco (403)',
      description:
        'Chủ đề Morocco, sắc màu và họa tiết Bắc Phi.',
      roomClass: 'ECLASS',
      subFolder: 'P403-Morocco',
      imageCount: 5,
      tags: 'Nghỉ dưỡng, Staycation, Chủ đề',
      price: 2750000,
    }),
    seedRoom({
      id: 'ECLASS-P503-BirdBox',
      name: 'Chủ đề — Bird Box (503)',
      description:
        'Chủ đề Bird Box, tông tối ấn tượng.',
      roomClass: 'ECLASS',
      subFolder: 'P503-BirdBox',
      imageCount: 4,
      tags: 'Nghỉ dưỡng, Staycation, Chủ đề',
      price: 2800000,
    }),
    seedRoom({
      id: 'ECLASS-P601-GoldenInox',
      name: 'Chủ đề — Golden Inox (601)',
      description:
        'Phong cách inox vàng hiện đại.',
      roomClass: 'ECLASS',
      subFolder: 'P601-GoldenInox',
      imageCount: 3,
      tags: 'Nghỉ dưỡng, Staycation, Chủ đề',
      price: 2750000,
    }),
    seedRoom({
      id: 'ECLASS-P603-PlayBoy',
      name: 'Chủ đề — PlayBoy (603)',
      description:
        'Chủ đề PlayBoy sang trọng, tông đen trắng.',
      roomClass: 'ECLASS',
      subFolder: 'P603-PlayBoy',
      imageCount: 4,
      tags: 'Nghỉ dưỡng, Staycation, Chủ đề',
      price: 2900000,
    }),
    seedRoom({
      id: 'ECLASS-P701-50ST',
      name: 'Chủ đề — 50 Sắc Thái (701)',
      description:
        'Chủ đề 50 Sắc Thái, không gian sang trọng.',
      roomClass: 'ECLASS',
      subFolder: 'P701-50ST',
      imageCount: 2,
      tags: 'Nghỉ dưỡng cao cấp, Staycation, Chủ đề',
      price: 3200000,
    }),
    seedRoom({
      id: 'ECLASS-P703-Mumbai',
      name: 'Chủ đề — Mumbai (703)',
      description:
        'Chủ đề Mumbai, sắc màu Ấn Độ đương đại.',
      roomClass: 'ECLASS',
      subFolder: 'P703-Mumbai',
      imageCount: 4,
      tags: 'Nghỉ dưỡng, Staycation, Chủ đề',
      price: 2800000,
    }),
  ];
}
