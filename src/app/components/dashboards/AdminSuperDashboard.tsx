import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/app/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/app/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { toast } from 'sonner';
import { FinancialManagementSection } from '@/app/components/dashboards/sections/FinancialManagementSection';
import { LabsManagementSection } from '@/app/components/dashboards/sections/LabsManagementSection';
import { WalletsManagementSection } from '@/app/components/dashboards/sections/WalletsManagementSection';
import { 
  Shield, Menu, Search, Bell, User, ChevronRight, ChevronDown,
  LayoutDashboard, CheckSquare, Stethoscope, Building2, Users,
  Calendar, CreditCard, MessageSquare, Award, FileText, Megaphone,
  BarChart3, Settings, Plus, Edit2, Trash2, Eye, X, Check,
  Clock, AlertTriangle, TrendingUp, Activity, DollarSign,
  Lock, Ban, UserCheck, Hospital, MapPin, Phone, Mail,
  Upload, Download, Filter, RefreshCw, AlertCircle, FileCheck,
  Target, Zap, PieChart, ChevronLeft, Home, XCircle, CheckCircle,
  FileDown, Send, MoreVertical, Star, TrendingDown
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, 
  Pie, Cell, AreaChart, Area 
} from 'recharts';

interface AdminSuperDashboardProps {
  onNavigate: (page: string) => void;
}

type Section = 
  | 'dashboard' 
  | 'approvals' 
  | 'providers' 
  | 'clinics' 
  | 'users' 
  | 'bookings' 
  | 'payments' 
  | 'messages' 
  | 'quality' 
  | 'audit' 
  | 'ads' 
  | 'reports' 
  | 'settings'
  | 'financial'
  | 'labs'
  | 'wallets';

export function AdminSuperDashboard({ onNavigate }: AdminSuperDashboardProps) {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  
  // Mock Data
  const kpiData = {
    pendingApprovals: 12,
    totalBookings: 3456,
    openComplaints: 8,
    todayRevenue: '124,500'
  };

  const bookingsChartData = [
    { name: 'السبت', bookings: 145, revenue: 24500 },
    { name: 'الأحد', bookings: 167, revenue: 28900 },
    { name: 'الاثنين', bookings: 189, revenue: 31200 },
    { name: 'الثلاثاء', bookings: 156, revenue: 26800 },
    { name: 'الأربعاء', bookings: 178, revenue: 29500 },
    { name: 'الخميس', bookings: 198, revenue: 33400 },
    { name: 'الجمعة', bookings: 123, revenue: 21100 }
  ];

  const specialtiesData = [
    { name: 'أمراض القلب', value: 25, color: '#0D9488' },
    { name: 'الأطفال', value: 20, color: '#115E59' },
    { name: 'النساء والولادة', value: 18, color: '#0F766E' },
    { name: 'العظام', value: 15, color: '#14B8A6' },
    { name: 'الأسنان', value: 12, color: '#2DD4BF' },
    { name: 'أخرى', value: 10, color: '#5EEAD4' }
  ];

  const criticalAlerts = [
    { id: '1', severity: 'high', title: 'طبيب جديد ينتظر الموافقة', description: 'د. أحمد الحميري قدم طلب انضمام منذ 3 ساعات', time: 'منذ 3 ساعات' },
    { id: '2', severity: 'medium', title: 'تراجع ت��ييم فرع', description: 'عيادة النور - انخفض التقييم من 4.8 إلى 4.2', time: 'منذ يوم' },
    { id: '3', severity: 'low', title: 'موعد إلغاء الموافقة المسبقة', description: '15 موعد تأمين بحاجة موافقة يدوية', time: 'منذ يومين' }
  ];

  const pendingApprovals = [
    { id: '1', type: 'doctor', name: 'د. خالد السعدي', specialty: 'أمراض القلب', license: 'YE-12345-2024', status: 'pending', submittedDate: '2026-01-20', documents: ['الترخيص الطبي', 'الشهادة الجامعية', 'شهادة الخبرة'] },
    { id: '2', type: 'clinic', name: 'مركز الرعاية الشاملة', location: 'عدن - خورمكسر', license: 'YE-67890-2024', status: 'pending', submittedDate: '2026-01-19', documents: ['ترخيص المنشأة', 'تصريح الصحة'] },
    { id: '3', type: 'ad', name: 'إعلان حملة عيادة الأسنان', advertiser: 'عيادة النخبة', duration: '30 يوم', budget: '50,000', status: 'pending', submittedDate: '2026-01-18' }
  ];

  const serviceProviders = [
    { id: '1', name: 'د. فاطمة باحارثة', specialty: 'أمراض القلب', license: 'YE-11111-2023', status: 'active', rating: 4.9, reviews: 543, appointments: 1234, joinedDate: '2023-05-15' },
    { id: '2', name: 'د. محمد الحبشي', specialty: 'الأطفال', license: 'YE-22222-2023', status: 'active', rating: 4.7, reviews: 432, appointments: 987, joinedDate: '2023-08-22' },
    { id: '3', name: 'د. أمينة السعدي', specialty: 'النساء والولادة', license: 'YE-33333-2024', status: 'suspended', rating: 4.2, reviews: 234, appointments: 456, joinedDate: '2024-01-10' }
  ];

  const clinicsData = [
    { id: '1', name: 'مستشفى الجمهورية التعليمي', type: 'hospital', status: 'active', branches: 8, doctors: 25, rating: 4.7, location: 'عدن - كريتر', bookingEnabled: true },
    { id: '2', name: 'مركز عدن الطبي', type: 'medical_center', status: 'active', branches: 3, doctors: 15, rating: 4.9, location: 'عدن - خورمكسر', bookingEnabled: true },
    { id: '3', name: 'مستشفى الأمل التخصصي', type: 'hospital', status: 'pending', branches: 2, doctors: 8, rating: 4.5, location: 'عدن - المعلا', bookingEnabled: false }
  ];

  const usersData = [
    { id: '1', name: 'أحمد محمد السالم', email: 'ahmed.salem@example.com', phone: '+967 777 123 456', status: 'active', appointments: 12, joined: '2025-06-15', lastActive: '2026-01-20' },
    { id: '2', name: 'فاطمة علي الحبشي', email: 'fatima.ali@example.com', phone: '+967 777 234 567', status: 'active', appointments: 8, joined: '2025-08-22', lastActive: '2026-01-19' },
    { id: '3', name: 'خالد عبدالله باشا', email: 'khaled.basha@example.com', phone: '+967 777 345 678', status: 'blocked', appointments: 3, joined: '2025-12-01', lastActive: '2026-01-10' }
  ];

  const bookingsData = [
    { id: '1', patient: 'أحمد محمد السالم', doctor: 'د. فاطمة باحارثة', clinic: 'مستشفى الجمهورية', date: '2026-01-25', time: '10:00 AM', status: 'confirmed', amount: '5000', cancellationReason: '' },
    { id: '2', patient: 'فاطمة علي الحبشي', doctor: 'د. محمد الحبشي', clinic: 'مركز عدن الطبي', date: '2026-01-25', time: '11:30 AM', status: 'confirmed', amount: '4500', cancellationReason: '' },
    { id: '3', patient: 'خالد عبدالله باشا', doctor: 'د. أمينة السعدي', clinic: 'مستشفى الأمل', date: '2026-01-24', time: '02:00 PM', status: 'cancelled', amount: '6000', cancellationReason: 'المريض طلب الإلغاء' },
    { id: '4', patient: 'سعاد أحمد علي', doctor: 'د. فاطمة باحارثة', clinic: 'مستشفى الجمهورية', date: '2026-01-23', time: '03:30 PM', status: 'completed', amount: '5000', cancellationReason: '' },
    { id: '5', patient: 'علي حسن محمد', doctor: 'د. محمد الحبشي', clinic: 'مركز عدن الطبي', date: '2026-01-22', time: '09:00 AM', status: 'no_show', amount: '4500', cancellationReason: 'المريض لم يحضر' }
  ];

  const paymentsData = [
    { id: '1', transaction: 'TXN-2026-001234', patient: 'أحمد محمد السالم', amount: '5000', method: 'بطاقة ائتمان', status: 'success', date: '2026-01-25 09:45 AM' },
    { id: '2', transaction: 'TXN-2026-001235', patient: 'فاطمة علي الحبشي', amount: '4500', method: 'نقدي', status: 'success', date: '2026-01-25 11:20 AM' },
    { id: '3', transaction: 'TXN-2026-001236', patient: 'خالد عبدالله باشا', amount: '6000', method: 'بطاقة ائتمان', status: 'failed', date: '2026-01-24 02:15 PM' },
    { id: '4', transaction: 'TXN-2026-001237', patient: 'سعاد أحمد علي', amount: '5000', method: 'محفظة إلكترونية', status: 'refund_pending', date: '2026-01-23 03:45 PM' }
  ];

  const complaintsData = [
    { id: '1', type: 'complaint', subject: 'تأخر في موعد الطبيب', submitter: 'أحمد محمد السالم', relatedTo: 'د. فاطمة باحارثة', status: 'open', priority: 'high', date: '2026-01-25 08:00 AM' },
    { id: '2', type: 'technical', subject: 'مشكلة في الدفع الإلكتروني', submitter: 'فاطمة علي الحبشي', relatedTo: 'النظام', status: 'in_progress', priority: 'medium', date: '2026-01-24 02:30 PM' },
    { id: '3', type: 'objection', subject: 'اعتراض على تقيي��', submitter: 'د. محمد الحبشي', relatedTo: 'نظام التقييم', status: 'escalated', priority: 'medium', date: '2026-01-23 11:00 AM' },
    { id: '4', type: 'complaint', subject: 'جودة الخدمة', submitter: 'خالد عبدالله باشا', relatedTo: 'د. أمينة السعدي', status: 'resolved', priority: 'low', date: '2026-01-22 04:15 PM' }
  ];

  const auditLogs = [
    { id: '1', admin: 'مدير النظام', action: 'موافقة على طبيب', details: 'تمت الموافقة على د. خالد السعدي', timestamp: '2026-01-25 10:30 AM', ip: '192.168.1.100' },
    { id: '2', admin: 'مدير النظام', action: 'تعديل مركز طبي', details: 'تحديث بيانات مركز عدن الطبي', timestamp: '2026-01-25 09:15 AM', ip: '192.168.1.100' },
    { id: '3', admin: 'مدير العمليات', action: 'حظر مستخدم', details: 'حظر المستخدم خالد عبدالله باشا', timestamp: '2026-01-24 03:45 PM', ip: '192.168.1.101' },
    { id: '4', admin: 'مدير النظام', action: 'إضافة إعلان', details: 'إضافة حملة إعلانية جديدة', timestamp: '2026-01-24 11:20 AM', ip: '192.168.1.100' }
  ];

  const adsData = [
    { id: '1', title: 'حملة عيادة الأسنان', advertiser: 'عيادة النخبة', type: 'banner', position: 'homepage_top', duration: '30 يوم', budget: '50,000', status: 'active', clicks: 1234, impressions: 45678, startDate: '2026-01-01', endDate: '2026-01-31' },
    { id: '2', title: 'مركز القلب المميز', advertiser: 'مركز القلب', type: 'featured', position: 'search_results', duration: '15 يوم', budget: '30,000', status: 'active', clicks: 567, impressions: 23456, startDate: '2026-01-15', endDate: '2026-01-30' },
    { id: '3', title: 'عرض خاص - فحوصات', advertiser: 'مختبر التحاليل', type: 'banner', position: 'sidebar', duration: '7 أيام', budget: '15,000', status: 'pending', clicks: 0, impressions: 0, startDate: '2026-01-26', endDate: '2026-02-02' }
  ];

  const labsData = [
    { id: '1', name: 'مختبر التشخيص المتقدم', location: 'عدن - خورمكسر', status: 'active', tests: 456, revenue: '125,000', monthlyFee: '12,500', lastPayment: '2026-01-01', nextBilling: '2026-02-01' },
    { id: '2', name: 'مختبر الصحة الشاملة', location: 'عدن - كريتر', status: 'active', tests: 234, revenue: '78,000', monthlyFee: '7,800', lastPayment: '2026-01-01', nextBilling: '2026-02-01' },
    { id: '3', name: 'مختبر الدقة للتحاليل', location: 'عدن - المعلا', status: 'suspended', tests: 89, revenue: '34,000', monthlyFee: '3,400', lastPayment: '2025-12-01', nextBilling: 'متأخر' }
  ];

  const walletsData = [
    { id: '1', provider: 'د. فاطمة باحارثة', providerType: 'doctor', balance: '145,000', pending: '25,000', withdrawn: '320,000', lastTransaction: '2026-01-25', status: 'active' },
    { id: '2', provider: 'مركز عدن الطبي', providerType: 'medical_center', balance: '234,000', pending: '45,000', withdrawn: '567,000', lastTransaction: '2026-01-24', status: 'active' },
    { id: '3', provider: 'مختبر التشخيص المتقدم', providerType: 'lab', balance: '56,000', pending: '12,500', withdrawn: '89,000', lastTransaction: '2026-01-23', status: 'active' }
  ];

  const financialSummaryData = {
    totalRevenue: '2,450,000',
    platformFees: '245,000',
    doctorRevenue: '1,840,000',
    labRevenue: '365,000',
    pendingPayments: '125,000',
    monthlyGrowth: '+18%'
  };

  // Navigation Menu Items
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'لوحة التحكم التنفيذية', restricted: false },
    { id: 'approvals', icon: CheckSquare, label: 'الاعتمادات والتوثيق', restricted: false },
    { id: 'providers', icon: Stethoscope, label: 'مقدمو الخدمة', restricted: false },
    { id: 'clinics', icon: Building2, label: 'العيادات والفروع', restricted: false },
    { id: 'users', icon: Users, label: 'إدارة المستخدمين', restricted: false },
    { id: 'bookings', icon: Calendar, label: 'الحجوزات', restricted: true, readOnly: true },
    { id: 'payments', icon: CreditCard, label: 'المدفوع��ت', restricted: true, readOnly: true },
    { id: 'messages', icon: MessageSquare, label: 'الرسائل والتنبيهات', restricted: false },
    { id: 'quality', icon: Award, label: 'الجودة والدعم', restricted: false },
    { id: 'audit', icon: FileText, label: 'سجل التدقيق', restricted: true, readOnly: true },
    { id: 'ads', icon: Megaphone, label: 'الإعلانات والحملات', restricted: false },
    { id: 'reports', icon: BarChart3, label: 'التقارير التنفيذية', restricted: false },
    { id: 'settings', icon: Settings, label: 'الإعدادات العامة', restricted: false }
  ];

  // Handlers
  const handleApprove = () => {
    toast.success(`تمت الموافقة على ${selectedEntity?.name}`);
    setShowApprovalModal(false);
    setApprovalNotes('');
  };

  const handleRequestModification = () => {
    if (!approvalNotes.trim()) {
      toast.error('يجب إدخال ملاحظات التعديل المطلوبة');
      return;
    }
    toast.warning(`تم طلب تعديل من ${selectedEntity?.name}`);
    setShowApprovalModal(false);
    setApprovalNotes('');
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error('يجب إدخال سبب الرفض');
      return;
    }
    toast.error(`تم رفض ${selectedEntity?.name}`);
    setShowApprovalModal(false);
    setRejectReason('');
  };

  // Sidebar Component
  const renderSidebar = () => (
    <div 
      className={`bg-gradient-to-b from-[#0D9488] to-[#115E59] text-white h-screen overflow-y-auto sticky top-0 transition-all duration-300 border-l border-white/10 ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      }`}
      dir="rtl"
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-base">الإدارة العليا</h2>
                <p className="text-xs text-teal-100">DocGate Executive</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-white hover:bg-white/10"
          >
            {sidebarCollapsed ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-white text-teal-700 shadow-lg' 
                    : 'text-white hover:bg-white/10'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-teal-700' : 'text-white'}`} />
                  {item.readOnly && (
                    <Lock className="w-3 h-3 absolute -top-1 -right-1 text-amber-400" />
                  )}
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 text-right">
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.readOnly && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs text-amber-300">قراءة فق��</span>
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  // Top Bar Component
  const renderTopBar = () => (
    <div className="bg-white border-b sticky top-0 z-20 shadow-sm" dir="rtl">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="البحث الشامل عبر النظام..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-gray-50 border-gray-200 focus:ring-teal-600"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 pr-4 border-r">
            <div className="text-right">
              <p className="text-sm font-medium">مدير النظام</p>
              <p className="text-xs text-gray-500">الإدارة العليا</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Exit */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onNavigate('home')}
            className="text-gray-600"
          >
            <Home className="w-4 h-4 ml-2" />
            العودة للموقع
          </Button>
        </div>
      </div>
    </div>
  );

  // Main Content Sections
  const renderDashboard = () => (
    <div className="space-y-6" dir="rtl">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-teal-50 to-white border-teal-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">الاعتمادات المعلقة</p>
              <h3 className="text-3xl font-bold text-teal-700">{kpiData.pendingApprovals}</h3>
              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                بحاجة لمراجعة فورية
              </p>
            </div>
            <div className="p-3 bg-teal-100 rounded-lg">
              <CheckSquare className="w-6 h-6 text-teal-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">إجمالي الحجوزات</p>
              <h3 className="text-3xl font-bold text-emerald-700">{kpiData.totalBookings.toLocaleString()}</h3>
              <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% عن الشهر الماضي
              </p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Calendar className="w-6 h-6 text-emerald-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">البلاغات الحرجة المفتوحة</p>
              <h3 className="text-3xl font-bold text-amber-700">{kpiData.openComplaints}</h3>
              <p className="text-xs text-gray-600 mt-2">تحتاج متابعة</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-amber-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-teal-50 to-white border-teal-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">إيرادات اليوم</p>
              <h3 className="text-3xl font-bold text-teal-700">{kpiData.todayRevenue}</h3>
              <p className="text-xs text-gray-600 mt-2">ريال يمني</p>
            </div>
            <div className="p-3 bg-teal-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-teal-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Critical Alerts Panel */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            التنبيهات الحرجة
          </h3>
          <Button variant="ghost" size="sm">
            عرض الكل
            <ChevronLeft className="w-4 h-4 mr-2" />
          </Button>
        </div>
        <div className="space-y-3">
          {criticalAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-4 rounded-lg border-r-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                alert.severity === 'medium' ? 'bg-amber-50 border-amber-500' :
                'bg-blue-50 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{alert.title}</h4>
                  <p className="text-sm text-gray-600">{alert.description}</p>
                </div>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">أداء الحجوزات الأسبوعية</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bookingsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" style={{ fontSize: '12px' }} />
              <YAxis style={{ fontSize: '12px' }} />
              <RechartsTooltip />
              <Area type="monotone" dataKey="bookings" stroke="#0D9488" fill="#0D9488" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Specialties Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">توزيع التخصصات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={specialtiesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {specialtiesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">الإجراءات السريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2"
            onClick={() => setActiveSection('approvals')}
          >
            <CheckSquare className="w-6 h-6" />
            <span className="text-sm">مراجعة الاعتمادات</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2"
            onClick={() => setActiveSection('quality')}
          >
            <Award className="w-6 h-6" />
            <span className="text-sm">الشكاوى المفتوحة</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2"
            onClick={() => setActiveSection('reports')}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-sm">تصدير تقرير</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2"
            onClick={() => setActiveSection('messages')}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm">إرسال إشعار</span>
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderApprovals = () => (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">الاعتمادات والتوثيق</h2>
          <p className="text-gray-600 mt-1">مراجعة واعتماد مقدمي الخدمات والعيادات والإعلانات</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ال��ل</SelectItem>
              <SelectItem value="doctor">أطباء</SelectItem>
              <SelectItem value="clinic">عيادات</SelectItem>
              <SelectItem value="ad">إعلانات</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            فلترة
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>النوع</TableHead>
              <TableHead>الاسم / العنوان</TableHead>
              <TableHead>التفاصيل</TableHead>
              <TableHead>رقم الترخيص</TableHead>
              <TableHead>تاريخ التقديم</TableHead>
              <TableHead>المستندات</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingApprovals.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Badge variant="secondary">
                    {item.type === 'doctor' && 'طبيب'}
                    {item.type === 'clinic' && 'عيادة'}
                    {item.type === 'ad' && 'إعلان'}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {item.specialty || item.location || item.advertiser}
                </TableCell>
                <TableCell className="text-sm">{item.license}</TableCell>
                <TableCell className="text-sm">{item.submittedDate}</TableCell>
                <TableCell>
                  {item.documents && (
                    <Badge variant="outline" className="text-xs">
                      {item.documents.length} مستند
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedEntity(item);
                        setShowDetailsDrawer(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Dialog open={showApprovalModal && selectedEntity?.id === item.id} onOpenChange={setShowApprovalModal}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="bg-teal-600 hover:bg-teal-700"
                          onClick={() => setSelectedEntity(item)}
                        >
                          مراجعة
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl" dir="rtl">
                        <DialogHeader>
                          <DialogTitle>مراجعة طلب الاعتماد</DialogTitle>
                          <DialogDescription>
                            اتخذ قرارًا بشأن {item.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          {/* Details */}
                          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                              <Label className="text-xs text-gray-600">النوع</Label>
                              <p className="font-medium">
                                {item.type === 'doctor' && 'طبيب'}
                                {item.type === 'clinic' && 'عيادة'}
                                {item.type === 'ad' && 'إعلان'}
                              </p>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">رقم الترخيص</Label>
                              <p className="font-medium">{item.license}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">تاريخ التقديم</Label>
                              <p className="font-medium">{item.submittedDate}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">التفاصيل</Label>
                              <p className="font-medium">{item.specialty || item.location || item.advertiser}</p>
                            </div>
                          </div>

                          {/* Documents */}
                          {item.documents && (
                            <div>
                              <Label className="mb-2 block">المستندات المرفقة</Label>
                              <div className="space-y-2">
                                {item.documents.map((doc, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                      <FileCheck className="w-4 h-4 text-teal-600" />
                                      <span className="text-sm">{doc}</span>
                                    </div>
                                    <Button size="sm" variant="ghost">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Notes */}
                          <div>
                            <Label>ملاحظات (اختياري)</Label>
                            <Textarea 
                              placeholder="أضف ملاحظات أو تعليقات..."
                              value={approvalNotes}
                              onChange={(e) => setApprovalNotes(e.target.value)}
                              rows={3}
                            />
                          </div>

                          {/* Rejection Reason */}
                          <div>
                            <Label>سبب الرفض (إذا كنت سترفض)</Label>
                            <Textarea 
                              placeholder="اذكر السبب التفصيلي للرفض..."
                              value={rejectReason}
                              onChange={(e) => setRejectReason(e.target.value)}
                              rows={2}
                            />
                          </div>

                          {/* Actions */}
                          <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button 
                              variant="destructive"
                              onClick={handleReject}
                            >
                              <XCircle className="w-4 h-4 ml-2" />
                              رفض
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={handleRequestModification}
                            >
                              <Edit2 className="w-4 h-4 ml-2" />
                              طلب تعديل
                            </Button>
                            <Button 
                              className="bg-teal-600 hover:bg-teal-700"
                              onClick={handleApprove}
                            >
                              <CheckCircle className="w-4 h-4 ml-2" />
                              موافقة
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderProviders = () => (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">مقدمو الخدمة</h2>
          <p className="text-gray-600 mt-1">الإشراف على الأطباء والمراكز الطبية</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="suspended">موقوف</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم الطبيب</TableHead>
              <TableHead>التخصص</TableHead>
              <TableHead>رقم الترخيص</TableHead>
              <TableHead>التقييم</TableHead>
              <TableHead>الحجوزات</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>تاريخ الانضمام</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceProviders.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell className="font-medium">{provider.name}</TableCell>
                <TableCell>{provider.specialty}</TableCell>
                <TableCell className="text-sm">{provider.license}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{provider.rating}</span>
                    <span className="text-xs text-gray-500">({provider.reviews})</span>
                  </div>
                </TableCell>
                <TableCell>{provider.appointments.toLocaleString()}</TableCell>
                <TableCell>
                  {provider.status === 'active' ? (
                    <Badge className="bg-emerald-600">نشط</Badge>
                  ) : (
                    <Badge variant="destructive">موقوف</Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm">{provider.joinedDate}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {provider.status === 'active' ? (
                      <Button size="sm" variant="destructive">
                        <Ban className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <UserCheck className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderClinics = () => (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">العيادات والفروع</h2>
          <p className="text-gray-600 mt-1">الإشراف التشغيلي على المراكز الطبية والفروع</p>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المنشأة</TableHead>
              <TableHead>النوع</TableHead>
              <TableHead>الموقع</TableHead>
              <TableHead>الفروع</TableHead>
              <TableHead>الأطباء</TableHead>
              <TableHead>التقييم</TableHead>
              <TableHead>الحجز</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clinicsData.map((clinic) => (
              <TableRow key={clinic.id}>
                <TableCell className="font-medium">{clinic.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {clinic.type === 'hospital' && 'مستشفى'}
                    {clinic.type === 'medical_center' && 'مركز طبي'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{clinic.location}</TableCell>
                <TableCell>{clinic.branches}</TableCell>
                <TableCell>{clinic.doctors}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{clinic.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Switch checked={clinic.bookingEnabled} />
                </TableCell>
                <TableCell>
                  {clinic.status === 'active' ? (
                    <Badge className="bg-emerald-600">نشط</Badge>
                  ) : (
                    <Badge variant="secondary">قيد المراجعة</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
          <p className="text-gray-600 mt-1">الرقابة على حسابات المستخدمين</p>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>الحجوزات</TableHead>
              <TableHead>تا��يخ الانضمام</TableHead>
              <TableHead>آخر نشاط</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-sm">{user.email}</TableCell>
                <TableCell className="text-sm">{user.phone}</TableCell>
                <TableCell>{user.appointments}</TableCell>
                <TableCell className="text-sm">{user.joined}</TableCell>
                <TableCell className="text-sm">{user.lastActive}</TableCell>
                <TableCell>
                  {user.status === 'active' ? (
                    <Badge className="bg-emerald-600">نشط</Badge>
                  ) : (
                    <Badge variant="destructive">محظور</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {user.status === 'active' ? (
                      <Button size="sm" variant="destructive">
                        <Ban className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <UserCheck className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">الحجوزات</h2>
          <Badge variant="outline" className="flex items-center gap-1 text-amber-600 border-amber-600">
            <Lock className="w-3 h-3" />
            قراءة فقط
          </Badge>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="confirmed">مؤكد</SelectItem>
            <SelectItem value="cancelled">ملغي</SelectItem>
            <SelectItem value="completed">مكتمل</SelectItem>
            <SelectItem value="no_show">لم يحضر</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-amber-200 bg-amber-50/30">
        <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-center gap-2 text-amber-800">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">هذا القسم للإشراف والمراقبة فقط - لا يمكن التعديل</span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المريض</TableHead>
              <TableHead>الطبيب</TableHead>
              <TableHead>العيادة</TableHead>
              <TableHead>التاريخ والوقت</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>سبب الإلغاء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingsData.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.patient}</TableCell>
                <TableCell>{booking.doctor}</TableCell>
                <TableCell className="text-sm">{booking.clinic}</TableCell>
                <TableCell className="text-sm">
                  <div>
                    <p>{booking.date}</p>
                    <p className="text-xs text-gray-500">{booking.time}</p>
                  </div>
                </TableCell>
                <TableCell>{booking.amount} ر.ي</TableCell>
                <TableCell>
                  {booking.status === 'confirmed' && <Badge className="bg-emerald-600">مؤكد</Badge>}
                  {booking.status === 'cancelled' && <Badge variant="destructive">ملغي</Badge>}
                  {booking.status === 'completed' && <Badge className="bg-teal-600">مكتمل</Badge>}
                  {booking.status === 'no_show' && <Badge variant="secondary">لم يحضر</Badge>}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {booking.cancellationReason || '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">المدفوعات</h2>
          <Badge variant="outline" className="flex items-center gap-1 text-red-600 border-red-600">
            <Lock className="w-3 h-3" />
            مقفل - قراءة فقط
          </Badge>
        </div>
      </div>

      <Card className="border-red-200 bg-red-50/30">
        <div className="p-4 bg-red-50 border-b border-red-200 flex items-center gap-2 text-red-800">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">هذا القسم مقفل ماليًا - لا يمكن إجراء تعديلات يدوية</span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم المعاملة</TableHead>
              <TableHead>المريض</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>طريقة الدفع</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>التاريخ والوقت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentsData.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-mono text-sm">{payment.transaction}</TableCell>
                <TableCell>{payment.patient}</TableCell>
                <TableCell className="font-medium">{payment.amount} ر.ي</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  {payment.status === 'success' && <Badge className="bg-emerald-600">ناجح</Badge>}
                  {payment.status === 'failed' && <Badge variant="destructive">فاشل</Badge>}
                  {payment.status === 'refund_pending' && <Badge variant="secondary">استرجاع معلق</Badge>}
                </TableCell>
                <TableCell className="text-sm">{payment.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">الرسائل والتنبيهات</h2>
          <p className="text-gray-600 mt-1">إرسال رسائل رسمية وتنبيهات للمستخدمين</p>
        </div>
        <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Send className="w-4 h-4 ml-2" />
              إرسال رسالة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl" dir="rtl">
            <DialogHeader>
              <DialogTitle>إرسال رسالة رسمية</DialogTitle>
              <DialogDescription>
                أرسل رسالة أو تنبيه للمستخدمين أو مقدمي الخدمة
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>المستهدفون</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة المستهدفة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_users">جميع المستخدمين</SelectItem>
                    <SelectItem value="providers">مقدمو الخدمة</SelectItem>
                    <SelectItem value="doctors">الأطباء فقط</SelectItem>
                    <SelectItem value="patients">المرضى فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>العنوان</Label>
                <Input placeholder="عنوان الرسالة" />
              </div>
              <div>
                <Label>نص الرسالة</Label>
                <Textarea 
                  placeholder="اكتب الرسالة هنا..."
                  rows={6}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowMessageModal(false)}>
                  إلغاء
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Send className="w-4 h-4 ml-2" />
                  إرسال
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <h3 className="font-bold mb-4">سجل الرسائل المرسلة</h3>
        <div className="space-y-3">
          <div className="p-4 border rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-semibold">إشعار صيانة النظام</h4>
                <p className="text-sm text-gray-600 mt-1">سيتم إجراء صيانة دورية على النظام يوم الجمعة...</p>
              </div>
              <Badge variant="secondary">جميع المستخدمين</Badge>
            </div>
            <p className="text-xs text-gray-500">2026-01-25 10:00 AM</p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-semibold">تحديث سياسة الإلغاء</h4>
                <p className="text-sm text-gray-600 mt-1">نود إعلامكم بتحديث سياسة إلغاء المواعيد...</p>
              </div>
              <Badge variant="secondary">الأطباء</Badge>
            </div>
            <p className="text-xs text-gray-500">2026-01-24 03:30 PM</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderQuality = () => (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">الجودة والدعم والامتثال</h2>
          <p className="text-gray-600 mt-1">إدارة الشكاوى والبلاغات والتقارير التقنية</p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="complaint">شكاوى</SelectItem>
            <SelectItem value="technical">تقارير تقنية</SelectItem>
            <SelectItem value="objection">اعتراضات</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>النوع</TableHead>
              <TableHead>الموضوع</TableHead>
              <TableHead>المُبلّغ</TableHead>
              <TableHead>متعلق بـ</TableHead>
              <TableHead>الأولوية</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complaintsData.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell>
                  <Badge variant="outline">
                    {complaint.type === 'complaint' && 'شكوى'}
                    {complaint.type === 'technical' && 'تقني'}
                    {complaint.type === 'objection' && 'اعتراض'}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{complaint.subject}</TableCell>
                <TableCell className="text-sm">{complaint.submitter}</TableCell>
                <TableCell className="text-sm">{complaint.relatedTo}</TableCell>
                <TableCell>
                  {complaint.priority === 'high' && <Badge variant="destructive">عالي</Badge>}
                  {complaint.priority === 'medium' && <Badge className="bg-amber-600">متوسط</Badge>}
                  {complaint.priority === 'low' && <Badge variant="secondary">منخفض</Badge>}
                </TableCell>
                <TableCell>
                  {complaint.status === 'open' && <Badge className="bg-red-600">مفتوح</Badge>}
                  {complaint.status === 'in_progress' && <Badge className="bg-amber-600">قيد المعالجة</Badge>}
                  {complaint.status === 'escalated' && <Badge variant="destructive">مصعّد</Badge>}
                  {complaint.status === 'resolved' && <Badge className="bg-emerald-600">مغلق</Badge>}
                </TableCell>
                <TableCell className="text-sm">{complaint.date}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderAudit = () => (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">سجل التدقيق</h2>
          <Badge variant="outline" className="flex items-center gap-1 text-red-600 border-red-600">
            <Lock className="w-3 h-3" />
            غير قابل للتعديل
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            فلترة
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>
        </div>
      </div>

      <Card className="border-red-200 bg-red-50/30">
        <div className="p-4 bg-red-50 border-b border-red-200 flex items-center gap-2 text-red-800">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">سجل ثابت غير قابل للحذف أو التعديل - للمراجعة والتدقيق فقط</span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المسؤول</TableHead>
              <TableHead>الإجراء</TableHead>
              <TableHead>التفاصيل</TableHead>
              <TableHead>الوقت والتاريخ</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id} className="cursor-not-allowed opacity-75">
                <TableCell className="font-medium">{log.admin}</TableCell>
                <TableCell>
                  <Badge variant="outline">{log.action}</Badge>
                </TableCell>
                <TableCell className="text-sm">{log.details}</TableCell>
                <TableCell className="text-sm">{log.timestamp}</TableCell>
                <TableCell className="font-mono text-xs">{log.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderAds = () => (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">الإعلانات والحملات</h2>
          <p className="text-gray-600 mt-1">إدارة الإعلانات والحملات التسويقية</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 ml-2" />
          إضافة حملة جديدة
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>العنوان</TableHead>
              <TableHead>المعلن</TableHead>
              <TableHead>النوع</TableHead>
              <TableHead>المدة</TableHead>
              <TableHead>الميزانية</TableHead>
              <TableHead>النقرات</TableHead>
              <TableHead>المشاهدات</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adsData.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell className="font-medium">{ad.title}</TableCell>
                <TableCell>{ad.advertiser}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {ad.type === 'banner' && 'بنر'}
                    {ad.type === 'featured' && 'مميز'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{ad.duration}</TableCell>
                <TableCell className="font-medium">{ad.budget} ر.ي</TableCell>
                <TableCell>{ad.clicks.toLocaleString()}</TableCell>
                <TableCell>{ad.impressions.toLocaleString()}</TableCell>
                <TableCell>
                  {ad.status === 'active' && <Badge className="bg-emerald-600">نشط</Badge>}
                  {ad.status === 'pending' && <Badge variant="secondary">معلق</Badge>}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6" dir="rtl">
      <div>
        <h2 className="text-2xl font-bold">التقارير التنفيذية</h2>
        <p className="text-gray-600 mt-1">تقارير وتحليلات شاملة للمنصة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <Calendar className="w-6 h-6 text-teal-700" />
            </div>
            <div>
              <h3 className="font-bold">تقرير الحجوزات</h3>
              <p className="text-sm text-gray-600">تحليل شامل للحجوزات</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <FileDown className="w-4 h-4 ml-2" />
            تصدير PDF
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckSquare className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bold">تقرير الاعتمادات</h3>
              <p className="text-sm text-gray-600">أداء عملية الاعتماد</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <FileDown className="w-4 h-4 ml-2" />
            تصدير Excel
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className="font-bold">التقرير المالي</h3>
              <p className="text-sm text-gray-600">الإيرادات والمدفوعات</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <FileDown className="w-4 h-4 ml-2" />
            تصدير PDF
          </Button>
        </Card>
      </div>

      {/* Charts for Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">الإيرادات الشهرية</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" style={{ fontSize: '12px' }} />
              <YAxis style={{ fontSize: '12px' }} />
              <RechartsTooltip />
              <Line type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">نمو المنصة</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" style={{ fontSize: '12px' }} />
              <YAxis style={{ fontSize: '12px' }} />
              <RechartsTooltip />
              <Bar dataKey="bookings" fill="#0D9488" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6" dir="rtl">
      <div>
        <h2 className="text-2xl font-bold">الإعدادات العامة</h2>
        <p className="text-gray-600 mt-1">إعدادات أساسية للمنصة</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="font-bold mb-4">معلومات المنصة</h3>
          <div className="grid gap-4">
            <div>
              <Label>اسم المنصة</Label>
              <Input defaultValue="DocGate" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>البريد الإلكتروني</Label>
                <Input type="email" defaultValue="info@docgate.ye" />
              </div>
              <div>
                <Label>رقم الهاتف</Label>
                <Input defaultValue="+967 2 240555" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold mb-4">إعدادات الدفع</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">الدفع الإلكتروني</p>
                <p className="text-sm text-gray-600">تفعيل الدفع عبر الإنترنت</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">الدفع النقدي</p>
                <p className="text-sm text-gray-600">السماح بالدفع النقدي في العيادة</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold mb-4">إعدادات الإشعارات</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">إشعارات الحجز</p>
                <p className="text-sm text-gray-600">إرسال إشعارات للحجوزات الجديدة</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">إشعارات التقييمات</p>
                <p className="text-sm text-gray-600">إرسال إشعارات للتقييمات الجديدة</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold mb-4">ميزات المنصة</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">الاستشارات الأونلاين</p>
                <p className="text-sm text-gray-600">تفعيل ميزة الاستشارات عن بُعد</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">التقييمات</p>
                <p className="text-sm text-gray-600">السماح للمرضى بتقييم الأطباء</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">الإعلانات</p>
                <p className="text-sm text-gray-600">عرض الإعلانات على المنصة</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-teal-600 hover:bg-teal-700">
            حفظ التغييرات
          </Button>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Top Bar */}
        {renderTopBar()}

        {/* Content */}
        <div className="p-6">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'approvals' && renderApprovals()}
          {activeSection === 'providers' && renderProviders()}
          {activeSection === 'clinics' && renderClinics()}
          {activeSection === 'users' && renderUsers()}
          {activeSection === 'bookings' && renderBookings()}
          {activeSection === 'payments' && renderPayments()}
          {activeSection === 'financial' && <FinancialManagementSection />}
          {activeSection === 'wallets' && <WalletsManagementSection />}
          {activeSection === 'labs' && <LabsManagementSection />}
          {activeSection === 'messages' && renderMessages()}
          {activeSection === 'quality' && renderQuality()}
          {activeSection === 'audit' && renderAudit()}
          {activeSection === 'ads' && renderAds()}
          {activeSection === 'reports' && renderReports()}
          {activeSection === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
}
