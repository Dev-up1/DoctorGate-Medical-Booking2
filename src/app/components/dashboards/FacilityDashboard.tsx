import { useState, useRef } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { Checkbox } from '@/app/components/ui/checkbox';
import { 
  Building2, Calendar, Star, TrendingUp, Users, MapPin, Phone, Clock,
  Plus, Edit, Trash2, Upload, Camera, Menu, Shield, Activity, Check,
  Stethoscope, Briefcase, FileText, Image as ImageIcon, AlertCircle,
  CheckCircle, XCircle, Eye, Settings, UserPlus, Building, Hospital,
  UserCheck, Award, MessageSquare, DollarSign, ChevronDown, Search,
  Heart, TestTube, Pill, Ambulance, Activity as PulseIcon, Baby
} from 'lucide-react';

interface FacilityDashboardProps {
  facilityId: string;
  onNavigate: (page: string) => void;
}

// Mock data for facility
const facilityData = {
  id: 'facility-1',
  name: 'مستشفى النور الطبي',
  nameEn: 'Al-Noor Medical Hospital',
  type: 'hospital' as 'hospital' | 'medical_center',
  logo: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400',
  city: 'عدن',
  area: 'كريتر',
  address: 'شارع الملكة أروى، كريتر، عدن',
  phone: '+967 2 123456',
  whatsapp: '+967 777123456',
  description: 'مستشفى النور الطبي هو أحد أفضل المستشفيات في اليمن، يقدم خدمات طبية متكاملة على مستوى عالي من الجودة',
  rating: 4.8,
  reviewsCount: 342,
  isApproved: true,
  isActive: true,
  totalDoctors: 45,
  totalBranches: 3,
  totalClinics: 12
};

const services = [
  { id: 1, name: 'أشعة', icon: Activity, enabled: true },
  { id: 2, name: 'مختبر', icon: TestTube, enabled: true },
  { id: 3, name: 'صيدلية', icon: Pill, enabled: true },
  { id: 4, name: 'طوارئ', icon: Ambulance, enabled: true },
  { id: 5, name: 'عمليات', icon: PulseIcon, enabled: false },
  { id: 6, name: 'عناية مركزة', icon: Heart, enabled: true },
];

const branches = [
  {
    id: 'branch-1',
    name: 'الفرع الرئيسي - كريتر',
    phone: '+967 2 123456',
    address: 'شارع الملكة أروى، كريتر، عدن',
    location: { lat: 12.7783, lng: 45.0187 },
    isMain: true,
    isActive: true,
    clinicsCount: 8,
    doctorsCount: 25
  },
  {
    id: 'branch-2',
    name: 'فرع المنصورة',
    phone: '+967 2 789012',
    address: 'شارع الستين، المنصورة، عدن',
    location: { lat: 12.8125, lng: 45.0187 },
    isMain: false,
    isActive: true,
    clinicsCount: 4,
    doctorsCount: 12
  }
];

const insuranceCompanies = [
  { id: 1, name: 'التأمين الوطنية', enabled: true },
  { id: 2, name: 'شركة تكافل', enabled: true },
  { id: 3, name: 'شركة الحكمة للتأمين', enabled: false },
];

const clinics = [
  {
    id: 'clinic-1',
    name: 'عيادة الباطنية',
    specialty: 'باطنية',
    branchId: 'branch-1',
    branchName: 'الفرع الرئيسي - كريتر',
    doctorsCount: 5,
    servicesOffered: ['فحص شامل', 'تخطيط قلب', 'سونار بطن'],
    isActive: true
  },
  {
    id: 'clinic-2',
    name: 'عيادة الأطفال',
    specialty: 'أطفال',
    branchId: 'branch-1',
    branchName: 'الفرع الرئيسي - كريتر',
    doctorsCount: 3,
    servicesOffered: ['تطعيمات', 'متابعة نمو', 'علاج حساسية'],
    isActive: true
  },
  {
    id: 'clinic-3',
    name: 'عيادة الجلدية',
    specialty: 'جلدية',
    branchId: 'branch-2',
    branchName: 'فرع المنصورة',
    doctorsCount: 2,
    servicesOffered: ['علاج حب الشباب', 'علاج الصدفية', 'ليزر'],
    isActive: true
  }
];

const doctorRequests = [
  {
    id: 'req-1',
    doctorName: 'د. محمد العامري',
    specialty: 'جراحة عامة',
    clinicId: 'clinic-1',
    clinicName: 'عيادة الباطنية',
    branchName: 'الفرع الرئيسي - كريتر',
    joinType: 'دوام ثابت',
    status: 'pending',
    requestDate: '2026-01-20',
    experience: '15 سنة',
    rating: 4.7
  },
  {
    id: 'req-2',
    doctorName: 'د. فاطمة الشريف',
    specialty: 'أطفال',
    clinicId: 'clinic-2',
    clinicName: 'عيادة الأطفال',
    branchName: 'الفرع الرئيسي - كريتر',
    joinType: 'زائر / متعاون',
    status: 'pending',
    requestDate: '2026-01-21',
    experience: '8 سنوات',
    rating: 4.9
  }
];

const teamMembers = [
  {
    id: 'team-1',
    name: 'أحمد السعيد',
    role: 'مسؤول رئيسي',
    email: 'ahmed@alnoor.com',
    phone: '+967 777111222',
    isOwner: true,
    permissions: ['all']
  },
  {
    id: 'team-2',
    name: 'سارة القاسمي',
    role: 'مدير فرع',
    email: 'sara@alnoor.com',
    phone: '+967 777333444',
    isOwner: false,
    permissions: ['manage_branch', 'manage_appointments']
  }
];

const advertisements = [
  {
    id: 'ad-1',
    title: 'عرض خاص على الفحص الشامل',
    description: 'احصل على فحص شامل بخصم 30% لفترة محدودة',
    type: 'internal',
    status: 'active',
    startDate: '2026-01-15',
    endDate: '2026-02-15',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800'
  },
  {
    id: 'ad-2',
    title: 'خدمات الأشعة المقطعية',
    description: 'أحدث أجهزة الأشعة المقطعية متوفرة الآن',
    type: 'homepage',
    status: 'pending',
    startDate: '2026-01-25',
    endDate: '2026-02-25',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800'
  }
];

export function FacilityDashboard({ facilityId, onNavigate }: FacilityDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [facilityLogo, setFacilityLogo] = useState(facilityData.logo);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Dialog states
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [isAddClinicOpen, setIsAddClinicOpen] = useState(false);
  const [isAddTeamMemberOpen, setIsAddTeamMemberOpen] = useState(false);
  const [isAddAdvertisementOpen, setIsAddAdvertisementOpen] = useState(false);
  const [isDoctorRequestDialogOpen, setIsDoctorRequestDialogOpen] = useState(false);
  const [selectedDoctorRequest, setSelectedDoctorRequest] = useState<any>(null);

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFacilityLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleViewDoctorRequest = (request: any) => {
    setSelectedDoctorRequest(request);
    setIsDoctorRequestDialogOpen(true);
  };

  const handleApproveDoctorRequest = () => {
    // Logic to approve doctor request
    setIsDoctorRequestDialogOpen(false);
  };

  const handleRejectDoctorRequest = () => {
    // Logic to reject doctor request
    setIsDoctorRequestDialogOpen(false);
  };

  // Statistics Cards
  const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
    <Card className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold mb-2">{value}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="size-6 text-white" />
        </div>
      </div>
    </Card>
  );

  const SidebarContent = () => (
    <div className="space-y-2">
      {/* Facility Logo in Sidebar - Mobile Only */}
      <div className="flex flex-col items-center gap-3 p-4 mb-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg md:hidden">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-white p-2 shadow-lg">
            <img 
              src={facilityLogo} 
              alt={facilityData.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <button
            onClick={handleLogoClick}
            className="absolute bottom-0 right-0 p-2 bg-teal-600 rounded-full text-white shadow-lg hover:bg-teal-700 transition-colors"
          >
            <Camera className="size-4" />
          </button>
        </div>
        <div className="text-center">
          <p className="font-bold text-base">{facilityData.name}</p>
          <p className="text-xs text-gray-600">{facilityData.type === 'hospital' ? 'مستشفى' : 'مركز طبي'}</p>
          {facilityData.isApproved && (
            <Badge className="bg-teal-600 mt-2">
              <Shield className="size-3 ml-1" />
              معتمد
            </Badge>
          )}
        </div>
      </div>
      
      <button
        onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
        className={`w-full text-right px-4 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 ${
          activeTab === 'overview' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <TrendingUp className="size-5" />
        نظرة عامة
      </button>
      <button
        onClick={() => { setActiveTab('info'); setIsMobileMenuOpen(false); }}
        className={`w-full text-right px-4 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 ${
          activeTab === 'info' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <Building2 className="size-5" />
        بيانات المنشأة
      </button>
      <button
        onClick={() => { setActiveTab('branches'); setIsMobileMenuOpen(false); }}
        className={`w-full text-right px-4 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 ${
          activeTab === 'branches' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <MapPin className="size-5" />
        الفروع
      </button>
      <button
        onClick={() => { setActiveTab('clinics'); setIsMobileMenuOpen(false); }}
        className={`w-full text-right px-4 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 ${
          activeTab === 'clinics' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <Stethoscope className="size-5" />
        العيادات
      </button>
      <button
        onClick={() => { setActiveTab('doctors'); setIsMobileMenuOpen(false); }}
        className={`w-full text-right px-4 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 ${
          activeTab === 'doctors' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <UserCheck className="size-5" />
        انضمام الأطباء
      </button>
      <button
        onClick={() => { setActiveTab('team'); setIsMobileMenuOpen(false); }}
        className={`w-full text-right px-4 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 ${
          activeTab === 'team' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <Users className="size-5" />
        فريق الإدارة
      </button>
      <button
        onClick={() => { setActiveTab('insurance'); setIsMobileMenuOpen(false); }}
        className={`w-full text-right px-4 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 ${
          activeTab === 'insurance' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <Shield className="size-5" />
        التأمين الطبي
      </button>
      <button
        onClick={() => { setActiveTab('advertisements'); setIsMobileMenuOpen(false); }}
        className={`w-full text-right px-4 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 ${
          activeTab === 'advertisements' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <MessageSquare className="size-5" />
        الإعلانات والنشر
      </button>
      <button
        onClick={() => onNavigate('home')}
        className="w-full text-right px-4 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 hover:bg-gray-100 text-gray-700 mt-4 border-t pt-4"
      >
        تسجيل الخروج
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header - Mobile Only */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10 md:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="size-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>القائمة</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <SidebarContent />
                  </div>
                </SheetContent>
              </Sheet>
              
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {activeTab === 'overview' && 'نظرة عامة'}
                  {activeTab === 'info' && 'بيانات المنشأة'}
                  {activeTab === 'branches' && 'الفروع'}
                  {activeTab === 'clinics' && 'العيادات'}
                  {activeTab === 'doctors' && 'انضمام الأطباء'}
                  {activeTab === 'team' && 'فريق الإدارة'}
                  {activeTab === 'insurance' && 'التأمين الطبي'}
                  {activeTab === 'advertisements' && 'الإعلانات والنشر'}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout with Profile Header */}
      <div className="hidden md:block">
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                {/* Facility Logo - Desktop */}
                <div className="relative">
                  <div className="w-28 h-28 rounded-lg bg-white p-2 shadow-lg border-2 border-teal-100">
                    <img 
                      src={facilityLogo} 
                      alt={facilityData.name}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                  <button
                    onClick={handleLogoClick}
                    className="absolute bottom-0 right-0 p-2.5 bg-teal-600 rounded-full text-white shadow-lg hover:bg-teal-700 transition-colors"
                  >
                    <Camera className="size-4" />
                  </button>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">{facilityData.name}</h1>
                    {facilityData.isApproved && (
                      <Badge className="bg-teal-600">
                        <Shield className="size-3 ml-1" />
                        منشأة معتمدة
                      </Badge>
                    )}
                  </div>
                  <p className="text-base text-gray-600">
                    {facilityData.type === 'hospital' ? 'مستشفى' : 'مركز طبي'} • {facilityData.city} - {facilityData.area}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-sm">{facilityData.rating}</span>
                    <span className="text-sm text-gray-500">({facilityData.reviewsCount} تقييم)</span>
                  </div>
                </div>
              </div>
              <Button onClick={() => onNavigate('home')} variant="outline" size="sm">
                العودة للموقع
              </Button>
            </div>

            {/* Desktop Tabs */}
            <div className="flex gap-2 border-t pt-4 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'overview' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <TrendingUp className="size-4" />
                نظرة عامة
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`px-6 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'info' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Building2 className="size-4" />
                بيانات المنشأة
              </button>
              <button
                onClick={() => setActiveTab('branches')}
                className={`px-6 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'branches' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <MapPin className="size-4" />
                الفروع
              </button>
              <button
                onClick={() => setActiveTab('clinics')}
                className={`px-6 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'clinics' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Stethoscope className="size-4" />
                العيادات
              </button>
              <button
                onClick={() => setActiveTab('doctors')}
                className={`px-6 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'doctors' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <UserCheck className="size-4" />
                انضمام الأطباء
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`px-6 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'team' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Users className="size-4" />
                فريق الإدارة
              </button>
              <button
                onClick={() => setActiveTab('insurance')}
                className={`px-6 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'insurance' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Shield className="size-4" />
                التأمين الطبي
              </button>
              <button
                onClick={() => setActiveTab('advertisements')}
                className={`px-6 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'advertisements' ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <MessageSquare className="size-4" />
                الإعلانات
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input for logo */}
      <input
        ref={logoInputRef}
        type="file"
        accept="image/*"
        onChange={handleLogoChange}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <StatCard
                icon={Building}
                title="إجمالي الفروع"
                value={facilityData.totalBranches}
                subtitle="فرع نشط"
                color="bg-teal-600"
              />
              <StatCard
                icon={Stethoscope}
                title="العيادات"
                value={facilityData.totalClinics}
                subtitle="عيادة متخصصة"
                color="bg-emerald-600"
              />
              <StatCard
                icon={UserCheck}
                title="الأطباء"
                value={facilityData.totalDoctors}
                subtitle="طبيب معتمد"
                color="bg-teal-700"
              />
              <StatCard
                icon={Star}
                title="التقييم"
                value={facilityData.rating}
                subtitle={`${facilityData.reviewsCount} تقييم`}
                color="bg-amber-600"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Card className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-teal-100 rounded-full mb-4">
                    <MapPin className="size-8 text-teal-600" />
                  </div>
                  <h3 className="font-bold mb-2">إضافة فرع جديد</h3>
                  <p className="text-sm text-gray-600 mb-4">أنشئ فرع جديد للمنشأة الطبية</p>
                  <Button 
                    onClick={() => setIsAddBranchOpen(true)}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    <Plus className="size-4 ml-2" />
                    إضافة فرع
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-emerald-100 rounded-full mb-4">
                    <Stethoscope className="size-8 text-emerald-600" />
                  </div>
                  <h3 className="font-bold mb-2">إضافة عيادة</h3>
                  <p className="text-sm text-gray-600 mb-4">أنشئ عيادة متخصصة جديدة</p>
                  <Button 
                    onClick={() => setIsAddClinicOpen(true)}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    <Plus className="size-4 ml-2" />
                    إضافة عيادة
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-amber-100 rounded-full mb-4">
                    <Users className="size-8 text-amber-600" />
                  </div>
                  <h3 className="font-bold mb-2">إدارة الفريق</h3>
                  <p className="text-sm text-gray-600 mb-4">أضف أعضاء فريق الإدارة</p>
                  <Button 
                    onClick={() => setIsAddTeamMemberOpen(true)}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="size-4 ml-2" />
                    إضافة عضو
                  </Button>
                </div>
              </Card>
            </div>

            {/* Doctor Requests Card */}
            <Card className="p-6 bg-white border-0 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">طلبات انضمام الأطباء</h3>
                <Badge className="bg-amber-600">{doctorRequests.filter(r => r.status === 'pending').length} طلب جديد</Badge>
              </div>
              {doctorRequests.filter(r => r.status === 'pending').length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <UserCheck className="size-12 mx-auto mb-3 opacity-50" />
                  <p>لا توجد طلبات انضمام جديدة</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {doctorRequests.filter(r => r.status === 'pending').map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-100 rounded-lg">
                          <UserCheck className="size-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium">{request.doctorName}</p>
                          <p className="text-sm text-gray-600">{request.specialty} • {request.clinicName}</p>
                          <p className="text-xs text-gray-500 mt-1">{request.joinType}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDoctorRequest(request)}
                      >
                        <Eye className="size-4 ml-1" />
                        عرض
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Services Grid */}
            <Card className="p-6 bg-white border-0 shadow-sm">
              <h3 className="text-lg font-bold mb-4">الخدمات المتوفرة</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {services.map((service) => (
                  <div 
                    key={service.id} 
                    className={`p-4 rounded-lg text-center transition-all ${
                      service.enabled 
                        ? 'bg-teal-50 border-2 border-teal-200' 
                        : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                    }`}
                  >
                    <service.icon className={`size-8 mx-auto mb-2 ${service.enabled ? 'text-teal-600' : 'text-gray-400'}`} />
                    <p className={`text-sm font-medium ${service.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                      {service.name}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Facility Information Tab */}
          <TabsContent value="info">
            <Card className="p-6 bg-white border-0 shadow-sm mb-6">
              <h3 className="text-lg font-bold mb-6">المعلومات الأساسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>اسم المنشأة (عربي)</Label>
                  <Input defaultValue={facilityData.name} className="mt-2" />
                </div>
                <div>
                  <Label>الاسم الإنجليزي (اختياري)</Label>
                  <Input defaultValue={facilityData.nameEn} className="mt-2" />
                </div>
                <div>
                  <Label>نوع المنشأة</Label>
                  <Select defaultValue={facilityData.type}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospital">مستشفى</SelectItem>
                      <SelectItem value="medical_center">مركز طبي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>رقم الهاتف الرئيسي</Label>
                  <Input defaultValue={facilityData.phone} className="mt-2" />
                </div>
                <div>
                  <Label>واتساب (اختياري)</Label>
                  <Input defaultValue={facilityData.whatsapp} className="mt-2" />
                </div>
                <div>
                  <Label>المدينة</Label>
                  <Select defaultValue={facilityData.city}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="عدن">عدن</SelectItem>
                      <SelectItem value="صنعاء">صنعاء</SelectItem>
                      <SelectItem value="تعز">تعز</SelectItem>
                      <SelectItem value="الحديدة">الحديدة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>العنوان</Label>
                  <Textarea defaultValue={facilityData.address} className="mt-2" rows={2} />
                </div>
                <div className="md:col-span-2">
                  <Label>نبذة مختصرة عن المنشأة</Label>
                  <Textarea defaultValue={facilityData.description} className="mt-2" rows={4} />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  حفظ التغييرات
                </Button>
              </div>
            </Card>

            {/* Services Management */}
            <Card className="p-6 bg-white border-0 shadow-sm mb-6">
              <h3 className="text-lg font-bold mb-6">الخدمات العامة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <service.icon className="size-5 text-teal-600" />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <Switch defaultChecked={service.enabled} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Operating Hours */}
            <Card className="p-6 bg-white border-0 shadow-sm">
              <h3 className="text-lg font-bold mb-6">ساعات العمل</h3>
              <div className="space-y-4">
                {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-24">
                      <span className="font-medium">{day}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Input type="time" defaultValue="08:00" className="w-32" />
                      <span>إلى</span>
                      <Input type="time" defaultValue="20:00" className="w-32" />
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-6 p-4 bg-teal-50 rounded-lg">
                <Checkbox id="24hours" />
                <label htmlFor="24hours" className="text-sm font-medium">
                  المنشأة تعمل 24 ساعة
                </label>
              </div>
              <div className="flex justify-end mt-6">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  حفظ ساعات العمل
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Branches Tab */}
          <TabsContent value="branches">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">فروع المنشأة</h3>
              <Button onClick={() => setIsAddBranchOpen(true)} className="bg-teal-600 hover:bg-teal-700">
                <Plus className="size-4 ml-2" />
                إضافة فرع
              </Button>
            </div>

            <div className="grid gap-6">
              {branches.map((branch) => (
                <Card key={branch.id} className="p-6 bg-white border-0 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold">{branch.name}</h4>
                        {branch.isMain && (
                          <Badge className="bg-amber-600">فرع رئيسي</Badge>
                        )}
                        {branch.isActive ? (
                          <Badge className="bg-emerald-600">نشط</Badge>
                        ) : (
                          <Badge variant="secondary">غير نشط</Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4" />
                          <span>{branch.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="size-4" />
                          <span>{branch.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="size-4" />
                      </Button>
                      {!branch.isMain && (
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">العيادات</p>
                      <p className="font-bold">{branch.clinicsCount} عيادة</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">الأطباء</p>
                      <p className="font-bold">{branch.doctorsCount} طبيب</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">الموقع</p>
                      <Button size="sm" variant="ghost" className="h-auto p-0 text-teal-600">
                        عرض على الخريطة
                      </Button>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">التأمين</p>
                      <Button size="sm" variant="ghost" className="h-auto p-0 text-teal-600">
                        إدارة التأمين
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Add Branch Dialog */}
            <Dialog open={isAddBranchOpen} onOpenChange={setIsAddBranchOpen}>
              <DialogContent className="max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle>إضافة فرع جديد</DialogTitle>
                  <DialogDescription>
                    أضف فرع جديد للمنشأة. سيتمكن المرضى من حجز المواعيد في هذا الفرع.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>اسم الفرع</Label>
                    <Input placeholder="مثال: الفرع الرئيسي - كريتر" className="mt-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>رقم الهاتف</Label>
                      <Input placeholder="+967 2 ..." className="mt-2" />
                    </div>
                    <div>
                      <Label>المنطقة</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="اختر المنطقة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="crater">كريتر</SelectItem>
                          <SelectItem value="mansoura">المنصورة</SelectItem>
                          <SelectItem value="sheikh-othman">الشيخ عثمان</SelectItem>
                          <SelectItem value="khormaksar">خورمكسر</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>العنوان الكامل</Label>
                    <Textarea placeholder="أدخل العنوان التفصيلي للفرع" className="mt-2" rows={2} />
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-teal-50 rounded-lg">
                    <Checkbox id="main-branch" />
                    <label htmlFor="main-branch" className="text-sm font-medium">
                      تعيين كفرع رئيسي
                    </label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddBranchOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setIsAddBranchOpen(false)}>
                    إضافة الفرع
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Clinics Tab */}
          <TabsContent value="clinics">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold">العيادات المتخصصة</h3>
                <p className="text-sm text-gray-600">إدارة العيادات والأقسام الطبية</p>
              </div>
              <Button onClick={() => setIsAddClinicOpen(true)} className="bg-teal-600 hover:bg-teal-700">
                <Plus className="size-4 ml-2" />
                إضافة عيادة
              </Button>
            </div>

            <div className="grid gap-6">
              {clinics.map((clinic) => (
                <Card key={clinic.id} className="p-6 bg-white border-0 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Stethoscope className="size-5 text-teal-600" />
                        <h4 className="text-lg font-bold">{clinic.name}</h4>
                        {clinic.isActive && (
                          <Badge className="bg-emerald-600">نشطة</Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Award className="size-4" />
                          <span>التخصص: {clinic.specialty}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4" />
                          <span>الفرع: {clinic.branchName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="size-4" />
                          <span>عدد الأطباء: {clinic.doctorsCount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="size-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>

                  {clinic.servicesOffered.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-2">الخدمات المقدمة:</p>
                      <div className="flex flex-wrap gap-2">
                        {clinic.servicesOffered.map((service, index) => (
                          <Badge key={index} variant="secondary" className="bg-teal-50 text-teal-700">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Add Clinic Dialog */}
            <Dialog open={isAddClinicOpen} onOpenChange={setIsAddClinicOpen}>
              <DialogContent className="max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle>إضافة عيادة جديدة</DialogTitle>
                  <DialogDescription>
                    أنشئ عيادة متخصصة جديدة. يجب إضافة عيادة واحدة على الأقل قبل انضمام الأطباء.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>اسم العيادة</Label>
                    <Input placeholder="مثال: عيادة الباطنية" className="mt-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>التخصص</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="اختر التخصص" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="internal">باطنية</SelectItem>
                          <SelectItem value="pediatrics">أطفال</SelectItem>
                          <SelectItem value="cardiology">قلب وأوعية</SelectItem>
                          <SelectItem value="dermatology">جلدية</SelectItem>
                          <SelectItem value="orthopedics">عظام</SelectItem>
                          <SelectItem value="neurology">أعصاب</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>الفرع التابع له</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="اختر الفرع" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch.id} value={branch.id}>
                              {branch.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>الخدمات المقدمة (اختياري)</Label>
                    <Textarea 
                      placeholder="مثال: فحص شامل، تخطيط قلب، سونار"
                      className="mt-2"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">افصل الخدمات بفاصلة</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddClinicOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setIsAddClinicOpen(false)}>
                    إضافة العيادة
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">طلبات انضمام الأطباء</h3>
              <p className="text-sm text-gray-600">
                راجع واعتمد طلبات الأطباء للانضمام إلى المنشأة. الأطباء لن يظهروا للمرضى إلا بعد الاعتماد.
              </p>
            </div>

            {/* Filter Tabs */}
            <Tabs defaultValue="pending" className="mb-6">
              <TabsList>
                <TabsTrigger value="pending">
                  قيد المراجعة ({doctorRequests.filter(r => r.status === 'pending').length})
                </TabsTrigger>
                <TabsTrigger value="approved">معتمد</TabsTrigger>
                <TabsTrigger value="rejected">مرفوض</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-6">
                {doctorRequests.filter(r => r.status === 'pending').length === 0 ? (
                  <Card className="p-12 text-center bg-white border-0 shadow-sm">
                    <UserCheck className="size-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">لا توجد طلبات انضمام جديدة</p>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {doctorRequests.filter(r => r.status === 'pending').map((request) => (
                      <Card key={request.id} className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xl font-bold">
                                {request.doctorName.charAt(request.doctorName.indexOf('.') + 2)}
                              </div>
                              <div>
                                <h4 className="text-lg font-bold">{request.doctorName}</h4>
                                <p className="text-sm text-gray-600">{request.specialty}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-medium">{request.rating}</span>
                                  <span className="text-xs text-gray-500">• {request.experience} خبرة</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                              <div>
                                <p className="text-xs text-gray-600 mb-1">العيادة المطلوبة</p>
                                <p className="text-sm font-medium">{request.clinicName}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600 mb-1">الفرع</p>
                                <p className="text-sm font-medium">{request.branchName}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600 mb-1">نوع الانضمام</p>
                                <p className="text-sm font-medium">{request.joinType}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="size-3" />
                              <span>تاريخ الطلب: {request.requestDate}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 mr-4">
                            <Button 
                              size="sm"
                              onClick={() => handleViewDoctorRequest(request)}
                              className="bg-teal-600 hover:bg-teal-700"
                            >
                              <Eye className="size-4 ml-1" />
                              مراجعة
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="approved" className="mt-6">
                <Card className="p-12 text-center bg-white border-0 shadow-sm">
                  <CheckCircle className="size-16 mx-auto mb-4 text-emerald-500" />
                  <p className="text-gray-500">لا يوجد أطباء معتمدون حالياً</p>
                </Card>
              </TabsContent>

              <TabsContent value="rejected" className="mt-6">
                <Card className="p-12 text-center bg-white border-0 shadow-sm">
                  <XCircle className="size-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">لا توجد طلبات مرفوضة</p>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Doctor Request Review Dialog */}
            <Dialog open={isDoctorRequestDialogOpen} onOpenChange={setIsDoctorRequestDialogOpen}>
              <DialogContent className="max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle>مراجعة طلب انضمام طبيب</DialogTitle>
                  <DialogDescription>
                    راجع بيانات الطبيب واتخذ قراراً بالموافقة أو الرفض
                  </DialogDescription>
                </DialogHeader>
                {selectedDoctorRequest && (
                  <div className="space-y-4 py-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                        {selectedDoctorRequest.doctorName.charAt(selectedDoctorRequest.doctorName.indexOf('.') + 2)}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{selectedDoctorRequest.doctorName}</h4>
                        <p className="text-gray-600">{selectedDoctorRequest.specialty}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{selectedDoctorRequest.rating}</span>
                          <span className="text-sm text-gray-500">• {selectedDoctorRequest.experience} خبرة</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-teal-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">العيادة المطلوبة</p>
                        <p className="font-bold">{selectedDoctorRequest.clinicName}</p>
                      </div>
                      <div className="p-4 bg-teal-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">الفرع</p>
                        <p className="font-bold">{selectedDoctorRequest.branchName}</p>
                      </div>
                      <div className="p-4 bg-teal-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">نوع الانضمام</p>
                        <p className="font-bold">{selectedDoctorRequest.joinType}</p>
                      </div>
                      <div className="p-4 bg-teal-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">تاريخ الطلب</p>
                        <p className="font-bold">{selectedDoctorRequest.requestDate}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="size-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-900">تنبيه مهم</p>
                          <p className="text-sm text-amber-800 mt-1">
                            بعد الموافقة على الطلب، سيحتاج الطبيب إلى موافقة إدارة المنصة قبل الظهور للمرضى.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter className="gap-2">
                  <Button 
                    variant="outline" 
                    className="text-red-600 hover:bg-red-50"
                    onClick={handleRejectDoctorRequest}
                  >
                    <XCircle className="size-4 ml-1" />
                    رفض الطلب
                  </Button>
                  <Button 
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={handleApproveDoctorRequest}
                  >
                    <CheckCircle className="size-4 ml-1" />
                    الموافقة على الطلب
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Team Management Tab */}
          <TabsContent value="team">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold">فريق إدارة المنشأة</h3>
                <p className="text-sm text-gray-600">إدارة الصلاحيات والمستخدمين</p>
              </div>
              <Button onClick={() => setIsAddTeamMemberOpen(true)} className="bg-teal-600 hover:bg-teal-700">
                <Plus className="size-4 ml-2" />
                إضافة عضو
              </Button>
            </div>

            <div className="grid gap-4">
              {teamMembers.map((member) => (
                <Card key={member.id} className="p-6 bg-white border-0 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold">{member.name}</h4>
                          {member.isOwner && (
                            <Badge className="bg-amber-600">مالك الحساب</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Phone className="size-3" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="size-3" />
                            <span>{member.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!member.isOwner && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="size-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Add Team Member Dialog */}
            <Dialog open={isAddTeamMemberOpen} onOpenChange={setIsAddTeamMemberOpen}>
              <DialogContent className="max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle>إضافة عضو جديد للفريق</DialogTitle>
                  <DialogDescription>
                    أضف عضو جديد لإدارة المنشأة مع تحديد الصلاحيات المناسبة
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>اسم العضو</Label>
                      <Input placeholder="الاسم الكامل" className="mt-2" />
                    </div>
                    <div>
                      <Label>الدور الوظيفي</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="اختر الدور" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="branch_manager">مدير فرع</SelectItem>
                          <SelectItem value="reception">موظف استقبال</SelectItem>
                          <SelectItem value="insurance">موظف تأمين</SelectItem>
                          <SelectItem value="doctor_approval">مسؤول اعتماد أطباء</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>البريد الإلكتروني</Label>
                      <Input type="email" placeholder="email@example.com" className="mt-2" />
                    </div>
                    <div>
                      <Label>رقم الهاتف</Label>
                      <Input placeholder="+967 7XX XXX XXX" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-3 block">الصلاحيات</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Checkbox id="perm-branches" />
                        <label htmlFor="perm-branches" className="text-sm font-medium">
                          إدارة الفروع
                        </label>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Checkbox id="perm-doctors" />
                        <label htmlFor="perm-doctors" className="text-sm font-medium">
                          اعتماد الأطباء
                        </label>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Checkbox id="perm-appointments" />
                        <label htmlFor="perm-appointments" className="text-sm font-medium">
                          إدارة الحجوزات
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddTeamMemberOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setIsAddTeamMemberOpen(false)}>
                    إضافة العضو
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance">
            <Card className="p-6 bg-white border-0 shadow-sm mb-6">
              <h3 className="text-lg font-bold mb-4">شركات التأمين المقبولة</h3>
              <p className="text-sm text-gray-600 mb-6">
                اختر شركات التأمين التي تقبلها المنشأة. يمكنك تحديد شركات مختلفة لكل فرع.
              </p>
              
              <div className="space-y-3">
                {insuranceCompanies.map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="size-5 text-teal-600" />
                      <span className="font-medium">{company.name}</span>
                    </div>
                    <Switch defaultChecked={company.enabled} />
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  حفظ الإعدادات
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white border-0 shadow-sm">
              <h3 className="text-lg font-bold mb-4">إعدادات التأمين حسب الفرع</h3>
              <p className="text-sm text-gray-600 mb-6">
                يمكنك تخصيص شركات التأمين المقبولة لكل فرع بشكل مستقل
              </p>
              
              <div className="space-y-4">
                {branches.map((branch) => (
                  <div key={branch.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold mb-1">{branch.name}</h4>
                        <p className="text-sm text-gray-600">
                          {insuranceCompanies.filter(c => c.enabled).length} شركة تأمين مفعّلة
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Settings className="size-4 ml-1" />
                        إدارة التأمين
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Advertisements Tab */}
          <TabsContent value="advertisements">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold">الإعلانات والنشر</h3>
                <p className="text-sm text-gray-600">إدارة الإعلانات الداخلية والترويجية</p>
              </div>
              <Button onClick={() => setIsAddAdvertisementOpen(true)} className="bg-teal-600 hover:bg-teal-700">
                <Plus className="size-4 ml-2" />
                إنشاء إعلان
              </Button>
            </div>

            {/* Advertisement Types Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 border-0">
                <div className="flex items-start gap-3">
                  <FileText className="size-6 text-teal-600" />
                  <div>
                    <h4 className="font-bold mb-1">إعلانات داخلية</h4>
                    <p className="text-sm text-gray-700">
                      تظهر داخل صفحة المنشأة فقط. لا تحتاج موافقة إدارية.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-0">
                <div className="flex items-start gap-3">
                  <Star className="size-6 text-amber-600" />
                  <div>
                    <h4 className="font-bold mb-1">إعلانات الواجهة الرئيسية</h4>
                    <p className="text-sm text-gray-700">
                      تظهر في الصفحة الرئيسية. تحتاج موافقة إدارة المنصة.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Advertisements List */}
            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">الكل</TabsTrigger>
                <TabsTrigger value="active">نشط</TabsTrigger>
                <TabsTrigger value="pending">قيد المراجعة</TabsTrigger>
                <TabsTrigger value="rejected">مرفوض</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid gap-4">
                  {advertisements.map((ad) => (
                    <Card key={ad.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 h-48 md:h-auto">
                          <img 
                            src={ad.image} 
                            alt={ad.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-lg mb-1">{ad.title}</h4>
                              <p className="text-sm text-gray-600">{ad.description}</p>
                            </div>
                            <div className="flex gap-2 mr-4">
                              {ad.status === 'active' && (
                                <Badge className="bg-emerald-600">نشط</Badge>
                              )}
                              {ad.status === 'pending' && (
                                <Badge className="bg-amber-600">قيد المراجعة</Badge>
                              )}
                              {ad.type === 'homepage' && (
                                <Badge variant="outline" className="border-amber-600 text-amber-600">
                                  <Star className="size-3 ml-1" />
                                  ترويجي
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="size-4" />
                              <span>من {ad.startDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="size-4" />
                              <span>إلى {ad.endDate}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="size-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="size-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="active" className="mt-6">
                <div className="grid gap-4">
                  {advertisements.filter(ad => ad.status === 'active').map((ad) => (
                    <Card key={ad.id} className="overflow-hidden border-0 shadow-sm">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 h-48 md:h-auto">
                          <img 
                            src={ad.image} 
                            alt={ad.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <h4 className="font-bold text-lg mb-1">{ad.title}</h4>
                          <p className="text-sm text-gray-600">{ad.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-6">
                <div className="grid gap-4">
                  {advertisements.filter(ad => ad.status === 'pending').map((ad) => (
                    <Card key={ad.id} className="overflow-hidden border-0 shadow-sm">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 h-48 md:h-auto">
                          <img 
                            src={ad.image} 
                            alt={ad.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <h4 className="font-bold text-lg mb-1">{ad.title}</h4>
                          <p className="text-sm text-gray-600 mb-4">{ad.description}</p>
                          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-sm text-amber-800 flex items-center gap-2">
                              <AlertCircle className="size-4" />
                              في انتظار موافقة إدارة المنصة
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rejected" className="mt-6">
                <Card className="p-12 text-center bg-white border-0 shadow-sm">
                  <XCircle className="size-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">لا توجد إعلانات مرفوضة</p>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Add Advertisement Dialog */}
            <Dialog open={isAddAdvertisementOpen} onOpenChange={setIsAddAdvertisementOpen}>
              <DialogContent className="max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle>إنشاء إعلان جديد</DialogTitle>
                  <DialogDescription>
                    أنشئ إعلان داخلي أو ترويجي للواجهة الرئيسية
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>نوع الإعلان</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="اختر نوع الإعلان" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">
                          <div className="flex items-center gap-2">
                            <FileText className="size-4" />
                            <span>إعلان داخلي (لا يحتاج موافقة)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="homepage">
                          <div className="flex items-center gap-2">
                            <Star className="size-4" />
                            <span>إعلان الواجهة الرئيسية (يحتاج موافقة)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>عنوان الإعلان</Label>
                    <Input placeholder="مثال: عرض خاص على الفحص الشامل" className="mt-2" />
                  </div>
                  <div>
                    <Label>الوصف</Label>
                    <Textarea 
                      placeholder="أدخل وصف تفصيلي للعرض"
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>تاريخ البدء</Label>
                      <Input type="date" className="mt-2" />
                    </div>
                    <div>
                      <Label>تاريخ الانتهاء</Label>
                      <Input type="date" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label>صورة الإعلان</Label>
                    <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-teal-600 transition-colors cursor-pointer">
                      <Upload className="size-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">اضغط لرفع صورة أو اسحب الصورة هنا</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG (بحد أقصى 2MB)</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddAdvertisementOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setIsAddAdvertisementOpen(false)}>
                    إنشاء الإعلان
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
