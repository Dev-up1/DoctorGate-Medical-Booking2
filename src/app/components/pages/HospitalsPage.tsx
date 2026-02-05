import { Footer } from '@/app/components/Footer';
import { hospitals, type Hospital } from '@/app/data/mockData';
import { Star, MapPin, Building2, PhoneCall, Clock, ChevronLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { useState } from 'react';

interface HospitalsPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function HospitalsPage({ onNavigate }: HospitalsPageProps) {
  const [selectedCity, setSelectedCity] = useState<string>('الكل');

  const cities = ['الكل', 'عدن', 'المكلا', 'أبين', 'لحج', 'الضالع', 'شبوة', 'سيئون'];

  const filteredHospitals = selectedCity === 'الكل'
    ? hospitals
    : hospitals.filter(h => h.area === selectedCity);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section - Vezeeta Style */}
      <section className="bg-gradient-to-br from-[#0D9488] to-[#115E59] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            المستشفيات والمراكز الطبية
          </h1>
          <p className="text-lg md:text-xl text-teal-100 max-w-3xl">
            اكتشف أفضل المستشفيات والمراكز الطبية مع خدمات طبية شاملة ومتخصصة
          </p>
        </div>
      </section>

      {/* Filters Pills */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all border-2 ${
                  selectedCity === city
                    ? 'bg-[#0D9488] text-white border-[#0D9488]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#0D9488] hover:text-[#0D9488]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="bg-white py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">
            تم العثور على <span className="font-bold text-gray-900">{filteredHospitals.length}</span> مستشفى ومركز طبي
          </p>
        </div>
      </section>

      {/* Hospitals Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

interface HospitalCardProps {
  hospital: Hospital;
  onNavigate: (page: string, data?: any) => void;
}

function HospitalCard({ hospital, onNavigate }: HospitalCardProps) {
  return (
    <div 
      onClick={() => onNavigate('hospital-profile', { hospitalId: hospital.id })}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer group"
    >
      {/* Hospital Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {hospital.emergency && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-red-500 text-white font-bold px-3 py-1">
              طوارئ 24/7
            </Badge>
          </div>
        )}
      </div>

      {/* Hospital Info */}
      <div className="p-5">
        {/* Logo and Name */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
            <Building2 className="w-7 h-7 text-[#0D9488]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-[#0D9488] transition-colors">
              {hospital.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{hospital.area}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(hospital.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-900">{hospital.rating}</span>
          <span className="text-sm text-gray-500">({hospital.reviewsCount})</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Building2 className="w-4 h-4 text-[#0D9488]" />
            <span>{hospital.specialties.length} تخصص</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {hospital.description}
        </p>

        {/* CTA Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('hospital-profile', { hospitalId: hospital.id });
          }}
          className="w-full bg-[#0D9488] hover:bg-[#115E59] text-white font-bold"
        >
          عرض المستشفى
          <ChevronLeft className="w-4 h-4 mr-2" />
        </Button>
      </div>
    </div>
  );
}
