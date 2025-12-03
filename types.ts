
export interface PropertyFormData {
  propertyCategory: 'showroom' | 'land';

  // Common
  city: string;
  district: string;
  area: string;

  // --- Land Specific (Legacy/Standard) ---
  offerType: string;
  operationalStatus: string;
  districtDesc: string;
  landmarks: string;
  length: string;
  width: string;
  facing: string; // Single direction for land
  streetsCount: string;
  mainStreetWidth: string;
  mainStreetDir: string;
  subStreetWidth: string;
  subStreetDir: string;
  
  // Land Financials & Legal
  price: string;
  negotiable: string;
  paymentMethod: string;
  commission: string;
  deed: string;
  license: string;
  photos: string;
  
  // Land Investment
  suitableFor: string;
  currentRent: string;
  contractRemaining: string;
  nearbyRoads: string; // Generic input for land
  accessEase: string;
  accessDirections: string;


  // --- Showroom Video Specific ---
  // "على [شارعين] بعرض [40-20] متراً"
  showroomStreetsCount: string; // e.g. "شارعين"
  showroomStreetsWidth: string; // e.g. "40-20"
  
  // "وبواجهة واتجاه [شرقي غربي]"
  showroomFacing: string; // e.g. "شرقي غربي"
  
  // "سعة لعرض عدد [150] سيارة"
  showroomCapacity: string;

  // Facilities
  hasOffices: boolean;
  hasLounge: boolean;
  hasKitchen: boolean;
  
  // Roads
  siteStreetName: string; // e.g. "وادي الرمة"
  
  road1Name: string; // e.g. "طريق الدمام"
  road1Dir: string;  // e.g. "الشمالية"
  
  road2Name: string;
  road2Dir: string;
  
  road3Name: string;
  road3Dir: string;
}

export const initialFormData: PropertyFormData = {
  propertyCategory: 'showroom',

  // Common
  city: 'الرياض',
  district: '',
  area: '',

  // Land Defaults
  offerType: 'بيع',
  operationalStatus: 'جاهز',
  districtDesc: 'واجهة تجارية',
  landmarks: '',
  length: '',
  width: '',
  facing: 'شمال',
  streetsCount: '1',
  mainStreetWidth: '',
  mainStreetDir: 'شمالي',
  subStreetWidth: '',
  subStreetDir: 'لا يوجد',
  price: '',
  negotiable: 'نعم',
  paymentMethod: 'كاش',
  commission: '2.5',
  deed: 'متوفر',
  license: 'سارية',
  photos: 'نعم',
  suitableFor: 'الكل',
  currentRent: '',
  contractRemaining: '',
  nearbyRoads: '',
  accessEase: 'سهلة',
  accessDirections: 'من الشمال',

  // Showroom Defaults
  showroomStreetsCount: 'شارعين',
  showroomStreetsWidth: '',
  showroomFacing: '',
  showroomCapacity: '',
  hasOffices: true,
  hasLounge: true,
  hasKitchen: true,
  siteStreetName: '',
  road1Name: '',
  road1Dir: 'الشمالية',
  road2Name: '',
  road2Dir: 'الجنوبية',
  road3Name: '',
  road3Dir: 'شرقية والغربية',
};
