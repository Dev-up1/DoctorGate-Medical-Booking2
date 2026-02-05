import { Footer } from '@/app/components/Footer';
import { hospitals, yemeniDoctors, type Hospital } from '@/app/data/mockData';
import { Star, MapPin, Building2, Phone, Share2, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { useState } from 'react';

interface HospitalProfilePageProps {
  onNavigate: (page: string, data?: any) => void;
  hospitalId?: string;
}

export function HospitalProfilePage({ onNavigate, hospitalId }: HospitalProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'doctors' | 'about' | 'reviews' | 'insurance'>('doctors');
  const [expandedSections, setExpandedSections] = useState({
    allSpecialties: false,
    hospitalBranch: false,
    allInsurance: false
  });

  // Get hospital data (mock for now)
  const hospital: Hospital = hospitals[0];
  
  // Get doctors for this hospital
  const hospitalDoctors = yemeniDoctors.slice(0, 6);

  const toggleSection = (section: 'allSpecialties' | 'hospitalBranch' | 'allInsurance') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderStars = (rating: number, totalReviews: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    
    return (
      <div className="flex items-center gap-1 justify-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-8 h-8 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hospital Header Section */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center border-2 border-gray-100">
              <Building2 className="w-16 h-16 text-[#0D9488]" />
            </div>
          </div>

          {/* Hospital Name */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            {hospital.name}
          </h1>

          {/* Rating */}
          <div className="mb-4">
            {renderStars(hospital.rating, hospital.reviewsCount)}
          </div>

          {/* Rating Text */}
          <p className="text-center text-gray-600 mb-3">
            التقييم العام من {hospital.reviewsCount} زائر
          </p>

          {/* Info Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-4 text-sm text-gray-600">
            <span>{hospital.specialties.length} تخصص طبي</span>
            <span className="text-gray-400">-</span>
            <span>{hospitalDoctors.length} دكتور</span>
          </div>

          {/* Share Section */}
          <p className="text-center text-gray-500 text-sm mb-3">
            شارك صفحة المستشفى من خلال:
          </p>
          <div className="flex justify-center gap-3 mb-6">
            <button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors">
              <MessageCircle className="w-5 h-5 text-white" fill="white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
              <MessageCircle className="w-5 h-5 text-white" fill="white" />
            </button>
          </div>

          {/* Main CTA Button */}
          <Button 
            onClick={() => onNavigate('booking')}
            className="w-full bg-[#0D9488] hover:bg-[#115E59] text-white text-lg py-6 rounded-xl font-bold shadow-lg"
          >
            احجز موعدك الان
          </Button>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('doctors')}
              className={`flex-1 py-4 px-4 text-center font-bold transition-colors whitespace-nowrap border-b-4 ${
                activeTab === 'doctors'
                  ? 'text-[#0D9488] border-[#0D9488]'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              الدكاترة
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-4 px-4 text-center font-bold transition-colors whitespace-nowrap border-b-4 ${
                activeTab === 'about'
                  ? 'text-[#0D9488] border-[#0D9488]'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              عن المستشفى
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-4 px-4 text-center font-bold transition-colors whitespace-nowrap border-b-4 ${
                activeTab === 'reviews'
                  ? 'text-[#0D9488] border-[#0D9488]'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              تقييمات الزائرين
            </button>
            <button
              onClick={() => setActiveTab('insurance')}
              className={`flex-1 py-4 px-4 text-center font-bold transition-colors whitespace-nowrap border-b-4 ${
                activeTab === 'insurance'
                  ? 'text-[#0D9488] border-[#0D9488]'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              التأمين الطبي
            </button>
          </div>
        </div>
      </section>

      {/* Filters Section (Doctors Tab) */}
      {activeTab === 'doctors' && (
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            {/* All Specialties Dropdown */}
            <button
              onClick={() => toggleSection('allSpecialties')}
              className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-700 font-medium">كل التخصصات</span>
              {expandedSections.allSpecialties ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {/* Hospital Branch Dropdown */}
            <button
              onClick={() => toggleSection('hospitalBranch')}
              className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-700 font-medium">{hospital.name}</span>
              {expandedSections.hospitalBranch ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {/* All Insurance Dropdown */}
            <button
              onClick={() => toggleSection('allInsurance')}
              className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-700 font-medium">كل التأمينات</span>
              {expandedSections.allInsurance ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'doctors' && (
            <div className="space-y-4">
              {hospitalDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => onNavigate('profile', { doctorId: doctor.id })}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-4 cursor-pointer"
                >
                  <div className="flex gap-4">
                    {/* Doctor Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        دكتور {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {doctor.specialty}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(doctor.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Badge */}
                      <Badge className="bg-[#0D9488] text-white text-xs px-2 py-1">
                        دكتور بأطلق
                      </Badge>

                      {/* Price */}
                      <p className="text-sm text-gray-500 mt-2">
                        الكشف: {doctor.price.toLocaleString()} ريال
                      </p>
                    </div>

                    {/* Action Icons */}
                    <div className="flex flex-col gap-2">
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <MessageCircle className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">عن المستشفى</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {hospital.description}
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">التخصصات المتاحة</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {hospital.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-teal-50 text-[#0D9488] px-3 py-1"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-[#0D9488] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">الموقع</p>
                    <p className="text-gray-600">{hospital.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-5 h-5 text-[#0D9488] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">رقم الهاتف</p>
                    <p className="text-gray-600 direction-ltr">{hospital.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">تقييمات الزائرين</h2>
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">لا توجد تقييمات بعد</p>
              </div>
            </div>
          )}

          {activeTab === 'insurance' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">التأمين الطبي</h2>
              <p className="text-gray-600">معلومات التأمين الطبي ستكون متاحة قريباً.</p>
            </div>
          )}
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
