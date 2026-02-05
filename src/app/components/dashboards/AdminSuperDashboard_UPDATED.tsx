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
  FileDown, Send, MoreVertical, Star, TrendingDown, Wallet
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

// Navigation Menu Items - UPDATED with new sections
const MENU_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'لوحة التحكم التنفيذية', restricted: false },
  { id: 'approvals', icon: CheckSquare, label: 'الاعتمادات والتوثيق', restricted: false },
  { id: 'providers', icon: Stethoscope, label: 'مقدمو الخدمة', restricted: false },
  { id: 'clinics', icon: Building2, label: 'العيادات والفروع', restricted: false },
  { id: 'users', icon: Users, label: 'إدارة المستخدمين', restricted: false },
  { id: 'bookings', icon: Calendar, label: 'الحجوزات', restricted: true, readOnly: true },
  { id: 'payments', icon: CreditCard, label: 'المدفوعات', restricted: true, readOnly: true },
  { id: 'financial', icon: DollarSign, label: 'النظام المالي', restricted: false },
  { id: 'wallets', icon: Wallet, label: 'المحافظ الإلكترونية', restricted: false },
  { id: 'labs', icon: Activity, label: 'المختبرات والتحاليل', restricted: false },
  { id: 'messages', icon: MessageSquare, label: 'الرسائل والتنبيهات', restricted: false },
  { id: 'quality', icon: Award, label: 'الجودة والدعم', restricted: false },
  { id: 'audit', icon: FileText, label: 'سجل التدقيق', restricted: true, readOnly: true },
  { id: 'ads', icon: Megaphone, label: 'الإعلانات والحملات', restricted: false },
  { id: 'reports', icon: BarChart3, label: 'التقارير التنفيذية', restricted: false },
  { id: 'settings', icon: Settings, label: 'الإعدادات العامة', restricted: false }
] as const;

export { MENU_ITEMS };
