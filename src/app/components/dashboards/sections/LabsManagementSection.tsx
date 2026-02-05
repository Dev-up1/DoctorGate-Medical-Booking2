import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { 
  Activity, AlertCircle, CheckCircle, XCircle, Eye, Ban, 
  MapPin, Phone, Mail, DollarSign, Calendar, TrendingUp,
  Download, Filter, FileText, Clock
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function LabsManagementSection() {
  const [selectedLab, setSelectedLab] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const labsData = [
    { 
      id: '1', 
      name: 'مختبر التشخيص المتقدم', 
      location: 'عدن - خورمكسر', 
      phone: '+967 777 111 222',
      email: 'info@advanceddiag.ye',
      status: 'active', 
      tests: 456, 
      revenue: '125,000', 
      monthlyFee: '12,500', 
      lastPayment: '2026-01-01', 
      nextBilling: '2026-02-01',
      pendingAmount: '0',
      joinedDate: '2025-06-15'
    },
    { 
      id: '2', 
      name: 'مختبر الصحة الشاملة', 
      location: 'عدن - كريتر', 
      phone: '+967 777 222 333',
      email: 'contact@health-lab.ye',
      status: 'active', 
      tests: 234, 
      revenue: '78,000', 
      monthlyFee: '7,800', 
      lastPayment: '2026-01-01', 
      nextBilling: '2026-02-01',
      pendingAmount: '0',
      joinedDate: '2025-08-20'
    },
    { 
      id: '3', 
      name: 'مختبر الدقة للتحاليل', 
      location: 'عدن - المعلا', 
      phone: '+967 777 333 444',
      email: 'support@accuracy-lab.ye',
      status: 'suspended', 
      tests: 89, 
      revenue: '34,000', 
      monthlyFee: '3,400', 
      lastPayment: '2025-12-01', 
      nextBilling: 'متأخر',
      pendingAmount: '10,200',
      joinedDate: '2025-10-05'
    }
  ];

  const labTestsHistory = [
    { id: '1', labName: 'مختبر التشخيص المتقدم', testType: 'تحليل دم شامل', patient: 'أحمد محمد', amount: '2,500', date: '2026-01-25', status: 'completed' },
    { id: '2', labName: 'مختبر الصحة الشاملة', testType: 'تحليل سكر تراكمي', patient: 'فاطمة علي', amount: '1,800', date: '2026-01-25', status: 'completed' },
    { id: '3', labName: 'مختبر التشخيص المتقدم', testType: 'تحليل وظائف كلى', patient: 'خالد سعيد', amount: '3,200', date: '2026-01-24', status: 'processing' },
    { id: '4', labName: 'مختبر الدقة للتحاليل', testType: 'تحليل هرمونات', patient: 'سعاد أحمد', amount: '2,900', date: '2026-01-24', status: 'completed' }
  ];

  const handleSuspendLab = (labId: string) => {
    toast.warning('تم إيقاف المختبر مؤقتاً بسبب تأخر الدفع');
  };

  const handleActivateLab = (labId: string) => {
    toast.success('تم إعادة تفعيل المختبر');
  };

  const handleSendBillingReminder = (labId: string) => {
    toast.info('تم إرسال تذكير الفوترة إلى المختبر');
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">المختبرات والتحاليل</h2>
          <p className="text-gray-600 mt-1">إدارة المختبرات والفوترة الشهرية</p>
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
              <SelectItem value="overdue">متأخر الدفع</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-teal-50 to-white border-teal-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">إجمالي المختبرات</p>
              <h3 className="text-3xl font-bold text-teal-700">{labsData.length}</h3>
              <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                2 نشط
              </p>
            </div>
            <div className="p-3 bg-teal-100 rounded-lg">
              <Activity className="w-6 h-6 text-teal-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">التحاليل هذا الشهر</p>
              <h3 className="text-3xl font-bold text-emerald-700">779</h3>
              <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +15% عن الماضي
              </p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <FileText className="w-6 h-6 text-emerald-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">فواتير معلقة</p>
              <h3 className="text-3xl font-bold text-amber-700">10,200</h3>
              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                تتطلب متابعة
              </p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-amber-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-white border-red-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">مختبرات موقوفة</p>
              <h3 className="text-3xl font-bold text-red-700">1</h3>
              <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                تأخر الدفع
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Ban className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Financial Model Info */}
      <Card className="p-6 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-teal-600 rounded-lg">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-2">نموذج الفوترة للمختبرات</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  كل طلب تحليل يُسجَّل تلقائياً في النظام
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  فاتورة شهرية إلكترونية بنسبة بسيطة (10%)
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  السداد إلكتروني عبر المنصة
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  في حال التأخير → إيقاف الطلبات مؤقتاً
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Labs Table */}
      <Card>
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">قائمة المختبرات</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المختبر</TableHead>
              <TableHead>الموقع</TableHead>
              <TableHead>عدد التحاليل</TableHead>
              <TableHead>الإيرادات</TableHead>
              <TableHead>الرسوم الشهرية</TableHead>
              <TableHead>آخر دفع</TableHead>
              <TableHead>الفاتورة القادمة</TableHead>
              <TableHead>المتأخرات</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labsData.map((lab) => (
              <TableRow key={lab.id} className={lab.status === 'suspended' ? 'bg-red-50' : ''}>
                <TableCell className="font-medium">{lab.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    {lab.location}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{lab.tests}</TableCell>
                <TableCell className="font-bold text-teal-700">{lab.revenue} ر.ي</TableCell>
                <TableCell className="font-medium">{lab.monthlyFee} ر.ي</TableCell>
                <TableCell className="text-sm">{lab.lastPayment}</TableCell>
                <TableCell>
                  {lab.nextBilling === 'متأخر' ? (
                    <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                      <AlertCircle className="w-3 h-3" />
                      متأخر
                    </Badge>
                  ) : (
                    <span className="text-sm">{lab.nextBilling}</span>
                  )}
                </TableCell>
                <TableCell>
                  {lab.pendingAmount !== '0' ? (
                    <span className="font-bold text-red-600">{lab.pendingAmount} ر.ي</span>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {lab.status === 'active' ? (
                    <Badge className="bg-emerald-600">نشط</Badge>
                  ) : (
                    <Badge variant="destructive">موقوف</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog open={showDetailsModal && selectedLab?.id === lab.id} onOpenChange={setShowDetailsModal}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedLab(lab)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl" dir="rtl">
                        <DialogHeader>
                          <DialogTitle>تفاصيل المختبر</DialogTitle>
                        </DialogHeader>
                        {selectedLab && (
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">اسم المختبر</p>
                                <p className="font-medium">{selectedLab.name}</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">الموقع</p>
                                <p className="font-medium">{selectedLab.location}</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">رقم الهاتف</p>
                                <p className="font-medium">{selectedLab.phone}</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">البريد الإلكتروني</p>
                                <p className="font-medium">{selectedLab.email}</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">تاريخ الانضمام</p>
                                <p className="font-medium">{selectedLab.joinedDate}</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">الحالة</p>
                                {selectedLab.status === 'active' ? (
                                  <Badge className="bg-emerald-600">نشط</Badge>
                                ) : (
                                  <Badge variant="destructive">موقوف</Badge>
                                )}
                              </div>
                            </div>

                            <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                              <h4 className="font-bold mb-3">المعلومات المالية</h4>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <p className="text-gray-600">عدد التحاليل</p>
                                  <p className="font-bold text-teal-700">{selectedLab.tests}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">الإيرادات المحققة</p>
                                  <p className="font-bold text-teal-700">{selectedLab.revenue} ر.ي</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">الرسوم الشهرية</p>
                                  <p className="font-bold text-teal-700">{selectedLab.monthlyFee} ر.ي</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">المتأخرات</p>
                                  <p className={`font-bold ${selectedLab.pendingAmount !== '0' ? 'text-red-600' : 'text-gray-500'}`}>
                                    {selectedLab.pendingAmount !== '0' ? `${selectedLab.pendingAmount} ر.ي` : '-'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {lab.status === 'active' && lab.pendingAmount !== '0' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-amber-600 border-amber-600 hover:bg-amber-50"
                        onClick={() => handleSendBillingReminder(lab.id)}
                      >
                        <Clock className="w-4 h-4" />
                      </Button>
                    )}

                    {lab.status === 'active' ? (
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleSuspendLab(lab.id)}
                      >
                        <Ban className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleActivateLab(lab.id)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Recent Lab Tests */}
      <Card>
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">التحاليل الأخيرة</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المختبر</TableHead>
              <TableHead>نوع التحليل</TableHead>
              <TableHead>المريض</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labTestsHistory.map((test) => (
              <TableRow key={test.id}>
                <TableCell className="font-medium">{test.labName}</TableCell>
                <TableCell>{test.testType}</TableCell>
                <TableCell className="text-sm">{test.patient}</TableCell>
                <TableCell className="font-medium text-teal-700">{test.amount} ر.ي</TableCell>
                <TableCell className="text-sm">{test.date}</TableCell>
                <TableCell>
                  {test.status === 'completed' ? (
                    <Badge className="bg-emerald-600">مكتمل</Badge>
                  ) : (
                    <Badge className="bg-amber-600">قيد المعالجة</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
