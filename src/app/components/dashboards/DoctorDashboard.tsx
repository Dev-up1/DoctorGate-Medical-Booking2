import { useState, useRef } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { 
  Building2, Calendar, Star, Users, Home,
  Plus, Edit, Trash2, MapPin, Phone, Video, Upload,
  FileText, Shield, Menu, Camera, CheckCircle2,
  LogOut, LayoutDashboard, User, DollarSign, Activity,
  Clock, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DoctorDashboardProps {
  doctorId: string;
  onNavigate: (page: string) => void;
}

// Mock Data
const mockDoctor = {
  id: '1',
  name: 'د. خالد يوسف الحبشي',
  specialty: 'طب الأسنان',
  phone: '773256841',
  email: 'dr.khaled.alhabshi@docgate.com',
  doctorLink: '773256841',
  specialtyDesc: 'وصف التخصص',
  mobile: '777145698',
  gender: 'male',
  university: 'الجامعة',
  gradYear: 'سنة التخرج',
  qualification: '',
  profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  isVerified: true,
};

const mockReviews = [
  { id: 1, name: 'ليلى أحمد المقطري', date: '2026-01-16', rating: 5, comment: 'خدمة ممتازة ودكتور متميز، أنصح بالزيارة', reply: '' },
  { id: 2, name: 'عبدالله سالم الهادي', date: '2026-01-12', rating: 5, comment: 'تجربة جيدة بشكل عام', reply: '' },
];

const mockBookings = [
  { id: 1, patient: 'ياسر محمد الذبحاني', type: 'عيادة', time: '10:00', date: '2026-01-22', status: 'confirmed' },
  { id: 2, patient: 'نادية حسين الكبسي', type: 'عيادة', time: '09:00', date: '2026-01-15', status: 'completed' },
  { id: 3, patient: 'منى عبدالله الشريف', type: 'أونلاين', time: '20:00', date: '2026-01-23', status: 'confirmed' },
];

const mockBranches = [
  { id: 1, name: 'مركز الحبشي لطب الأسنان - حدة', address: 'شارع حدة الرئيسي، مقابل سوق السبعين', type: 'physical', staffCount: 1, isActive: true },
  { id: 2, name: 'استشارة أونلاين - د. خالد الحبشي', address: 'استشارة عن بعد', type: 'online', staffCount: 0, isActive: true },
];

const mockActivities = [
  { id: 1, title: 'موعد جديد محجوز', desc: 'منذ 15 دقيقة • مريض جديد', color: 'bg-emerald-500' },
  { id: 2, title: 'تم تأكيد الحجز', desc: 'منذ ساعة • د. خالد', color: 'bg-[#0D9488]' },
];

export function DoctorDashboard({ doctorId, onNavigate }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(mockDoctor.profileImage);
  
  // Form State
  const [experiences, setExperiences] = useState([{ id: 1, value: '' }]);
  const [certificates, setCertificates] = useState([{ id: 1, value: '' }]);
  const [conferences, setConferences] = useState([{ id: 1, value: '' }]);

  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageClick = () => {
    profileImageInputRef.current?.click();
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => setExperiences([...experiences, { id: Date.now(), value: '' }]);
  const addCertificate = () => setCertificates([...certificates, { id: Date.now(), value: '' }]);
  const addConference = () => setConferences([...conferences, { id: Date.now(), value: '' }]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Profile Summary in Sidebar */}
      <div className="p-6 flex flex-col items-center border-b border-gray-100">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full p-1 border-2 border-[#0D9488]">
            <img 
              src={profileImage} 
              alt="Doctor" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <button 
            onClick={handleProfileImageClick}
            className="absolute bottom-0 right-0 p-1.5 bg-[#0D9488] rounded-full text-white hover:bg-[#0F766E] transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-1">{mockDoctor.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{mockDoctor.specialty}</p>
        {mockDoctor.isVerified && (
          <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium flex items-center gap-1">
            <Shield className="w-3 h-3" />
            معتمد
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 px-3 space-y-1">
        <button
          onClick={() => setActiveTab('profile')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
            activeTab === 'profile' 
              ? "bg-[#FEFCE8] text-[#0D9488] border-r-4 border-[#0D9488]" 
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <User className="w-5 h-5" />
          الملف الشخصي
        </button>
        
        <button
          onClick={() => setActiveTab('reviews')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
            activeTab === 'reviews' 
              ? "bg-[#FEFCE8] text-[#0D9488] border-r-4 border-[#0D9488]" 
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <Star className="w-5 h-5" />
          التقييمات
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
            activeTab === 'bookings' 
              ? "bg-[#FEFCE8] text-[#0D9488] border-r-4 border-[#0D9488]" 
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <Calendar className="w-5 h-5" />
          الحجوزات
        </button>

        <button
          onClick={() => setActiveTab('branches')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
            activeTab === 'branches' 
              ? "bg-[#FEFCE8] text-[#0D9488] border-r-4 border-[#0D9488]" 
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <Building2 className="w-5 h-5" />
          الفروع
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
            activeTab === 'overview' 
              ? "bg-[#FEFCE8] text-[#0D9488] border-r-4 border-[#0D9488]" 
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <LayoutDashboard className="w-5 h-5" />
          نظرة عامة
        </button>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => onNavigate('home')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-red-500 bg-red-50 hover:bg-red-100 font-medium transition-colors"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-xl font-bold text-[#1F2937]">الملف الشخصي</h1>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-[300px]">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-[300px] bg-white border-l border-gray-200 h-screen sticky top-0 overflow-y-auto">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-3xl mx-auto">
            {/* Hidden Input for Profile Image */}
            <input 
              type="file" 
              ref={profileImageInputRef} 
              className="hidden" 
              onChange={handleProfileImageChange}
              accept="image/*"
            />

            {/* Profile Tab Content */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Top Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Optional background decoration if needed, keeping it simple for now */}
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button 
                      onClick={handleProfileImageClick}
                      className="absolute bottom-1 right-1 p-2 bg-[#0D9488] text-white rounded-full hover:bg-[#0F766E] transition-colors border-2 border-white shadow-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{mockDoctor.name}</h2>
                  <p className="text-gray-500 font-medium mb-4">{mockDoctor.specialty}</p>
                  
                  {mockDoctor.isVerified && (
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>معتمد</span>
                    </div>
                  )}
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <div className="space-y-6">
                    {/* Name */}
                  <div className="space-y-2">
                    <Label className="text-right block">الاسم *</Label>
                    <Input defaultValue={mockDoctor.name} className="bg-white text-right" />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="text-right block">البريد الإلكتروني *</Label>
                    <Input defaultValue={mockDoctor.email} className="bg-white text-right" />
                  </div>

                  {/* Doctor Link */}
                  <div className="space-y-2">
                    <Label className="text-right block text-red-500">رابط الطبيب *</Label>
                    <Input defaultValue={mockDoctor.doctorLink} className="bg-white text-right" />
                    <button className="text-xs text-[#0D9488] hover:underline">رابط الطبيب</button>
                  </div>

                  {/* Specialty */}
                  <div className="space-y-2">
                    <Label className="text-right block">أضف تخصص</Label>
                    <Select defaultValue="general">
                      <SelectTrigger className="w-full text-right" dir="rtl">
                        <SelectValue placeholder="اختر التخصص" />
                      </SelectTrigger>
                      <SelectContent dir="rtl">
                        <SelectItem value="general">طب عام</SelectItem>
                        <SelectItem value="dental">طب أسنان</SelectItem>
                        <SelectItem value="derma">جلدية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Specialty Description */}
                  <div className="space-y-2">
                    <Label className="text-right block">وصف التخصص</Label>
                    <Input defaultValue={mockDoctor.specialtyDesc} className="bg-white text-right" />
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <Label className="text-right block">رقم الجوال *</Label>
                    <Input defaultValue={mockDoctor.mobile} className="bg-white text-right" />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label className="text-right block text-red-500">الجنس *</Label>
                    <Select defaultValue={mockDoctor.gender}>
                      <SelectTrigger className="w-full text-right" dir="rtl">
                        <SelectValue placeholder="اختر الجنس" />
                      </SelectTrigger>
                      <SelectContent dir="rtl">
                        <SelectItem value="male">ذكر</SelectItem>
                        <SelectItem value="female">أنثى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label className="text-right block text-red-500">كلمة المرور *</Label>
                    <Input type="password" placeholder="كلمة المرور" className="bg-white text-right" />
                  </div>

                  {/* University */}
                  <div className="space-y-2">
                    <Label className="text-right block">الجامعة</Label>
                    <Input defaultValue={mockDoctor.university} className="bg-white text-right" />
                  </div>

                  {/* Graduation Year */}
                  <div className="space-y-2">
                    <Label className="text-right block">سنة التخرج</Label>
                    <Input defaultValue={mockDoctor.gradYear} className="bg-white text-right" />
                  </div>

                  {/* Qualification */}
                  <div className="space-y-2">
                    <Label className="text-right block">المؤهل</Label>
                    <Select>
                      <SelectTrigger className="w-full text-right" dir="rtl">
                        <SelectValue placeholder="اختر المؤهل" />
                      </SelectTrigger>
                      <SelectContent dir="rtl">
                        <SelectItem value="bachelor">بكالوريوس</SelectItem>
                        <SelectItem value="master">ماجستير</SelectItem>
                        <SelectItem value="phd">دكتوراه</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* License Upload 1 */}
                  <div className="space-y-2">
                    <Label className="text-right block">شهادة مزاولة المهنة + الشهادة الجامعية</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2 bg-white">
                      <Button variant="secondary" size="sm" className="shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-700">
                        Choose Files
                      </Button>
                      <span className="text-sm text-gray-500 truncate">No file chosen</span>
                    </div>
                  </div>

                  {/* Add Experience */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <span>أضف خبرة</span>
                    </div>
                    {experiences.map((exp, index) => (
                      <div key={exp.id} className="flex gap-2">
                         <button 
                          onClick={addExperience}
                          className="w-10 h-10 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white flex items-center justify-center shrink-0"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                        <Input 
                          placeholder="خبرة جديدة" 
                          className="bg-white text-right flex-1"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add Certificate */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <span>أضف شهادة</span>
                    </div>
                    {certificates.map((cert, index) => (
                      <div key={cert.id} className="flex gap-2">
                        <button 
                          onClick={addCertificate}
                          className="w-10 h-10 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white flex items-center justify-center shrink-0"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                        <Input 
                          placeholder="شهادة جديدة" 
                          className="bg-white text-right flex-1"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add Conference */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <span>أضف مؤتمر</span>
                    </div>
                    {conferences.map((conf, index) => (
                      <div key={conf.id} className="flex gap-2">
                        <button 
                          onClick={addConference}
                          className="w-10 h-10 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white flex items-center justify-center shrink-0"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                        <Input 
                          placeholder="مؤتمر جديد" 
                          className="bg-white text-right flex-1"
                        />
                      </div>
                    ))}
                  </div>

                  {/* License Upload 2 (As per image) */}
                  <div className="space-y-2">
                    <Label className="text-right block">شهادة مزاولة المهنة + الشهادة الجامعية</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2 bg-white">
                      <Button variant="secondary" size="sm" className="shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-700">
                        Choose Files
                      </Button>
                      <span className="text-sm text-gray-500 truncate">No file chosen</span>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-4">
                    <Button className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold h-12 text-lg rounded-lg shadow-md">
                      حفظ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            )}
            
            {activeTab !== 'profile' && (
              <div className="space-y-6">
                {/* Reviews Content */}
                {activeTab === 'reviews' && (
                  <>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">التقييمات والمراجعات</h2>
                    
                    {/* Stats Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                      <div className="text-center flex-1">
                        <div className="text-3xl font-bold text-[#0D9488] mb-1">98%</div>
                        <div className="text-gray-500 text-sm">رضا المرضى</div>
                      </div>
                      <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
                      <div className="text-center flex-1">
                        <div className="text-3xl font-bold text-gray-800 mb-1">{mockReviews.length}</div>
                        <div className="text-gray-500 text-sm">العدد الكلي</div>
                      </div>
                      <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
                      <div className="text-center flex-1">
                        <div className="text-3xl font-bold text-gray-800 mb-1 flex items-center justify-center gap-2">
                          4.8 <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                        </div>
                        <div className="text-gray-500 text-sm">متوسط التقييم</div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {mockReviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                          <div className="flex justify-between items-start mb-4">
                            <div className="text-left">
                              <div className="flex items-center gap-2 mb-1 justify-end">
                                <span className="font-bold text-gray-800">{review.name}</span>
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                  {review.name.charAt(0)}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 justify-end mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">{review.date}</span>
                          </div>
                          
                          <div className="bg-gray-50 rounded-xl p-4 text-right text-gray-600 text-sm mb-4">
                            "{review.comment}"
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Bookings Content */}
                {activeTab === 'bookings' && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <Button variant="outline" className="gap-2">
                        تصفية
                      </Button>
                      <h2 className="text-2xl font-bold text-gray-800">جدول الحجوزات</h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">إجراء</th>
                              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الحالة</th>
                              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الوقت</th>
                              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">المريض</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {mockBookings.map((booking) => (
                              <tr key={booking.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 text-right">
                                  <button className="p-2 text-gray-400 hover:text-[#0D9488] hover:bg-teal-50 rounded-lg transition-colors">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  {booking.status === 'confirmed' ? (
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium">مؤكد</span>
                                  ) : (
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">completed</span>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="font-medium text-gray-900">{booking.time}</div>
                                  <div className="text-xs text-gray-500">{booking.date}</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="font-bold text-gray-900">{booking.patient}</div>
                                  <div className="text-xs text-gray-500">{booking.type}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {/* Branches Content */}
                {activeTab === 'branches' && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <Button className="bg-[#0D9488] hover:bg-[#0F766E] w-10 h-10 rounded-full p-0 flex items-center justify-center shadow-lg shadow-teal-900/20">
                        <Plus className="w-6 h-6 text-white" />
                      </Button>
                      <h2 className="text-2xl font-bold text-gray-800">الفروع والعيادات</h2>
                    </div>

                    <div className="space-y-4">
                      {mockBranches.map((branch) => (
                        <div key={branch.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                          <div className="flex flex-col md:flex-row items-center gap-4 text-right">
                            {/* Toggle */}
                            <div className="flex items-center gap-2 order-3 md:order-1">
                              <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${branch.isActive ? 'bg-[#0D9488]' : 'bg-gray-300'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${branch.isActive ? '-translate-x-6' : ''}`} />
                              </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 order-2 text-center md:text-right">
                              <h3 className="font-bold text-lg text-gray-900 mb-1">{branch.name}</h3>
                              <p className="text-gray-500 text-sm">{branch.address}</p>
                            </div>

                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center order-1 md:order-3 ${branch.type === 'physical' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                              {branch.type === 'physical' ? <Building2 className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                            <Button variant="outline" className="bg-gray-50 border-gray-200 hover:bg-gray-100 hover:text-[#0D9488]">
                              الموظفين ({branch.staffCount})
                            </Button>
                            <Button variant="outline" className="bg-gray-50 border-gray-200 hover:bg-gray-100 hover:text-[#0D9488]">
                              تعديل الجدول
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Overview Content */}
                {activeTab === 'overview' && (
                  <>
                    <div className="flex items-center justify-end mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">نظرة عامة</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="text-right">
                          <div className="text-gray-500 text-sm mb-1">مواعيد اليوم</div>
                          <div className="text-3xl font-bold">1</div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0D9488]/10 flex items-center justify-center text-[#0D9488]">
                          <Calendar className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="text-right">
                          <div className="text-gray-500 text-sm mb-1">إجمالي المرضى</div>
                          <div className="text-3xl font-bold">-</div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                          <Users className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="text-right">
                          <div className="text-gray-500 text-sm mb-1">الإيرادات</div>
                          <div className="text-3xl font-bold">5000</div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <DollarSign className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="text-right">
                          <div className="text-gray-500 text-sm mb-1">التقييم</div>
                          <div className="text-3xl font-bold">4.8</div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                          <Star className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                      <h3 className="font-bold text-lg mb-6 text-right">النشاط الأخير</h3>
                      <div className="relative border-r-2 border-gray-100 mr-3 space-y-8 pr-6">
                        {mockActivities.map((activity, idx) => (
                          <div key={activity.id} className="relative">
                            <div className={`absolute -right-[29px] top-1 w-3 h-3 rounded-full ${activity.color} ring-4 ring-white`} />
                            <div className="text-right">
                              <h4 className="font-bold text-gray-900">{activity.title}</h4>
                              <p className="text-sm text-gray-500">{activity.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}