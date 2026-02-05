import { SearchBar } from '@/app/components/SearchBar';
import { DoctorCard } from '@/app/components/DoctorCard';
import { Footer } from '@/app/components/Footer';
import { services, yemeniDoctors, specialtiesForHomepage, areasForHomepage, topMedicalCenters } from '@/app/data/mockData';
import { Shield, Users, Award, Calendar, Star, CheckCircle2, ChevronRight, ChevronLeft, Phone, MapPin, Building2, Stethoscope, TestTube, Tag, Video, FileText, Activity, Baby, Heart, Eye, Brain, Bone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import heroImage from '../../assets/4009640b3787a30ed68fac2c0da543aac2cdda75.png';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [activeTab, setActiveTab] = useState<'doctor' | 'call'>('doctor');
  const [doctorsScrollPosition, setDoctorsScrollPosition] = useState(0);
  const [centersScrollPosition, setCentersScrollPosition] = useState(0);
  const [offersScrollPosition, setOffersScrollPosition] = useState(0);

  const handleSearch = (specialty: string, city: string, area: string, doctorName: string) => {
    onNavigate('doctors', { specialty, city, area, doctorName });
  };

  const mostBookedDoctors = yemeniDoctors.filter(d => d.reviewsCount > 200).slice(0, 12);

  // Sample offers data
  const offers = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1606501190025-f3ad6d3ea6ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXJtYXRvbG9neSUyMHNraW4lMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzY5Mzk1MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'تنظيف الأسنان',
      originalPrice: 1500,
      discountedPrice: 900,
      discount: 40,
      offersCount: 94
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1598531228433-d9f0cb960816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBicmFjZXMlMjBvcnRob2RvbnRpY3N8ZW58MXx8fHwxNzY5Mzk1MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'تركيب التقويم المعدني',
      originalPrice: 10000,
      discountedPrice: 8000,
      discount: 20,
      offersCount: 3
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1611690061822-b707a67bfebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcGF0aWVudCUyMHNtaWxlfGVufDF8fHx8MTc2OTI4ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'تنظيف البشرة',
      originalPrice: 2000,
      discountedPrice: 1600,
      discount: 20,
      offersCount: 39
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1606501190025-f3ad6d3ea6ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXJtYXRvbG9neSUyMHNraW4lMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzY5Mzk1MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'تقشير الوجه',
      originalPrice: 1600,
      discountedPrice: 1200,
      discount: 20,
      offersCount: 4
    }
  ];

  // Specialties for quick booking
  const specialties = [
    { id: 1, name: 'جلدية', image: 'https://images.unsplash.com/photo-1606501190025-f3ad6d3ea6ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXJtYXRvbG9neSUyMHNraW4lMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzY5Mzk1MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 2, name: 'أسنان', image: 'https://images.unsplash.com/photo-1611690061822-b707a67bfebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcGF0aWVudCUyMHNtaWxlfGVufDF8fHx8MTc2OTI4ODc1MXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 3, name: 'نفسي', image: 'https://images.unsplash.com/photo-1758691461935-202e2ef6b69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBjb25zdWx0YXRpb24lMjBwYXRpZW50fGVufDF8fHx8MTc2OTM5MjcwN3ww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 4, name: 'أطفال وحديثي الولادة', image: 'https://images.unsplash.com/photo-1632052999485-d748103abf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpYXRyaWNpYW4lMjBiYWJ5fGVufDF8fHx8MTc2OTM5NTAxM3ww&ixlib=rb-4.1.0&q=80&w=1080' }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section - Vezeeta Style */}
      <section className="relative bg-gradient-to-br from-[#0D9488] via-[#115E59] to-[#0F766E] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAxLTVzLTQtMi00LTRjMC0yLTItMyAwLTVzNC0yIDItNGMtMi0xLTItNC0xLTVzMy0yIDQtNGMyLTIgMi00IDAtNXMtNC0yLTQtNGMwLTIgMS00IDMtNXMyLTQgMC01cy00LTEtNS0zYy0yLTIgMS00IDMtNXMyLTQgMS02Yy0yLTEtNC0xLTUtM3MwLTQgMi01IDMtMyAyLTVjLTItMi00LTItNS00IDAtMiAxLTQgMy01IDItMiAyLTQgMS02LTItMS00LTEtNS0zcy0xLTQgMS01IDMtMyAyLTVjLTEtMS0zLTItNC00cy0xLTQgMS01YzItMiA0LTIgNC00IDAtMi0xLTQtMy01cy0zLTMtMi01YzItMSA0LTEgNS0zIDItMiAxLTQgMC01cy0zLTItNC00IDAtNC0yLTVjLTItMi0zLTMtMi01czMtMiA0LTRjMi0xIDItNCAwLTVzLTQtMS01LTNjLTEtMi0xLTQgMS01czQtMiA0LTRjMC0yLTItNC0xLTVzNC0yIDUtNGMxLTEgMS00IDAtNXMtNC0xLTUtM2MtMS0yIDAtNCAxLTVzNC0yIDUtNGMxLTEgMC00LTEtNXMtNC0yLTUtNGMtMS0xIDAtNCAxLTVzNC0xIDUtM2MxLTIgMC00LTEtNXMtMy0zLTQtNWMtMS0xIDAtNCAxLTVzNC0xIDUtMyIvPjwvZz48L2c+PC9zdmc+')]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Top Row: Image and Text */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            {/* Text Side (Right) */}
            <div className="md:w-1/2 text-right">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white">
                رعاية صحية لحياة أفضل ليك
              </h1>
              <p className="text-lg md:text-xl text-teal-50 flex items-center justify-start gap-2">
                <Phone className="w-5 h-5" />
                احجز أونلاين او كلم 199676
              </p>
            </div>

            {/* Image Side (Left) */}
            <div className="md:w-1/2 flex justify-end">
              <img
                src={heroImage}
                alt="Doctor consultation"
                className="w-full max-w-lg h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Bottom Row: Search Box (Full Width) */}
          <div className="w-full mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('doctor')}
                  className={`flex-1 py-4 px-6 text-center font-bold transition-colors ${
                    activeTab === 'doctor'
                      ? 'text-[#0D9488] border-b-4 border-[#0D9488] bg-teal-50'
                      : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    <span>احجز دكتور</span>
                  </div>
                  <p className="text-xs mt-1 font-normal text-gray-500">
                    التخصص او الاسم
                  </p>
                </button>
                <button
                  onClick={() => setActiveTab('call')}
                  className={`flex-1 py-4 px-6 text-center font-bold transition-colors ${
                    activeTab === 'call'
                      ? 'text-[#0D9488] border-b-4 border-[#0D9488] bg-teal-50'
                      : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Video className="w-5 h-5" />
                    <span>مكالمة دكتور</span>
                  </div>
                  <p className="text-xs mt-1 font-normal text-gray-500">
                    متابعة عبر مكالمة صوت أو فيديو
                  </p>
                </button>
              </div>

              {/* Search Content */}
              <div className="p-6">
                <SearchBar onSearch={handleSearch} variant="embedded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular Doctors Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">الأطباء الأكثر اختياراً</h2>
            <button
              onClick={() => onNavigate('doctors')}
              className="text-[#0D9488] font-bold hover:underline flex items-center gap-1"
            >
              اظهر المزيد
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button className="px-6 py-2 rounded-full border-2 border-[#0D9488] bg-[#0D9488] text-white font-medium whitespace-nowrap">
              كل التخصصات
            </button>
            <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 font-medium whitespace-nowrap hover:border-[#0D9488] hover:text-[#0D9488]">
              أسنان
            </button>
            <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 font-medium whitespace-nowrap hover:border-[#0D9488] hover:text-[#0D9488]">
              جلدية
            </button>
            <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 font-medium whitespace-nowrap hover:border-[#0D9488] hover:text-[#0D9488]">
              نفسي
            </button>
            <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 font-medium whitespace-nowrap hover:border-[#0D9488] hover:text-[#0D9488]">
              نساء وتوليد
            </button>
            <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 font-medium whitespace-nowrap hover:border-[#0D9488] hover:text-[#0D9488]">
              عظام
            </button>
            <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 font-medium whitespace-nowrap hover:border-[#0D9488] hover:text-[#0D9488]">
              جراحة عامة
            </button>
            <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 font-medium whitespace-nowrap hover:border-[#0D9488] hover:text-[#0D9488]">
              مخ وجراحة عصبية
            </button>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mostBookedDoctors.slice(0, 12).map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => onNavigate('profile', { doctorId: doctor.id })}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#0D9488] text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold">
                    <Star className="w-4 h-4 fill-white" />
                    {doctor.rating}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-gray-900 mb-1 truncate">{doctor.name}</h3>
                  <p className="text-xs text-gray-600 mb-1">{doctor.specialty}</p>
                  <p className="text-xs text-gray-500 mb-2 truncate">
                    <MapPin className="w-3 h-3 inline ml-1" />
                    {doctor.area}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Centers Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">المراكز الأكثر اختياراً</h2>
            <button
              onClick={() => onNavigate('hospitals')}
              className="text-[#0D9488] font-bold hover:underline flex items-center gap-1"
            >
              اظهر المزيد
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Centers Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topMedicalCenters.slice(0, 4).map((center) => (
              <div
                key={center.id}
                onClick={() => onNavigate('hospital-profile', { hospitalId: center.id })}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={center.image}
                  alt={center.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={center.logo}
                      alt={center.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 mb-1 truncate">{center.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {center.area}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {center.departmentsCount} تخصص
                    </span>
                    <span className="text-[#0D9488] font-bold">
                      ابدأ من {center.startingPrice} ريال
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Banner 1 - Video Consultation */}
            <div className="bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-2xl p-8 text-white flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">مكالمة دكتور</h3>
                <p className="mb-4 text-teal-50">
                  للمتابعة مع مكالمتك مع دكتور عبر فيديو أو صوت
                </p>
                <Button
                  onClick={() => onNavigate('online-consultation')}
                  className="bg-white text-[#0D9488] hover:bg-gray-100 font-bold"
                >
                  احجز الآن
                </Button>
              </div>
              <div className="hidden md:block">
                <Video className="w-24 h-24 text-white opacity-20" />
              </div>
            </div>

            {/* Banner 2 - Home Visit */}
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl p-8 text-white flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">زيارة منزلية</h3>
                <p className="mb-4 text-teal-50">
                  اختار التخصص والدكتور وحجزتك البيت
                </p>
                <Button
                  onClick={() => onNavigate('home-care')}
                  className="bg-white text-teal-600 hover:bg-gray-100 font-bold"
                >
                  احجز زيارة
                </Button>
              </div>
              <div className="hidden md:block">
                <Building2 className="w-24 h-24 text-white opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">اختار من أحسن العروض</h2>
            <button
              onClick={() => onNavigate('offers-articles')}
              className="text-[#0D9488] font-bold hover:underline flex items-center gap-1"
            >
              كل العروض
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md font-bold">
                    خصم {offer.discount}%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-[#0D9488]">
                      {offer.discountedPrice} جنيه
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {offer.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{offer.offersCount} عرض</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book by Specialty Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            احجز كشف حسب التخصص
          </h2>

          {/* Specialties Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.map((specialty) => (
              <div
                key={specialty.id}
                onClick={() => onNavigate('doctors', { specialty: specialty.name })}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#0D9488] hover:shadow-lg transition-all cursor-pointer group"
              >
                <img
                  src={specialty.image}
                  alt={specialty.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900">{specialty.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">احجز مجاناً و ادفع في العيادة</h3>
              <p className="text-sm text-gray-600">
                سهّل الكشف عليك مجاناً على اسمك سعر الكشف في العيادة، بدون أي رسوم.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">حجزك مؤكد مع الدكتور</h3>
              <p className="text-sm text-gray-600">
                حجزك مؤكد بمجرد اختيارك من المواعيد المتاحة للدكتور.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">تقييمات حقيقية من المرضى</h3>
              <p className="text-sm text-gray-600">
                شوف تقييمات الدكاترة من مرضى حقيقيين وازور الدكتور بالعمل.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">كل احتياجاتك على فيزيتا</h3>
              <p className="text-sm text-gray-600">
                ابحث و احجز كشف عند دكتور في عيادة، زيارة منزلية، أو استشارة أونلاين.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
