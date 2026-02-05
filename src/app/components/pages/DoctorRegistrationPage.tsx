import { Footer } from '@/app/components/Footer';
import { CheckCircle2, Users, Calendar, TrendingUp, Shield, Clock, Star, UserCheck, ChevronRight, Stethoscope, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

interface DoctorRegistrationPageProps {
  onNavigate: (page: string) => void;
}

export function DoctorRegistrationPage({ onNavigate }: DoctorRegistrationPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    specialty: '',
    city: '',
    workplace: '',
    countryCode: '+967',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no backend logic
    alert('شكراً لتسجيلك! سيتم التواصل معك قريباً للتحقق من حسابك.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData({
      ...formData,
      countryCode: value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 to-teal-700 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1762190102324-116a615896da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBtZWRpY2FsJTIwdGVhbXxlbnwxfHx8fDE3Njg1MzIyMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Professional Medical Team"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            انضم إلى DoctorGate كطبيب
          </h1>
          <p className="text-xl md:text-2xl text-teal-50 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            طوّر حضورك الرقمي، زِد عدد مرضاك، وأدر مواعيدك بسهولة من خلال أكثر منصة طبية موثوقة في اليمن
          </p>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8f9fb"/>
          </svg>
        </div>
      </section>

      {/* Why Join DocGate */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              لماذا تنضم إلى DoctorGate؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              انضم إلى شبكة من أفضل الأطباء في اليمن واستفد من مزايا فريدة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-2xl transition-all duration-300 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                زيادة عدد الحجوزات
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                وصول مباشر إلى آلاف المرضى الذين يبحثون عن طبيب موثوق يومياً
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-2xl transition-all duration-300 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                الوصول لمرضى حقيقيين
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                تواصل مع مرضى يبحثون عن تخصصك في منطقتك بشكل فوري
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-2xl transition-all duration-300 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                إدارة مواعيدك بذكاء
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                نظام متطور لإدارة المواعيد وتنظيم جدولك بكفاءة عالية
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-2xl transition-all duration-300 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                صفحة احترافية باسمك
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                صفحة شخصية احترافية تعزز ثقة المرضى وتبني سمعتك الرقمية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              كيف يعمل التسجيل؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              عملية بسيطة وسريعة للانضمام إلى DoctorGate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 border-2 border-teal-600/20 hover:border-teal-600 transition-all duration-300 text-center h-full">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  سجّل بياناتك
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  املأ النموذج بمعلوماتك الشخصية والمهنية
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2">
                <ChevronRight className="w-8 h-8 text-teal-600 rotate-180" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 border-2 border-emerald-500/20 hover:border-emerald-500 transition-all duration-300 text-center h-full">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  التحقق من الحساب
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  فريقنا سيتواصل معك للتحقق من بياناتك
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2">
                <ChevronRight className="w-8 h-8 text-emerald-500 rotate-180" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 border-2 border-teal-500/20 hover:border-teal-500 transition-all duration-300 text-center h-full">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  أنشئ جدول مواعيدك
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  حدد أوقات العمل والمواعيد المتاحة للمرضى
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2">
                <ChevronRight className="w-8 h-8 text-teal-500 rotate-180" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 border-2 border-green-500/20 hover:border-green-500 transition-all duration-300 text-center h-full">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-white font-bold text-2xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  ابدأ استقبال المرضى
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  ابدأ باستقبال حجوزات المرضى مباشرة
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              نموذج التسجيل
            </h2>
            <p className="text-lg text-muted-foreground">
              املأ البيانات التالية للانضمام إلى DoctorGate
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-border overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-foreground mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                {/* Phone with Country Code */}
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    رقم الهاتف *
                  </label>
                  <div className="flex gap-2" dir="ltr">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                      placeholder="xxx xxx xxx"
                    />
                    <Select value={formData.countryCode} onValueChange={handleCountryCodeChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+967">
                          <span className="flex items-center gap-2">
                            <span>🇾🇪</span>
                            <span>+967</span>
                          </span>
                        </SelectItem>
                        <SelectItem value="+966">
                          <span className="flex items-center gap-2">
                            <span>🇸🇦</span>
                            <span>+966</span>
                          </span>
                        </SelectItem>
                        <SelectItem value="+971">
                          <span className="flex items-center gap-2">
                            <span>🇦🇪</span>
                            <span>+971</span>
                          </span>
                        </SelectItem>
                        <SelectItem value="+20">
                          <span className="flex items-center gap-2">
                            <span>🇪🇬</span>
                            <span>+20</span>
                          </span>
                        </SelectItem>
                        <SelectItem value="+962">
                          <span className="flex items-center gap-2">
                            <span>🇯🇴</span>
                            <span>+962</span>
                          </span>
                        </SelectItem>
                        <SelectItem value="+964">
                          <span className="flex items-center gap-2">
                            <span>🇮🇶</span>
                            <span>+964</span>
                          </span>
                        </SelectItem>
                        <SelectItem value="+961">
                          <span className="flex items-center gap-2">
                            <span>🇱🇧</span>
                            <span>+961</span>
                          </span>
                        </SelectItem>
                        <SelectItem value="+968">
                          <span className="flex items-center gap-2">
                            <span>🇴🇲</span>
                            <span>+968</span>
                          </span>
                        </SelectItem>
                        <SelectItem value="+965">
                          <span className="flex items-center gap-2">
                            <span>🇰🇼</span>
                            <span>+965</span>
                          </span>
                        </SelectItem>
                        <SelectItem value="+973">
                          <span className="flex items-center gap-2">
                            <span>🇧🇭</span>
                            <span>+973</span>
                          </span>
                        </SelectItem>
                        <SelectItem value="+974">
                          <span className="flex items-center gap-2">
                            <span>🇶🇦</span>
                            <span>+974</span>
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                    placeholder="doctor@example.com"
                  />
                </div>

                {/* Password */}
                <div className="md:col-span-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                    كلمة المرور *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                    placeholder="أدخل كلمة مرور قوية"
                  />
                </div>

                {/* Specialty */}
                <div>
                  <label htmlFor="specialty" className="block text-sm font-semibold text-foreground mb-2">
                    التخصص الطبي *
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                  >
                    <option value="">اختر التخصص</option>
                    <option value="باطنية">باطنية</option>
                    <option value="جراحة عامة">جراحة عامة</option>
                    <option value="أطفال">أطفال وحديثي الولادة</option>
                    <option value="نساء وتوليد">نساء وتوليد</option>
                    <option value="جلدية">جلدية وتناسلية</option>
                    <option value="أسنان">أسنان</option>
                    <option value="عظام">عظام</option>
                    <option value="قلب">قلب وأوعية دموية</option>
                    <option value="مخ وأعصاب">مخ وأعصاب</option>
                    <option value="أنف وأذن">أنف وأذن وحنجرة</option>
                    <option value="عيون">عيون</option>
                    <option value="نفسية">طب نفسي</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-foreground mb-2">
                    المدينة / المنطقة *
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                  >
                    <option value="">اختر المنطقة</option>
                    <option value="كريتر">كريتر</option>
                    <option value="المعلا">المعلا</option>
                    <option value="التواهي">التواهي</option>
                    <option value="خور مكسر">خور مكسر</option>
                    <option value="الشيخ عثمان">الشيخ عثمان</option>
                    <option value="المنصورة">المنصورة</option>
                    <option value="دار سعد">دار سعد</option>
                    <option value="البريقة">البريقة</option>
                  </select>
                </div>

                {/* Workplace */}
                <div className="md:col-span-2">
                  <label htmlFor="workplace" className="block text-sm font-semibold text-foreground mb-2">
                    مكان العمل (عيادة / مستشفى) *
                  </label>
                  <input
                    type="text"
                    id="workplace"
                    name="workplace"
                    value={formData.workplace}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                    placeholder="مثال: عيادة النور الطبية"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-6 h-6" />
                  أرسل الطلب
                </button>
              </div>

              <p className="text-sm text-muted-foreground text-center mt-6">
                بالضغط على "أرسل الطلب"، أنت توافق على{' '}
                <span className="text-teal-600 cursor-pointer hover:underline">شروط الاستخدام</span>
                {' '}و{' '}
                <span className="text-teal-600 cursor-pointer hover:underline">سياسة الخصوصية</span>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Trust & Guarantees */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ضمانات DocGate للأطباء
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نحن نضمن لك تجربة آمنة وموثوقة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-2xl transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                بياناتك آمنة
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                نحمي بياناتك الشخصية والمهنية بأعلى معايير الأمان والخصوصية
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-2xl transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                لا رسوم خفية
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                شفافية كاملة في التسعير بدون رسوم مخفية أو مفاجآت
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-2xl transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                دعم فني مستمر
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                فريق دعم متاح على مدار الساعة لمساعدتك في أي استفسار
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Stethoscope className="w-20 h-20 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              هل لديك استفسار؟
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              تواصل معنا وسنكون سعداء بمساعدتك في عملية التسجيل
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="tel:+9672240555"
                className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-teal-50 transition-colors text-lg shadow-xl inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                224-0555 (02) 967+
              </a>
              <a
                href="mailto:doctors@docgate.ye"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors text-lg shadow-xl inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                doctors@docgate.ye
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}