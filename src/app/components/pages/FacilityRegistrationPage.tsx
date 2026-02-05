import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import {
  Building2, MapPin, Phone, Upload, CheckCircle, ArrowRight, ArrowLeft,
  Hospital, Shield, Clock, Users, FileText, Image as ImageIcon, Mail,
  ChevronDown, AlertCircle, Check, Eye, EyeOff
} from 'lucide-react';

interface FacilityRegistrationPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function FacilityRegistrationPage({ onNavigate }: FacilityRegistrationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [facilityType, setFacilityType] = useState<'hospital' | 'medical_center' | ''>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const services = [
    { id: 'radiology', name: 'أشعة' },
    { id: 'laboratory', name: 'مختبر' },
    { id: 'pharmacy', name: 'صيدلية' },
    { id: 'emergency', name: 'طوارئ' },
    { id: 'surgery', name: 'عمليات' },
    { id: 'icu', name: 'عناية مركزة' },
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle final submission
    onNavigate('facility-dashboard', { facilityId: 'new-facility-id' });
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                step <= currentStep
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step < currentStep ? (
                <Check className="size-5" />
              ) : (
                step
              )}
            </div>
            {step < 5 && (
              <div
                className={`h-1 flex-1 mx-2 transition-colors ${
                  step < currentStep ? 'bg-teal-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">
          الخطوة {currentStep} من {totalSteps}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center">
                <Hospital className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DocGate</h1>
                <p className="text-xs text-gray-600">تسجيل منشأة طبية</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => onNavigate('home')}>
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Card className="p-8 bg-white border-0 shadow-xl">
          <StepIndicator />

          {/* Step 1: Account Creation */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-teal-100 rounded-full mb-4">
                  <Building2 className="size-10 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">إنشاء حساب مقدم خدمة</h2>
                <p className="text-gray-600">
                  سجّل منشأتك الطبية على منصة DocGate وابدأ باستقبال الحجوزات
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  onClick={() => setFacilityType('hospital')}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    facilityType === 'hospital'
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Hospital className={`size-8 ${facilityType === 'hospital' ? 'text-teal-600' : 'text-gray-400'}`} />
                    <h3 className="font-bold text-lg">مستشفى</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    منشأة طبية متكاملة تقدم خدمات شاملة مع أقسام متعددة
                  </p>
                </div>

                <div
                  onClick={() => setFacilityType('medical_center')}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    facilityType === 'medical_center'
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Building2 className={`size-8 ${facilityType === 'medical_center' ? 'text-teal-600' : 'text-gray-400'}`} />
                    <h3 className="font-bold text-lg">مركز طبي</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    مركز طبي تخصصي أو عيادات متعددة التخصصات
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <Label>اسم مسؤول الحساب *</Label>
                  <Input placeholder="الاسم الكامل" className="mt-2" />
                </div>
                <div>
                  <Label>رقم الجوال *</Label>
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="7XX XXX XXX" className="flex-1" dir="ltr" style={{ textAlign: 'right' }} />
                    <div className="flex items-center px-4 bg-gray-100 border rounded-lg">
                      <span className="text-sm font-medium text-gray-700" dir="ltr">+967</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>البريد الإلكتروني *</Label>
                  <Input type="email" placeholder="email@example.com" className="mt-2" />
                </div>
                <div>
                  <Label>كلمة المرور *</Label>
                  <div className="relative mt-2">
                    <Input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="أدخل كلمة المرور"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-4 bg-teal-50 rounded-lg border border-teal-200">
                <Shield className="size-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-teal-900">
                  سيتم إرسال رمز تحقق OTP إلى رقم الجوال المدخل للتأكيد
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Basic Facility Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-teal-100 rounded-full mb-4">
                  <FileText className="size-10 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">بيانات المنشأة الأساسية</h2>
                <p className="text-gray-600">
                  أدخل المعلومات الأساسية عن منشأتك الطبية
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label>اسم المنشأة (عربي) *</Label>
                  <Input placeholder="مثال: مستشفى النور الطبي" className="mt-2" />
                </div>
                <div>
                  <Label>الاسم الإنجليزي (اختياري)</Label>
                  <Input placeholder="Al-Noor Medical Hospital" className="mt-2" dir="ltr" />
                </div>
                <div>
                  <Label>رقم الهاتف الرئيسي *</Label>
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="2 XXX XXX" className="flex-1" dir="ltr" style={{ textAlign: 'right' }} />
                    <div className="flex items-center px-4 bg-gray-100 border rounded-lg">
                      <span className="text-sm font-medium text-gray-700" dir="ltr">+967</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>واتساب (اختياري)</Label>
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="7XX XXX XXX" className="flex-1" dir="ltr" style={{ textAlign: 'right' }} />
                    <div className="flex items-center px-4 bg-gray-100 border rounded-lg">
                      <span className="text-sm font-medium text-gray-700" dir="ltr">+967</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>المدينة *</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aden">عدن</SelectItem>
                      <SelectItem value="sanaa">صنعاء</SelectItem>
                      <SelectItem value="taiz">تعز</SelectItem>
                      <SelectItem value="hodeidah">الحديدة</SelectItem>
                      <SelectItem value="mukalla">المكلا</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>المنطقة *</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="اختر المنطقة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crater">كريتر</SelectItem>
                      <SelectItem value="mansoura">المنصورة</SelectItem>
                      <SelectItem value="sheikh-othman">الشيخ عثمان</SelectItem>
                      <SelectItem value="khormaksar">خورمكسر</SelectItem>
                      <SelectItem value="mualla">المعلا</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>العنوان النصي *</Label>
                  <Input placeholder="مثال: شارع الملكة أروى، كريتر، عدن" className="mt-2" />
                </div>
                <div className="md:col-span-2">
                  <Label>شعار المنشأة (Logo)</Label>
                  <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-teal-600 transition-colors cursor-pointer">
                    <Upload className="size-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">اضغط لرفع الشعار أو اسحب الصورة هنا</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG (بحد أقصى 2MB)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Description and Services */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-teal-100 rounded-full mb-4">
                  <Shield className="size-10 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">نبذة وخدمات عامة</h2>
                <p className="text-gray-600">
                  أضف وصفاً عن المنشأة والخدمات التي تقدمها
                </p>
              </div>

              <div>
                <Label>نبذة مختصرة عن المنشأة *</Label>
                <Textarea 
                  placeholder="مثال: مستشفى النور الطبي هو أحد أفضل المستشفيات في اليمن..."
                  className="mt-2"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">يُفضل 150-200 كلمة</p>
              </div>

              <div>
                <Label>وصف تفصيلي (اختياري)</Label>
                <Textarea 
                  placeholder="أضف معلومات إضافية عن تاريخ المنشأة، الإنجازات، الشهادات..."
                  className="mt-2"
                  rows={6}
                />
              </div>

              <div>
                <Label className="mb-4 block">الخدمات العامة المتوفرة *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedServices.includes(service.id)
                          ? 'border-teal-600 bg-teal-50'
                          : 'border-gray-200 hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{service.name}</span>
                        {selectedServices.includes(service.id) && (
                          <CheckCircle className="size-5 text-teal-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>صور داخلية للمنشأة (اختياري)</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-teal-600 transition-colors cursor-pointer">
                  <ImageIcon className="size-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">اضغط لرفع الصور أو اسحب الصور هنا</p>
                  <p className="text-xs text-gray-500 mt-1">يمكنك رفع عدة صور (حد أقصى 10 صور)</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Operating Hours & Location */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-teal-100 rounded-full mb-4">
                  <Clock className="size-10 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">ساعات العمل والموقع</h2>
                <p className="text-gray-600">
                  حدد ساعات عمل المنشأة والموقع الجغرافي
                </p>
              </div>

              <div>
                <Label className="mb-4 block">ساعات العمل *</Label>
                <div className="space-y-3">
                  {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day) => (
                    <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-24">
                        <span className="font-medium">{day}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <Input type="time" defaultValue="08:00" className="w-32" />
                        <span className="text-sm text-gray-600">إلى</span>
                        <Input type="time" defaultValue="20:00" className="w-32" />
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-teal-50 rounded-lg border border-teal-200">
                <Checkbox id="24hours" />
                <label htmlFor="24hours" className="text-sm font-medium">
                  المنشأة تعمل 24 ساعة (طوارئ)
                </label>
              </div>

              <div>
                <Label>تحديد الموقع على الخريطة</Label>
                <div className="mt-2 border rounded-lg p-12 bg-gray-100 text-center">
                  <MapPin className="size-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-4">اضغط لتحديد الموقع على الخريطة</p>
                  <Button variant="outline">
                    <MapPin className="size-4 ml-2" />
                    فتح الخريطة
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-emerald-100 rounded-full mb-4">
                  <CheckCircle className="size-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">مراجعة وإرسال</h2>
                <p className="text-gray-600">
                  راجع البيانات المدخلة قبل إرسال الطلب
                </p>
              </div>

              {/* Summary Cards */}
              <div className="space-y-4">
                <Card className="p-6 bg-gray-50 border-0">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <Building2 className="size-5 text-teal-600" />
                      معلومات المنشأة
                    </h3>
                    <Button size="sm" variant="ghost" onClick={() => setCurrentStep(2)}>
                      تعديل
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">نوع المنشأة:</span>
                      <span className="font-medium">
                        {facilityType === 'hospital' ? 'مستشفى' : 'مركز طبي'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">اسم المنشأة:</span>
                      <span className="font-medium">مستشفى النور الطبي</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المدينة:</span>
                      <span className="font-medium">عدن - كريتر</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gray-50 border-0">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <Shield className="size-5 text-teal-600" />
                      الخدمات المتوفرة
                    </h3>
                    <Button size="sm" variant="ghost" onClick={() => setCurrentStep(3)}>
                      تعديل
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.length > 0 ? (
                      selectedServices.map((serviceId) => {
                        const service = services.find(s => s.id === serviceId);
                        return (
                          <Badge key={serviceId} className="bg-teal-600">
                            {service?.name}
                          </Badge>
                        );
                      })
                    ) : (
                      <p className="text-sm text-gray-500">لم يتم تحديد خدمات</p>
                    )}
                  </div>
                </Card>

                <Card className="p-6 bg-gray-50 border-0">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <Clock className="size-5 text-teal-600" />
                      ساعات العمل
                    </h3>
                    <Button size="sm" variant="ghost" onClick={() => setCurrentStep(4)}>
                      تعديل
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    السبت - الخميس: 08:00 ص - 08:00 م
                  </p>
                </Card>
              </div>

              <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-6 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">إشعار هام - الحوكمة</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• لن يتم نشر المنشأة تلقائياً</li>
                      <li>• يجب اعتماد المنشأة من إدارة المنصة أولاً</li>
                      <li>• يجب إضافة عيادة واحدة على الأقل قبل انضمام الأطباء</li>
                      <li>• الأطباء يحتاجون موافقة المنشأة والمنصة للظهور</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  أوافق على{' '}
                  <button className="text-teal-600 underline">الشروط والأحكام</button>
                  {' '}و{' '}
                  <button className="text-teal-600 underline">سياسة الخصوصية</button>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowRight className="size-4 ml-2" />
              السابق
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                className="bg-teal-600 hover:bg-teal-700"
                disabled={currentStep === 1 && !facilityType}
              >
                التالي
                <ArrowLeft className="size-4 mr-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <CheckCircle className="size-4 ml-2" />
                إرسال الطلب
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}