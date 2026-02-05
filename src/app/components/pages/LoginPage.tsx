import { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    countryCode: '+967'
  });

  const handleCountryCodeChange = (value: string) => {
    setFormData({
      ...formData,
      countryCode: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/signup
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-[#0D9488] rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-bold text-2xl">D</span>
            </div>
            <span className="text-3xl font-bold text-white">DoctorGate</span>
          </div>
          <p className="text-teal-100 text-lg">
            {isLogin ? 'مرحباً بعودتك' : 'انضم إلينا اليوم'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg transition-all font-semibold ${
                isLogin
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg transition-all font-semibold ${
                !isLogin
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              إنشاء حساب
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسمك الكامل"
                    required={!isLogin}
                    className="w-full pr-11 pl-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  required
                  className="w-full pr-11 pl-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Phone (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  رقم الهاتف
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="7xxxxxxxx"
                    required={!isLogin}
                    className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    dir="ltr"
                    style={{ textAlign: 'right' }}
                  />
                  <Select value={formData.countryCode} onValueChange={handleCountryCodeChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+967">YE +967</SelectItem>
                      <SelectItem value="+966">SA +966</SelectItem>
                      <SelectItem value="+971">AE +971</SelectItem>
                      <SelectItem value="+20">EG +20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full pr-11 pl-11 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password (Login Only) */}
            {isLogin && (
              <div className="text-left">
                <button
                  type="button"
                  className="text-sm text-teal-600 hover:text-teal-700 font-semibold"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            {/* Terms (Sign Up Only) */}
            {!isLogin && (
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-5 h-5 mt-0.5 text-teal-600 focus:ring-teal-600 rounded"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  أوافق على{' '}
                  <span className="text-teal-600 font-semibold cursor-pointer hover:underline">
                    الشروط والأحكام
                  </span>{' '}
                  و{' '}
                  <span className="text-teal-600 font-semibold cursor-pointer hover:underline">
                    سياسة الخصوصية
                  </span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 text-lg"
            >
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-muted-foreground">أو</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 border-2 border-border rounded-lg hover:bg-secondary transition-colors font-semibold"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>المتابعة باستخدام Google</span>
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 border-2 border-border rounded-lg hover:bg-secondary transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>المتابعة باستخدام Facebook</span>
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-teal-100 text-sm mt-6">
          بتسجيلك، أنت توافق على حماية بياناتك الشخصية وفقاً لسياسة الخصوصية
        </p>
      </div>
    </div>
  );
}