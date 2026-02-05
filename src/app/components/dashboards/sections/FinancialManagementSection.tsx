import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { 
  DollarSign, TrendingUp, TrendingDown, CreditCard, Users, 
  Activity, Download, Filter, AlertCircle, CheckCircle,
  BarChart3, PieChart as PieChartIcon, Calendar
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, 
  Pie, Cell
} from 'recharts';

export function FinancialManagementSection() {
  const financialSummaryData = {
    totalRevenue: '2,450,000',
    platformFees: '245,000',
    doctorRevenue: '1,840,000',
    labRevenue: '365,000',
    pendingPayments: '125,000',
    monthlyGrowth: '+18%'
  };

  const revenueByService = [
    { name: 'الأطباء', value: 1840000, percentage: 75, color: '#0D9488' },
    { name: 'المختبرات', value: 365000, percentage: 15, color: '#115E59' },
    { name: 'رسوم المنصة', value: 245000, percentage: 10, color: '#0F766E' }
  ];

  const monthlyRevenueData = [
    { month: 'يوليو', revenue: 1850000, fees: 185000, doctors: 1400000, labs: 265000 },
    { month: 'أغسطس', revenue: 1920000, fees: 192000, doctors: 1450000, labs: 278000 },
    { month: 'سبتمبر', revenue: 2100000, fees: 210000, doctors: 1590000, labs: 300000 },
    { month: 'أكتوبر', revenue: 2150000, fees: 215000, doctors: 1620000, labs: 315000 },
    { month: 'نوفمبر', revenue: 2250000, fees: 225000, doctors: 1700000, labs: 325000 },
    { month: 'ديسمبر', revenue: 2350000, fees: 235000, doctors: 1780000, labs: 335000 },
    { month: 'يناير', revenue: 2450000, fees: 245000, doctors: 1840000, labs: 365000 }
  ];

  const transactionsByType = [
    { id: '1', type: 'doctor_consultation', provider: 'د. فاطمة باحارثة', amount: '5,000', platformFee: '500', netAmount: '4,500', date: '2026-01-25', status: 'completed' },
    { id: '2', type: 'lab_test', provider: 'مختبر التشخيص المتقدم', amount: '3,500', platformFee: '350', netAmount: '3,150', date: '2026-01-25', status: 'completed' },
    { id: '3', type: 'doctor_consultation', provider: 'د. محمد الحبشي', amount: '4,500', platformFee: '450', netAmount: '4,050', date: '2026-01-24', status: 'completed' },
    { id: '4', type: 'online_consultation', provider: 'د. أمينة السعدي', amount: '3,000', platformFee: '300', netAmount: '2,700', date: '2026-01-24', status: 'pending' }
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">النظام المالي للمنصة</h2>
          <p className="text-gray-600 mt-1">إدارة مالية مركزية - تحصيل إلكتروني 100%</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="current_month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">الشهر الحالي</SelectItem>
              <SelectItem value="last_month">الشهر الماضي</SelectItem>
              <SelectItem value="last_3_months">آخر 3 أشهر</SelectItem>
              <SelectItem value="current_year">السنة الحالية</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-teal-50 to-white border-teal-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">إجمالي الإيرادات</p>
              <h3 className="text-3xl font-bold text-teal-700">{financialSummaryData.totalRevenue}</h3>
              <p className="text-xs text-gray-600 mt-1">ريال يمني</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-600">{financialSummaryData.monthlyGrowth}</span>
                <span className="text-xs text-gray-500">عن الشهر الماضي</span>
              </div>
            </div>
            <div className="p-3 bg-teal-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-teal-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">رسوم المنصة</p>
              <h3 className="text-3xl font-bold text-emerald-700">{financialSummaryData.platformFees}</h3>
              <p className="text-xs text-gray-600 mt-1">10% من كل معاملة</p>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-emerald-600">مُحصَّلة تلقائياً</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-emerald-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">مدفوعات معلقة</p>
              <h3 className="text-3xl font-bold text-amber-700">{financialSummaryData.pendingPayments}</h3>
              <p className="text-xs text-gray-600 mt-1">بانتظار التحويل</p>
              <div className="flex items-center gap-1 mt-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-amber-600">تتطلب مراجعة</span>
              </div>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <Activity className="w-6 h-6 text-amber-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-teal-600" />
            توزيع الإيرادات حسب الخدمة
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={revenueByService}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueByService.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value: number) => `${value.toLocaleString()} ر.ي`} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {revenueByService.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-teal-700">{item.value.toLocaleString()} ر.ي</p>
                  <p className="text-xs text-gray-600">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-600" />
            النمو الشهري للإيرادات
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" style={{ fontSize: '12px' }} />
              <YAxis style={{ fontSize: '12px' }} />
              <RechartsTooltip formatter={(value: number) => `${value.toLocaleString()} ر.ي`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={2} name="إجمالي الإيرادات" />
              <Line type="monotone" dataKey="fees" stroke="#14B8A6" strokeWidth={2} name="رسوم المنصة" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Revenue by Service Provider Type */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">الإيرادات حسب نوع الخدمة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Users className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إيرادات الأطباء</p>
                <p className="text-xs text-gray-500">لا خصم في المرحلة الأولى</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-teal-700">{financialSummaryData.doctorRevenue}</p>
            <p className="text-xs text-gray-600 mt-1">ريال يمني - 75% من الإجمالي</p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Activity className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إيرادات المختبرات</p>
                <p className="text-xs text-gray-500">نسبة شهرية بسيطة</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-700">{financialSummaryData.labRevenue}</p>
            <p className="text-xs text-gray-600 mt-1">ريال يمني - 15% من الإجمالي</p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">رسوم الخدمة</p>
                <p className="text-xs text-gray-500">تُقتطع تلقائياً</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-700">{financialSummaryData.platformFees}</p>
            <p className="text-xs text-gray-600 mt-1">ريال يمني - 10% من الإجمالي</p>
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">المعاملات الأخيرة</h3>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 ml-2" />
              فلترة
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>نوع الخدمة</TableHead>
              <TableHead>مقدم الخدمة</TableHead>
              <TableHead>المبلغ الإجمالي</TableHead>
              <TableHead>رسوم المنصة</TableHead>
              <TableHead>صافي المبلغ</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionsByType.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Badge variant="outline">
                    {transaction.type === 'doctor_consultation' && 'استشارة طبية'}
                    {transaction.type === 'lab_test' && 'تحليل مختبري'}
                    {transaction.type === 'online_consultation' && 'استشارة أونلاين'}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{transaction.provider}</TableCell>
                <TableCell className="font-bold">{transaction.amount} ر.ي</TableCell>
                <TableCell className="text-teal-600 font-medium">{transaction.platformFee} ر.ي</TableCell>
                <TableCell className="font-medium">{transaction.netAmount} ر.ي</TableCell>
                <TableCell className="text-sm">{transaction.date}</TableCell>
                <TableCell>
                  {transaction.status === 'completed' ? (
                    <Badge className="bg-emerald-600">مكتمل</Badge>
                  ) : (
                    <Badge variant="secondary">معلق</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Financial Info Card */}
      <Card className="p-6 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-teal-600 rounded-lg">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-2">نظام مالي إلكتروني 100%</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                جميع المدفوعات تتم إلكترونياً عبر التطبيق (بطاقة / محفظة)
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                رسوم الخدمة تُقتطع تلقائياً عند كل معاملة
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                محفظة إلكترونية لكل مقدم خدمة مع سجل محاسبي كامل
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                سجل مراجعة لكل عملية مالية (غير قابل للتعديل)
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
