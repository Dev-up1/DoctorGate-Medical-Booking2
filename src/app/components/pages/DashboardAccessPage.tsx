import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { 
  Shield, Stethoscope, Building2, Users, ArrowRight, User, Hospital
} from 'lucide-react';

interface DashboardAccessPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function DashboardAccessPage({ onNavigate }: DashboardAccessPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#0D9488] rounded-xl">
              <Shield className="size-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">لوحات تحكم DoctorGate</h1>
          </div>
          <p className="text-gray-600 text-lg">اختر لوحة التحكم المناسبة للدخول</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* User Dashboard */}
          <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-[#0D9488]">
            <div className="text-center">
              <div className="inline-flex p-5 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-2xl mb-6">
                <User className="size-12 text-white" />
              </div>
              <Badge className="mb-3 bg-[#0D9488]">المرضى</Badge>
              <h3 className="text-2xl font-bold mb-3">لوحتي الشخصية</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                إدارة حساباتك ومواعيدك - ملفك الطبي - العائلة - التحاليل - التأمين
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">إدارة المواعيد</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">الملف الطبي الموحد</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">إدارة العائلة</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-[#0D9488] to-[#115E59] hover:from-[#115E59] hover:to-[#0F766E]"
                onClick={() => onNavigate('user-dashboard', { userId: 'user-1' })}
              >
                دخول لوحتي الشخصية
                <ArrowRight className="size-4 mr-2" />
              </Button>
            </div>
          </Card>

          {/* Doctor Dashboard */}
          <Card className="p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="inline-flex p-5 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-2xl mb-6">
                <Stethoscope className="size-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">لوحة تحكم الطبيب</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                إدارة ذاتية كاملة - إنشاء وتعديل الفروع - جدولة المواعيد - إدارة الموظفين
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">إدارة الفروع والعيادات</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">جدولة المواعيد</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">إدارة الموظفين</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full bg-gradient-to-r from-[#0D9488] to-[#115E59] hover:from-[#115E59] hover:to-[#0F766E]"
                  onClick={() => onNavigate('doctor-dashboard', { doctorId: '1' })}
                >
                  د. خالد الحبشي
                  <ArrowRight className="size-4 mr-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white"
                  onClick={() => onNavigate('doctor-dashboard', { doctorId: '2' })}
                >
                  د. أمل الشميري
                  <ArrowRight className="size-4 mr-2" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Facility Dashboard - UPDATED */}
          <Card className="p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="inline-flex p-5 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-2xl mb-6">
                <Hospital className="size-12 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">لوحة المركز الطبي / المستشفى</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                حوكمة مؤسسية - إدارة الفروع والعيادات - اعتماد الأطباء - فريق الإدارة
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">إدارة الفروع والعيادات</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">اعتماد الأطباء</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">التأمين والإعلانات</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full bg-gradient-to-r from-[#0D9488] to-[#115E59] hover:from-[#115E59] hover:to-[#0F766E]"
                  onClick={() => onNavigate('facility-dashboard', { facilityId: 'facility-1' })}
                >
                  مستشفى النور الطبي
                  <ArrowRight className="size-4 mr-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white"
                  onClick={() => onNavigate('facility-registration')}
                >
                  تسجيل منشأة جديدة
                  <ArrowRight className="size-4 mr-2" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Admin Dashboard */}
          <Card className="p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="inline-flex p-5 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-6">
                <Shield className="size-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">لوحة التحكم المتقدمة</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                إدارة شاملة للنظام - مراقبة الأطباء والفروع - الموافقة على الحسابات - إدارة التقييمات - سجل العمليات
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">مراقبة الأطباء والفروع</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">إدارة التقييمات</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">سجل العمليات</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">إدارة المحتوى والإعلانات</span>
                  <Badge className="bg-green-600">✓</Badge>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                onClick={() => onNavigate('admin-super-dashboard')}
              >
                دخول لوحة التحكم المتقدمة
                <ArrowRight className="size-4 mr-2" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Overview */}
        <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">نظام إدارة متكامل لـ DoctorGate</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 bg-white/10 rounded-xl mb-4">
                <Shield className="size-8 text-blue-400" />
              </div>
              <h4 className="font-bold mb-2">إدارة إشرافية</h4>
              <p className="text-sm text-gray-300">المدير يراقب ويوافق فقط، الأطباء يديرون بأنفسهم</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-white/10 rounded-xl mb-4">
                <Users className="size-8 text-green-400" />
              </div>
              <h4 className="font-bold mb-2">نظام متعدد الفروع</h4>
              <p className="text-sm text-gray-300">فروع عيادات فعلية + فرع استشارات أونلاين منفصل</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-white/10 rounded-xl mb-4">
                <Building2 className="size-8 text-purple-400" />
              </div>
              <h4 className="font-bold mb-2">صلاحيات محددة</h4>
              <p className="text-sm text-gray-300">كل موظف له صلاحيات خاصة بفرعه فقط</p>
            </div>
          </div>
        </Card>

        {/* Back to Website */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onNavigate('home')}
            className="bg-white"
          >
            العودة للموقع الرئيسي
          </Button>
        </div>
      </div>
    </div>
  );
}