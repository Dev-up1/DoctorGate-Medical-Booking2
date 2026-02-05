import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { 
  CreditCard, Eye, Download, TrendingUp, AlertCircle, CheckCircle,
  DollarSign, Users, Activity, FileText, Clock, Send, Search
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer
} from 'recharts';

export function WalletsManagementSection() {
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const walletsData = [
    { 
      id: '1', 
      provider: 'د. فاطمة باحارثة', 
      providerType: 'doctor', 
      balance: '145,000', 
      pending: '25,000', 
      withdrawn: '320,000', 
      totalEarnings: '490,000',
      lastTransaction: '2026-01-25',
      lastWithdrawal: '2026-01-20',
      status: 'active',
      accountNumber: '****-****-1234',
      bankName: 'بنك التضامن الإسلامي'
    },
    { 
      id: '2', 
      provider: 'مركز عدن الطبي', 
      providerType: 'medical_center', 
      balance: '234,000', 
      pending: '45,000', 
      withdrawn: '567,000',
      totalEarnings: '846,000', 
      lastTransaction: '2026-01-24',
      lastWithdrawal: '2026-01-18',
      status: 'active',
      accountNumber: '****-****-5678',
      bankName: 'بنك الكريمي'
    },
    { 
      id: '3', 
      provider: 'مختبر التشخيص المتقدم', 
      providerType: 'lab', 
      balance: '56,000', 
      pending: '12,500', 
      withdrawn: '89,000',
      totalEarnings: '157,500', 
      lastTransaction: '2026-01-23',
      lastWithdrawal: '2026-01-15',
      status: 'active',
      accountNumber: '****-****-9012',
      bankName: 'بنك اليمن الدولي'
    },
    { 
      id: '4', 
      provider: 'د. محمد الحبشي', 
      providerType: 'doctor', 
      balance: '98,500', 
      pending: '18,000', 
      withdrawn: '245,000',
      totalEarnings: '361,500', 
      lastTransaction: '2026-01-25',
      lastWithdrawal: '2026-01-19',
      status: 'active',
      accountNumber: '****-****-3456',
      bankName: 'بنك التضامن الإسلامي'
    }
  ];

  const transactionHistory = [
    { id: '1', wallet: 'د. فاطمة باحارثة', type: 'credit', amount: '5,000', description: 'استشارة طبية', date: '2026-01-25 10:30 AM', status: 'completed' },
    { id: '2', wallet: 'مركز عدن الطبي', type: 'debit', amount: '50,000', description: 'سحب رصيد', date: '2026-01-24 02:15 PM', status: 'completed' },
    { id: '3', wallet: 'مختبر التشخيص المتقدم', type: 'credit', amount: '2,500', description: 'تحليل طبي', date: '2026-01-23 11:45 AM', status: 'completed' },
    { id: '4', wallet: 'د. محمد الحبشي', type: 'credit', amount: '4,500', description: 'استشارة طبية', date: '2026-01-23 09:20 AM', status: 'pending' }
  ];

  const walletActivityData = [
    { day: 'السبت', transactions: 45, amount: 125000 },
    { day: 'الأحد', transactions: 52, amount: 142000 },
    { day: 'الاثنين', transactions: 48, amount: 135000 },
    { day: 'الثلاثاء', transactions: 56, amount: 158000 },
    { day: 'الأربعاء', transactions: 61, amount: 167000 },
    { day: 'الخميس', transactions: 58, amount: 162000 },
    { day: 'الجمعة', transactions: 42, amount: 118000 }
  ];

  const handleApproveWithdrawal = () => {
    toast.success('تمت الموافقة على طلب السحب وسيتم التحويل خلال 24 ساعة');
    setShowWithdrawalModal(false);
  };

  const totalBalance = walletsData.reduce((acc, wallet) => acc + parseFloat(wallet.balance.replace(',', '')), 0);
  const totalPending = walletsData.reduce((acc, wallet) => acc + parseFloat(wallet.pending.replace(',', '')), 0);
  const totalWithdrawn = walletsData.reduce((acc, wallet) => acc + parseFloat(wallet.withdrawn.replace(',', '')), 0);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">المحافظ الإلكترونية</h2>
          <p className="text-gray-600 mt-1">إدارة محافظ مقدمي الخدمة والمعاملات المالية</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="doctor">أطباء</SelectItem>
              <SelectItem value="medical_center">مراكز طبية</SelectItem>
              <SelectItem value="lab">مختبرات</SelectItem>
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
              <p className="text-sm text-gray-600 mb-1">إجمالي الأرصدة</p>
              <h3 className="text-3xl font-bold text-teal-700">{totalBalance.toLocaleString()}</h3>
              <p className="text-xs text-gray-600 mt-1">ريال يمني</p>
            </div>
            <div className="p-3 bg-teal-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-teal-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">معاملات معلقة</p>
              <h3 className="text-3xl font-bold text-amber-700">{totalPending.toLocaleString()}</h3>
              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                قيد المعالجة
              </p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-amber-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">المسحوبات</p>
              <h3 className="text-3xl font-bold text-emerald-700">{totalWithdrawn.toLocaleString()}</h3>
              <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                مكتمل
              </p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Download className="w-6 h-6 text-emerald-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">المحافظ النشطة</p>
              <h3 className="text-3xl font-bold text-indigo-700">{walletsData.length}</h3>
              <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +4 هذا الشهر
              </p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Users className="w-6 h-6 text-indigo-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Wallet System Info */}
      <Card className="p-6 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-teal-600 rounded-lg">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-2">نظام المحافظ الإلكترونية</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  محفظة إلكترونية مستقلة لكل مقدم خدمة
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  رصيد متاح للسحب + معاملات معلقة
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  سجل محاسبي كامل وشفاف
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  سحب الرصيد خلال 24-48 ساعة
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-600" />
          نشاط المحافظ الأسبوعي
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={walletActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" style={{ fontSize: '12px' }} />
            <YAxis style={{ fontSize: '12px' }} />
            <RechartsTooltip formatter={(value: number) => `${value.toLocaleString()} ر.ي`} />
            <Line type="monotone" dataKey="amount" stroke="#0D9488" strokeWidth={2} name="المعاملات" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="البحث عن محفظة بالاسم..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
      </Card>

      {/* Wallets Table */}
      <Card>
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">قائمة المحافظ</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>مقدم الخدمة</TableHead>
              <TableHead>النوع</TableHead>
              <TableHead>الرصيد المتاح</TableHead>
              <TableHead>معاملات معلقة</TableHead>
              <TableHead>إجمالي المسحوبات</TableHead>
              <TableHead>إجمالي الأرباح</TableHead>
              <TableHead>آخر معاملة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {walletsData.map((wallet) => (
              <TableRow key={wallet.id}>
                <TableCell className="font-medium">{wallet.provider}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {wallet.providerType === 'doctor' && 'طبيب'}
                    {wallet.providerType === 'medical_center' && 'مركز طبي'}
                    {wallet.providerType === 'lab' && 'مختبر'}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold text-teal-700">{wallet.balance} ر.ي</TableCell>
                <TableCell className="text-amber-600 font-medium">{wallet.pending} ر.ي</TableCell>
                <TableCell className="text-emerald-600 font-medium">{wallet.withdrawn} ر.ي</TableCell>
                <TableCell className="font-bold">{wallet.totalEarnings} ر.ي</TableCell>
                <TableCell className="text-sm">{wallet.lastTransaction}</TableCell>
                <TableCell>
                  <Badge className="bg-emerald-600">نشط</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog open={showDetailsModal && selectedWallet?.id === wallet.id} onOpenChange={setShowDetailsModal}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedWallet(wallet)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl" dir="rtl">
                        <DialogHeader>
                          <DialogTitle>تفاصيل المحفظة</DialogTitle>
                          <DialogDescription>
                            {selectedWallet?.provider}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedWallet && (
                          <div className="space-y-4 py-4">
                            {/* Wallet Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                                <p className="text-xs text-gray-600 mb-1">الرصيد المتاح للسحب</p>
                                <p className="text-2xl font-bold text-teal-700">{selectedWallet.balance} ر.ي</p>
                              </div>
                              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                <p className="text-xs text-gray-600 mb-1">معاملات معلقة</p>
                                <p className="text-2xl font-bold text-amber-700">{selectedWallet.pending} ر.ي</p>
                              </div>
                              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                                <p className="text-xs text-gray-600 mb-1">إجمالي المسحوبات</p>
                                <p className="text-2xl font-bold text-emerald-700">{selectedWallet.withdrawn} ر.ي</p>
                              </div>
                              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                <p className="text-xs text-gray-600 mb-1">إجمالي الأرباح</p>
                                <p className="text-2xl font-bold text-indigo-700">{selectedWallet.totalEarnings} ر.ي</p>
                              </div>
                            </div>

                            {/* Bank Info */}
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-bold mb-3">معلومات الحساب البنكي</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">البنك</p>
                                  <p className="font-medium">{selectedWallet.bankName}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">رقم الحساب</p>
                                  <p className="font-medium font-mono">{selectedWallet.accountNumber}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">آخر سحب</p>
                                  <p className="font-medium">{selectedWallet.lastWithdrawal}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">آخر معاملة</p>
                                  <p className="font-medium">{selectedWallet.lastTransaction}</p>
                                </div>
                              </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className="border rounded-lg">
                              <div className="p-4 border-b bg-gray-50">
                                <h4 className="font-bold">آخر المعاملات</h4>
                              </div>
                              <div className="divide-y">
                                {transactionHistory.slice(0, 3).map((transaction) => (
                                  <div key={transaction.id} className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className={`p-2 rounded-lg ${transaction.type === 'credit' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                                        {transaction.type === 'credit' ? (
                                          <TrendingUp className="w-4 h-4 text-emerald-700" />
                                        ) : (
                                          <Download className="w-4 h-4 text-red-700" />
                                        )}
                                      </div>
                                      <div>
                                        <p className="font-medium">{transaction.description}</p>
                                        <p className="text-xs text-gray-500">{transaction.date}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className={`font-bold ${transaction.type === 'credit' ? 'text-emerald-700' : 'text-red-700'}`}>
                                        {transaction.type === 'credit' ? '+' : '-'}{transaction.amount} ر.ي
                                      </p>
                                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                                        {transaction.status === 'completed' ? 'مكتمل' : 'معلق'}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Dialog open={showWithdrawalModal && selectedWallet?.id === wallet.id} onOpenChange={setShowWithdrawalModal}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="bg-teal-600 hover:bg-teal-700"
                          onClick={() => setSelectedWallet(wallet)}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg" dir="rtl">
                        <DialogHeader>
                          <DialogTitle>معالجة طلب سحب</DialogTitle>
                          <DialogDescription>
                            {selectedWallet?.provider}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedWallet && (
                          <div className="space-y-4 py-4">
                            <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                              <p className="text-sm text-gray-600 mb-1">الرصيد المتاح للسحب</p>
                              <p className="text-3xl font-bold text-teal-700">{selectedWallet.balance} ر.ي</p>
                            </div>

                            <div>
                              <Label>مبلغ السحب</Label>
                              <Input 
                                type="text" 
                                placeholder="أدخل المبلغ"
                                defaultValue={selectedWallet.balance}
                              />
                            </div>

                            <div>
                              <Label>الحساب البنكي</Label>
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="font-medium">{selectedWallet.bankName}</p>
                                <p className="text-sm font-mono text-gray-600 mt-1">{selectedWallet.accountNumber}</p>
                              </div>
                            </div>

                            <div>
                              <Label>ملاحظات</Label>
                              <Textarea 
                                placeholder="ملاحظات أو تعليقات (اختياري)"
                                rows={3}
                              />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                              <Button variant="outline" onClick={() => setShowWithdrawalModal(false)}>
                                إلغاء
                              </Button>
                              <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleApproveWithdrawal}>
                                <CheckCircle className="w-4 h-4 ml-2" />
                                تأكيد التحويل
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">المعاملات الأخيرة</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المحفظة</TableHead>
              <TableHead>نوع المعاملة</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>الوصف</TableHead>
              <TableHead>التاريخ والوقت</TableHead>
              <TableHead>الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionHistory.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.wallet}</TableCell>
                <TableCell>
                  {transaction.type === 'credit' ? (
                    <Badge className="bg-emerald-600">إيداع</Badge>
                  ) : (
                    <Badge variant="destructive">سحب</Badge>
                  )}
                </TableCell>
                <TableCell className={`font-bold ${transaction.type === 'credit' ? 'text-emerald-700' : 'text-red-700'}`}>
                  {transaction.type === 'credit' ? '+' : '-'}{transaction.amount} ر.ي
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
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
    </div>
  );
}
