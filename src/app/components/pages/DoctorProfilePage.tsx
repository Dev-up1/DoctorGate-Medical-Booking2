import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { 
  Star, MapPin, Phone, DollarSign, Shield, Video, Calendar,
  Clock, Award, GraduationCap, Briefcase, Image as ImageIcon,
  Tag, FileText, CheckCircle, ChevronLeft, ChevronRight, X
} from 'lucide-react';

interface DoctorProfilePageProps {
  doctorId: string;
  onNavigate: (page: string) => void;
  onBook?: (clinicId: string, date: string, time: string) => void;
}

// Mock Data - same doctor as in DoctorDashboard
const mockDoctor = {
  id: '1',
  name: 'د. سامي عبدالله الوريث',
  specialty: 'استشاري باطنية وجهاز هضمي',
  profileImage: 'https://edfwxxagmsyzsbjtuvdu.supabase.co/storage/v1/object/public/Medical-Appointments/31.jpeg',
  rating: 4.8,
  totalReviews: 234,
  hasApprovedBadge: true,
  bio: 'استشاري باطنية وجهاز هضمي مع خبرة تزيد عن 15 سنة في تشخيص وعلاج أمراض الجهاز الهضمي والكبد. حاصل على البورد اليمني في الطب الباطني وزمالة الجهاز الهضمي.',
  specialties: ['باطنية', 'جهاز هضمي', 'كبد'],
  experiences: [
    { id: 1, title: 'استشاري باطنية', place: 'مستشفى السعيد التخصصي', years: '2018 - حتى الآن' },
    { id: 2, title: 'أخصائي باطنية', place: 'مستشفى هائل سعيد', years: '2015 - 2018' }
  ],
  certificates: [
    { id: 1, name: 'البورد اليمني - باطنية', year: '2017' },
    { id: 2, name: 'زمالة الجهاز الهضمي', year: '2019' }
  ]
};

const mockClinics = [
  {
    id: 'c1',
    name: 'عيادة الدكتور سامي - الحصبة',
    address: 'شارع النصر، الحصبة، تعز',
    phone: '042256483',
    area: 'الحصبة',
    rating: 4.9,
    reviewsCount: 120,
    examPrice: 5000,
    insurancePrice: 4000,
    insurances: ['التأمين الوطني', 'بوبا', 'التعاونية'],
    onlineConsultationEnabled: true,
    onlinePrice: 3000,
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.234!2d45.033!3d12.787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDQ3JzEzLjIiTiA0NcKwMDEnNTguOCJF!5e0!3m2!1sen!2sye!4v1234567890',
    schedule: [
      { day: 'السبت', date: '2026-02-01', isAvailable: true, slots: ['9:00 ص', '10:00 ص', '11:00 ص', '4:00 م', '5:00 م'] },
      { day: 'الأحد', date: '2026-02-02', isAvailable: true, slots: ['9:00 ص', '10:00 ص', '11:00 ص'] },
      { day: 'الاثنين', date: '2026-02-03', isAvailable: true, slots: ['9:00 ص', '10:00 ص', '11:00 ص', '4:00 م', '5:00 م'] },
      { day: 'الثلاثاء', date: '2026-02-04', isAvailable: false, slots: [] },
      { day: 'الأربعاء', date: '2026-02-05', isAvailable: true, slots: ['9:00 ص', '10:00 ص', '11:00 ص', '4:00 م'] }
    ]
  },
  {
    id: 'c2',
    name: 'عيادة التضامن التخصصية',
    address: 'شارع جمال، التضامن، تعز',
    phone: '042147856',
    area: 'التضامن',
    rating: 4.7,
    reviewsCount: 98,
    examPrice: 6000,
    insurancePrice: 5000,
    insurances: ['التأمين الوطني', 'ميدنت'],
    onlineConsultationEnabled: false,
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.234!2d45.033!3d12.787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDQ3JzEzLjIiTiA0NcKwMDEnNTguOCJF!5e0!3m2!1sen!2sye!4v1234567890',
    schedule: [
      { day: 'السبت', date: '2026-02-01', isAvailable: false, slots: [] },
      { day: 'الأحد', date: '2026-02-02', isAvailable: true, slots: ['5:00 م', '6:00 م', '7:00 م'] },
      { day: 'الاثنين', date: '2026-02-03', isAvailable: false, slots: [] },
      { day: 'الثلاثاء', date: '2026-02-04', isAvailable: true, slots: ['5:00 م', '6:00 م', '7:00 م'] },
      { day: 'الأربعاء', date: '2026-02-05', isAvailable: false, slots: [] }
    ]
  }
];

const mockReviews = [
  { id: 'r1', patientName: 'زيد ع.', rating: 5, comment: 'طبيب ممتاز وتعامل راقي. الله يبارك فيه', date: '2026-01-25', clinic: 'عيادة الدكتور سامي - الحصبة' },
  { id: 'r2', patientName: 'مريم ن.', rating: 5, comment: 'تشخيص دقيق وعلاج فعال، أنصح بزيارته', date: '2026-01-24', clinic: 'عيادة الدكتور سامي - الحصبة' },
  { id: 'r3', patientName: 'وليد ت.', rating: 4, comment: 'طبيب محترم وخبرة واضحة', date: '2026-01-23', clinic: 'عيادة التضامن التخصصية' },
  { id: 'r4', patientName: 'هدى م.', rating: 5, comment: 'ممتاز جداً، شرح مفصّل للحالة', date: '2026-01-20', clinic: 'عيادة الدكتور سامي - الحصبة' },
  { id: 'r5', patientName: 'باسم ر.', rating: 4, comment: 'جيد جداً والعيادة نظيفة', date: '2026-01-18', clinic: 'عيادة التضامن التخصصية' }
];

const mockOffers = [
  { id: 'o1', title: 'فحص شامل + استشارة', description: 'فحص طبي شامل مع استشارة مجانية', originalPrice: 10000, offerPrice: 7000, validUntil: '2026-02-28' },
  { id: 'o2', title: 'متابعة شهرية مخفضة', description: 'برنامج متابعة شهري بسعر مخفض', originalPrice: 15000, offerPrice: 12000, validUntil: '2026-03-31' }
];

const mockArticles = [
  { id: 'ar1', title: 'أهمية الفحص الدوري للجهاز الهضمي', excerpt: 'الفحص الدوري يساعد على الكشف المبكر عن الأمراض وتجنب المضاعفات...', publishDate: '2026-01-15', views: 450 },
  { id: 'ar2', title: 'نصائح للحفاظ على صحة الكبد', excerpt: 'الكبد من أهم أعضاء الجسم، وهنا بعض النصائح للحفاظ على صحته...', publishDate: '2026-01-10', views: 380 }
];

const mockGallery = [
  { id: 'g1', type: 'clinic', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500', caption: 'غرفة الانتظار - عيادة كريتر' },
  { id: 'g2', type: 'equipment', url: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500', caption: 'جهاز المنظار الحديث' },
  { id: 'g3', type: 'clinic', url: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=500', caption: 'غرفة الفحص' },
  { id: 'g4', type: 'clinic', url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500', caption: 'الاستقبال' }
];

export function DoctorProfilePage({ doctorId, onNavigate, onBook }: DoctorProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClinic, setSelectedClinic] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  // Format phone number for RTL (code on the right)
  const formatPhoneRTL = (phone: string) => {
    // Split phone if it has area code
    if (phone.startsWith('02') || phone.startsWith('03')) {
      const areaCode = phone.substring(0, 2);
      const number = phone.substring(2);
      return (
        <span className="inline-flex items-center gap-1" dir="ltr">
          <span>{number}</span>
          <span className="text-gray-500">{areaCode} 967+</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1" dir="ltr">
        <span>{phone}</span>
        <span className="text-gray-500">+967</span>
      </span>
    );
  };

  const handleBookClick = (clinic: any) => {
    setSelectedClinic(clinic);
    setSelectedDate('');
    setSelectedTime('');
    setIsBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (selectedClinic && selectedDate && selectedTime) {
      onBook?.(selectedClinic.id, selectedDate, selectedTime);
      setIsBookingDialogOpen(false);
      // Show success message or redirect
      alert(`تم حجز موعد في ${selectedClinic.name} يوم ${selectedDate} الساعة ${selectedTime}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header with Doctor Info */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Profile Image */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 p-1 shadow-lg flex-shrink-0">
              <img 
                src={mockDoctor.profileImage} 
                alt={mockDoctor.name}
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>

            {/* Doctor Details */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{mockDoctor.name}</h1>
                {mockDoctor.hasApprovedBadge && (
                  <Badge className="bg-teal-600">
                    <Shield className="size-3 ml-1" />
                    طبيب معتمد
                  </Badge>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-3">{mockDoctor.specialty}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-5 ${i < Math.floor(mockDoctor.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xl font-bold">{mockDoctor.rating}</span>
                </div>
                <span className="text-gray-500">({mockDoctor.totalReviews} تقييم)</span>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2">
                {mockDoctor.specialties.map((spec, i) => (
                  <Badge key={i} variant="outline" className="text-sm">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Bio Section */}
        <Card className="p-6 mb-6">
          <h3 className="font-bold mb-3 text-lg">نبذة عن الطبيب</h3>
          <p className="text-gray-700 leading-relaxed">{mockDoctor.bio}</p>
        </Card>

        {/* Clinics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">العيادات</h2>
          <div className="grid gap-6">
            {mockClinics.map((clinic) => (
              <Card key={clinic.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Clinic Details */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">{clinic.name}</h3>
                    
                    {/* Location */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2 text-gray-700">
                        <MapPin className="size-5 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span>{clinic.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="size-5 text-teal-600 flex-shrink-0" />
                        {formatPhoneRTL(clinic.phone)}
                      </div>
                    </div>

                    {/* Prices */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                        <p className="text-sm text-gray-600 mb-1">سعر الكشف نقداً</p>
                        <p className="text-2xl font-bold text-teal-600">{clinic.examPrice} ر.ي</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <p className="text-sm text-gray-600 mb-1">سعر التأمين</p>
                        <p className="text-2xl font-bold text-gray-700">{clinic.insurancePrice} ر.ي</p>
                      </div>
                    </div>

                    {/* Insurance */}
                    <div className="mb-6">
                      <p className="text-sm font-bold mb-2 text-gray-700">التأمينات المقبولة</p>
                      <div className="flex flex-wrap gap-2">
                        {clinic.insurances.map((ins, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <CheckCircle className="size-3 ml-1 text-emerald-600" />
                            {ins}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Online Consultation */}
                    {clinic.onlineConsultationEnabled && (
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Video className="size-5 text-purple-600" />
                          <span className="font-bold text-purple-900">استشارة أونلاين متاحة</span>
                        </div>
                        <p className="text-sm text-purple-700">السعر: {clinic.onlinePrice} ر.ي</p>
                      </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="size-5 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{clinic.rating}</span>
                      <span className="text-sm text-gray-500">({clinic.reviewsCount} تقييم)</span>
                    </div>

                    {/* Map */}
                    <div className="rounded-lg overflow-hidden border h-48 mb-4">
                      <iframe
                        src={clinic.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`خريطة ${clinic.name}`}
                      />
                    </div>
                  </div>

                  {/* Schedule & Booking */}
                  <div>
                    <h4 className="font-bold mb-4 text-lg">جدول المواعيد</h4>
                    <div className="space-y-3 mb-6">
                      {clinic.schedule.map((day, i) => (
                        <div 
                          key={i} 
                          className={`p-4 rounded-lg border ${day.isAvailable ? 'bg-white hover:bg-teal-50 border-teal-200' : 'bg-gray-50 border-gray-200'}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-bold">{day.day}</p>
                              <p className="text-sm text-gray-500">{day.date}</p>
                            </div>
                            {day.isAvailable ? (
                              <Badge className="bg-emerald-600">{day.slots.length} موعد متاح</Badge>
                            ) : (
                              <Badge variant="secondary">مغلق</Badge>
                            )}
                          </div>
                          {day.isAvailable && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {day.slots.slice(0, 4).map((slot, si) => (
                                <Badge key={si} variant="outline" className="text-xs">
                                  <Clock className="size-3 ml-1" />
                                  {slot}
                                </Badge>
                              ))}
                              {day.slots.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{day.slots.length - 4} أخرى
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Book Button */}
                    <Button 
                      className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-6"
                      onClick={() => handleBookClick(clinic)}
                    >
                      احجز موعد الآن
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="reviews">آراء المرضى</TabsTrigger>
            <TabsTrigger value="offers">العروض</TabsTrigger>
            <TabsTrigger value="articles">المقالات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Experiences */}
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="size-5 text-teal-600" />
                  الخبرات العملية
                </h3>
                <div className="space-y-4">
                  {mockDoctor.experiences.map((exp) => (
                    <div key={exp.id} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-bold">{exp.title}</p>
                      <p className="text-sm text-gray-600">{exp.place}</p>
                      <p className="text-xs text-gray-500 mt-1">{exp.years}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Certificates */}
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Award className="size-5 text-amber-600" />
                  الشهادات
                </h3>
                <div className="space-y-4">
                  {mockDoctor.certificates.map((cert) => (
                    <div key={cert.id} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-bold">{cert.name}</p>
                      <p className="text-sm text-gray-600">سنة الحصول: {cert.year}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Gallery */}
              <Card className="p-6 md:col-span-2">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <ImageIcon className="size-5 text-purple-600" />
                  معرض الصور
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockGallery.map((item) => (
                    <div key={item.id} className="rounded-lg overflow-hidden border">
                      <img src={item.url} alt={item.caption} className="w-full h-32 object-cover" />
                      <div className="p-2 bg-white">
                        <p className="text-xs text-gray-600">{item.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="p-6 text-center">
                <p className="text-sm text-gray-500 mb-2">التقييم العام</p>
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-4xl font-bold">{mockDoctor.rating}</h3>
                  <Star className="size-8 fill-amber-400 text-amber-400" />
                </div>
                <p className="text-sm text-gray-600 mt-2">{mockDoctor.totalReviews} تقييم</p>
              </Card>
              
              <Card className="p-6 text-center">
                <p className="text-sm text-gray-500 mb-2">تقييمات 5 نجوم</p>
                <h3 className="text-4xl font-bold text-emerald-600">
                  {Math.round((mockReviews.filter(r => r.rating === 5).length / mockReviews.length) * 100)}%
                </h3>
              </Card>
              
              <Card className="p-6 text-center">
                <p className="text-sm text-gray-500 mb-2">آخر تقييم</p>
                <h3 className="text-4xl font-bold text-teal-600">{mockReviews[0].rating}</h3>
                <p className="text-sm text-gray-600 mt-2">{mockReviews[0].date}</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-bold mb-4">آراء المرضى</h3>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="p-5 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <p className="font-bold">{review.patientName}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`size-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-xs text-gray-500">{review.clinic}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers">
            {mockOffers.length === 0 ? (
              <Card className="p-12 text-center">
                <Tag className="size-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">لا توجد عروض حالياً</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {mockOffers.map((offer) => (
                  <Card key={offer.id} className="p-6 border-2 border-teal-200 hover:border-teal-400 transition-colors">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-3 bg-teal-100 rounded-lg">
                        <Tag className="size-6 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                        <p className="text-gray-600">{offer.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-gray-500 line-through text-lg">{offer.originalPrice} ر.ي</span>
                      <span className="text-3xl font-bold text-teal-600">{offer.offerPrice} ر.ي</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        <Clock className="size-4 inline ml-1" />
                        صالح حتى: {offer.validUntil}
                      </p>
                      <Button className="bg-teal-600 hover:bg-teal-700">
                        احجز الآن
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles">
            {mockArticles.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="size-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">لا توجد مقالات حالياً</p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {mockArticles.map((article) => (
                  <Card key={article.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-teal-100 rounded-lg">
                        <FileText className="size-8 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-3">{article.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{article.publishDate}</span>
                          <span>•</span>
                          <span>{article.views} مشاهدة</span>
                        </div>
                      </div>
                      <Button variant="outline">
                        اقرأ المزيد
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>حجز موعد - {selectedClinic?.name}</DialogTitle>
            <DialogDescription>
              اختر التاريخ والوقت المناسب لك
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Date Selection */}
            <div>
              <h4 className="font-bold mb-3">اختر التاريخ</h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedClinic?.schedule.filter((d: any) => d.isAvailable).map((day: any) => (
                  <button
                    key={day.date}
                    onClick={() => {
                      setSelectedDate(day.date);
                      setSelectedTime('');
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedDate === day.date 
                        ? 'border-teal-600 bg-teal-50' 
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <p className="font-bold">{day.day}</p>
                    <p className="text-sm text-gray-600">{day.date}</p>
                    <p className="text-xs text-teal-600 mt-1">{day.slots.length} موعد متاح</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div>
                <h4 className="font-bold mb-3">اختر الوقت</h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedClinic?.schedule
                    .find((d: any) => d.date === selectedDate)
                    ?.slots.map((slot: string) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTime === slot 
                            ? 'border-teal-600 bg-teal-50' 
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        <Clock className="size-4 mx-auto mb-1 text-teal-600" />
                        <p className="font-bold text-sm">{slot}</p>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {selectedDate && selectedTime && (
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <h4 className="font-bold mb-2">ملخص الحجز</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">العيادة:</span> <span className="font-medium">{selectedClinic?.name}</span></p>
                  <p><span className="text-gray-600">التاريخ:</span> <span className="font-medium">{selectedDate}</span></p>
                  <p><span className="text-gray-600">الوقت:</span> <span className="font-medium">{selectedTime}</span></p>
                  <p><span className="text-gray-600">السعر:</span> <span className="font-bold text-teal-600">{selectedClinic?.examPrice} ر.ي</span></p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                إلغاء
              </Button>
              <Button 
                className="bg-teal-600 hover:bg-teal-700"
                disabled={!selectedDate || !selectedTime}
                onClick={handleConfirmBooking}
              >
                تأكيد الحجز
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}