import { Search, User, Menu, X, ChevronDown, Shield } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#0D9488] to-[#115E59] text-white sticky top-0 z-50 shadow-lg" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              onNavigate?.('home');
              setMobileMenuOpen(false);
            }}
          >
            <span className="text-2xl md:text-3xl font-bold text-white">
              DoctorGate
              <span className="text-teal-200 text-sm">.com</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button 
              onClick={() => onNavigate?.('home')}
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              الرئيسية
            </button>
            <button 
              onClick={() => onNavigate?.('hospitals')}
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              المراكز الطبية
            </button>
            <button 
              onClick={() => onNavigate?.('labs')}
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              التحاليل والأشعة
            </button>
            <button 
              onClick={() => onNavigate?.('offers-articles')}
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              العروض
            </button>
            <button 
              onClick={() => onNavigate?.('online-consultation')}
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              استشارة أونلاين
            </button>
            <button 
              onClick={() => onNavigate?.('home-care')}
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              زيارة منزلية
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector - Desktop */}
            <button className="hidden md:flex items-center gap-1 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors">
              <span className="text-sm font-medium">العربية</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Login Button */}
            <Button 
              variant="ghost" 
              className="hidden md:flex items-center gap-2 text-white hover:bg-white/10 border border-white/30"
              onClick={() => onNavigate?.('login')}
            >
              <User className="w-5 h-5" />
              <span>تسجيل الدخول</span>
            </Button>

            {/* Sign Up Button */}
            <Button 
              className="bg-white text-[#0D9488] hover:bg-gray-100 hidden md:inline-flex font-bold"
              onClick={() => onNavigate?.('login')}
            >
              انضم لنا
            </Button>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/20 bg-[#115E59]">
          <nav className="px-4 py-4 space-y-1">
            <button
              onClick={() => {
                onNavigate?.('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white font-medium"
            >
              الرئيسية
            </button>
            <button
              onClick={() => {
                onNavigate?.('hospitals');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white font-medium"
            >
              المراكز الطبية
            </button>
            <button
              onClick={() => {
                onNavigate?.('labs');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white font-medium"
            >
              التحاليل والأشعة
            </button>
            <button
              onClick={() => {
                onNavigate?.('offers-articles');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white font-medium"
            >
              العروض
            </button>
            <button
              onClick={() => {
                onNavigate?.('online-consultation');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white font-medium"
            >
              استشارة أونلاين
            </button>
            <button
              onClick={() => {
                onNavigate?.('home-care');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white font-medium"
            >
              زيارة منزلية
            </button>
            <div className="border-t border-white/20 pt-4 space-y-2">
              <Button
                onClick={() => {
                  onNavigate?.('login');
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                className="w-full border-white text-white hover:bg-white/10"
              >
                <User className="w-5 h-5 ml-2" />
                تسجيل الدخول
              </Button>
              <Button
                onClick={() => {
                  onNavigate?.('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-white text-[#0D9488] hover:bg-gray-100 font-bold"
              >
                انضم لنا
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}