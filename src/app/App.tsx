import { useState } from 'react';
import { Toaster } from 'sonner';
import { Shield } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Header } from '@/app/components/Header';
import { HomePage } from '@/app/components/pages/HomePage';
import { DoctorsListingPage } from '@/app/components/pages/DoctorsListingPage';
import { DoctorProfilePage } from '@/app/components/pages/DoctorProfilePage';
import { BookingPage } from '@/app/components/pages/BookingPage';
import { LoginPage } from '@/app/components/pages/LoginPage';
import { HospitalsPage } from '@/app/components/pages/HospitalsPage';
import { HospitalProfilePage } from '@/app/components/pages/HospitalProfilePage';
import { LabsPage } from '@/app/components/pages/LabsPage';
import { OnlineConsultationPage } from '@/app/components/pages/OnlineConsultationPage';
import { HomeCarePage } from '@/app/components/pages/HomeCarePage';
import { OffersArticlesPage } from '@/app/components/pages/OffersArticlesPage';
import { DoctorRegistrationPage } from '@/app/components/pages/DoctorRegistrationPage';
import { FacilityRegistrationPage } from '@/app/components/pages/FacilityRegistrationPage';
import { DashboardAccessPage } from '@/app/components/pages/DashboardAccessPage';
import { AdminSuperDashboard } from '@/app/components/dashboards/AdminSuperDashboard';
import { DoctorDashboard } from '@/app/components/dashboards/DoctorDashboard';
import { BranchDashboard } from '@/app/components/dashboards/BranchDashboard';
import { UserDashboard } from '@/app/components/dashboards/UserDashboard';
import { FacilityDashboard } from '@/app/components/dashboards/FacilityDashboard';

type Page = 'home' | 'doctors' | 'profile' | 'doctor-profile' | 'booking' | 'login' | 'hospitals' | 'hospital-profile' | 'labs' | 'online-consultation' | 'home-care' | 'offers-articles' | 'doctor-registration' | 'facility-registration' | 'dashboard-access' | 'admin-super-dashboard' | 'doctor-dashboard' | 'branch-dashboard' | 'user-dashboard' | 'facility-dashboard';

interface PageData {
  doctorId?: string;
  hospitalId?: string;
  facilityId?: string;
  date?: string;
  time?: string;
  specialty?: string;
  city?: string;
  area?: string;
  doctorName?: string;
  branchId?: string;
  staffRole?: 'reception' | 'nurse' | 'assistant' | 'technician';
  userId?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageData, setPageData] = useState<PageData>({});

  const navigate = (page: Page, data?: PageData) => {
    setCurrentPage(page);
    if (data) {
      setPageData(data);
    } else {
      setPageData({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
      {currentPage !== 'login' && 
       currentPage !== 'dashboard-access' &&
       currentPage !== 'admin-super-dashboard' && 
       currentPage !== 'doctor-dashboard' && 
       currentPage !== 'branch-dashboard' &&
       currentPage !== 'user-dashboard' &&
       currentPage !== 'facility-dashboard' &&
       currentPage !== 'facility-registration' && 
       <Header onNavigate={navigate} />}
      
      {currentPage === 'home' && <HomePage onNavigate={navigate} />}
      
      {currentPage === 'doctors' && (
        <DoctorsListingPage 
          onNavigate={navigate}
          initialFilters={{
            specialty: pageData.specialty,
            city: pageData.city,
            doctorName: pageData.doctorName
          }}
        />
      )}
      
      {currentPage === 'profile' && pageData.doctorId && (
        <DoctorProfilePage 
          doctorId={pageData.doctorId}
          onNavigate={navigate}
        />
      )}
      
      {currentPage === 'booking' && pageData.doctorId && (
        <BookingPage 
          doctorId={pageData.doctorId}
          date={pageData.date}
          time={pageData.time}
          onNavigate={navigate}
        />
      )}
      
      {currentPage === 'login' && <LoginPage onNavigate={navigate} />}
      
      {currentPage === 'hospitals' && <HospitalsPage onNavigate={navigate} />}
      
      {currentPage === 'hospital-profile' && pageData.hospitalId && (
        <HospitalProfilePage 
          hospitalId={pageData.hospitalId}
          onNavigate={navigate}
        />
      )}
      
      {currentPage === 'labs' && <LabsPage onNavigate={navigate} />}
      
      {currentPage === 'online-consultation' && <OnlineConsultationPage onNavigate={navigate} />}
      
      {currentPage === 'home-care' && <HomeCarePage onNavigate={navigate} />}
      
      {currentPage === 'offers-articles' && <OffersArticlesPage onNavigate={navigate} />}
      
      {currentPage === 'doctor-registration' && <DoctorRegistrationPage onNavigate={navigate} />}
      
      {currentPage === 'facility-registration' && <FacilityRegistrationPage onNavigate={navigate} />}
      
      {currentPage === 'dashboard-access' && <DashboardAccessPage onNavigate={navigate} />}
      
      {currentPage === 'admin-super-dashboard' && <AdminSuperDashboard onNavigate={navigate} />}
      
      {currentPage === 'doctor-dashboard' && pageData.doctorId && (
        <DoctorDashboard doctorId={pageData.doctorId} onNavigate={navigate} />
      )}
      
      {currentPage === 'branch-dashboard' && pageData.branchId && pageData.staffRole && (
        <BranchDashboard branchId={pageData.branchId} staffRole={pageData.staffRole} onNavigate={navigate} />
      )}
      
      {currentPage === 'user-dashboard' && pageData.userId && (
        <UserDashboard userId={pageData.userId} onNavigate={navigate} />
      )}
      
      {currentPage === 'facility-dashboard' && pageData.facilityId && (
        <FacilityDashboard facilityId={pageData.facilityId} onNavigate={navigate} />
      )}

      {/* Floating Dashboard Button */}
      {currentPage !== 'dashboard-access' && 
       currentPage !== 'admin-super-dashboard' && 
       currentPage !== 'doctor-dashboard' && 
       currentPage !== 'branch-dashboard' &&
       currentPage !== 'user-dashboard' &&
       currentPage !== 'facility-dashboard' && (
        <Button
          onClick={() => navigate('dashboard-access')}
          className="fixed bottom-4 left-4 z-50 bg-[#0D9488] hover:bg-[#115E59] text-white shadow-lg rounded-full px-6 py-6 font-bold flex items-center gap-2"
        >
          <Shield className="w-5 h-5" />
          لوحات التحكم
        </Button>
      )}
    </div>
  );
}

export default App;