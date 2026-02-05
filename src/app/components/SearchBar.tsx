import { Search, MapPin, Stethoscope, UserSearch } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';

interface SearchBarProps {
  onSearch?: (specialty: string, city: string, area: string, doctorName: string) => void;
  variant?: 'hero' | 'compact' | 'embedded';
}

// Data structure for cities and their areas
const citiesWithAreas: Record<string, string[]> = {
  'عدن': ['كريتر', 'المعلا', 'خورمكسر', 'الشيخ عثمان', 'المنصورة', 'انماء', 'مدينة الشعب', 'البريقة'],
  'المكلا': ['فوة', 'الديس', 'روكب', 'بويش', 'خلف', 'السلام', '40 شقة', 'جول مسحة'],
  'أبين': ['زنجبار', 'خنفر', 'جعار', 'أحور', 'شقرة', 'لودر', 'الوضيع', 'مودية'],
  'لحج': ['الحوطة', 'تبن', 'صبر', 'المسيمير', 'طور الباحة', 'المقاطرة', 'القبيطة', 'كرش'],
  'الضالع': ['الضالع (المدينة)', 'قعطبة', 'دمت', 'جحاف', 'الحصين', 'الأزارق'],
  'شبوة': ['عتق', 'نصاب', 'بيحان', 'عين', 'مرخة العليا', 'مرخة السفلى', 'حبان', 'رضوم'],
  'سيئون': ['سيئون (المدينة)', 'مريمة', 'الحوطة', 'بور', 'مدودة', 'شحوح', 'ساه']
};

export function SearchBar({ onSearch, variant = 'hero' }: SearchBarProps) {
  const [specialty, setSpecialty] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [doctorName, setDoctorName] = useState('');

  const handleCityChange = (selectedCity: string) => {
    setCity(selectedCity);
    setArea(''); // Reset area when city changes
  };

  const handleSearch = () => {
    onSearch?.(specialty, city, area, doctorName);
  };

  const availableAreas = city ? citiesWithAreas[city] || [] : [];

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3 flex-wrap md:flex-nowrap">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Stethoscope className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent bg-white text-black appearance-none cursor-pointer"
            >
              <option value="">التخصص</option>
              <option value="طب الأسنان">طب الأسنان</option>
              <option value="أمراض النساء والولادة">أمراض النساء والولادة</option>
              <option value="جراحة العظام">جراحة العظام</option>
              <option value="طب الأطفال">طب الأطفال</option>
              <option value="الباطنية والقلب">الباطنية والقلب</option>
              <option value="الأمراض الجلدية">الأمراض الجلدية</option>
              <option value="العيون">العيون</option>
              <option value="الطب النفسي">الطب النفسي</option>
            </select>
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent bg-white text-black appearance-none cursor-pointer"
            >
              <option value="">المدينة</option>
              <option value="عدن">عدن</option>
              <option value="المكلا">المكلا</option>
              <option value="أبين">أبين</option>
              <option value="لحج">لحج</option>
              <option value="الضالع">الضالع</option>
              <option value="شبوة">شبوة</option>
              <option value="سيئون">سيئون</option>
            </select>
          </div>
        </div>
        {city && availableAreas.length > 0 && (
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent bg-white text-black appearance-none cursor-pointer"
              >
                <option value="">المنطقة</option>
                {availableAreas.map((areaName) => (
                  <option key={areaName} value={areaName}>{areaName}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        <Button 
          onClick={handleSearch}
          className="bg-[#0D9488] hover:bg-[#115E59] text-white px-8 font-bold"
        >
          <Search className="w-5 h-5 ml-2" />
          بحث
        </Button>
      </div>
    );
  }

  const content = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Specialty */}
        <div>
          <label className="block text-sm mb-2 text-black font-medium">التخصص</label>
          <div className="relative">
            <Stethoscope className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent bg-white text-black appearance-none cursor-pointer"
            >
              <option value="">اختر التخصص</option>
              <option value="طب الأسنان">طب الأسنان</option>
              <option value="أمراض النساء والولادة">أمراض النساء والولادة</option>
              <option value="جراحة العظام">جراحة العظام</option>
              <option value="طب الأطفال">طب الأطفال</option>
              <option value="الباطنية والقلب">الباطنية والقلب</option>
              <option value="الأمراض الجلدية">الأمراض الجلدية</option>
              <option value="العيون">العيون</option>
              <option value="الطب النفسي">الطب النفسي</option>
            </select>
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm mb-2 text-black font-medium">المدينة</label>
          <div className="relative">
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent bg-white text-black appearance-none cursor-pointer"
            >
              <option value="">اختر المدينة</option>
              <option value="عدن">عدن</option>
              <option value="المكلا">المكلا</option>
              <option value="أبين">أبين</option>
              <option value="لحج">لحج</option>
              <option value="الضالع">الضالع</option>
              <option value="شبوة">شبوة</option>
              <option value="سيئون">سيئون</option>
            </select>
          </div>
        </div>

        {/* Area - Only show when city is selected */}
        <div>
          <label className="block text-sm mb-2 text-black font-medium">المنطقة</label>
          <div className="relative">
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              disabled={!city}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent bg-white text-black appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {city ? 'اختر المنطقة' : 'اختر المدينة أولاً'}
              </option>
              {availableAreas.map((areaName) => (
                <option key={areaName} value={areaName}>{areaName}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctor Name */}
        <div>
          <label className="block text-sm mb-2 text-black font-medium">اسم الطبيب</label>
          <div className="relative">
            <UserSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="ابحث باسم الطبيب"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent text-black placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      <Button 
        onClick={handleSearch}
        className="w-full bg-[#0D9488] hover:bg-[#115E59] text-white py-6 text-lg font-bold"
        size="lg"
      >
        <Search className="w-6 h-6 ml-2" />
        ابحث عن طبيب
      </Button>
    </>
  );

  if (variant === 'embedded') {
    return <div className="bg-white">{content}</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
      {content}
    </div>
  );
}