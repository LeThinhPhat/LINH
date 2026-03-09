import { useEffect, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Banknote, ShoppingBag, Users, ClipboardCheck,
  ListChecks, AlertTriangle, PackageCheck,
} from "lucide-react";
import { getAdminDashboardAPI } from "../../services/adminUserService";

const MONTHLY_REVENUE = [
  { month: "T10/24", revenue: 32, orders: 12 },
  { month: "T11/24", revenue: 45, orders: 18 },
  { month: "T12/24", revenue: 61, orders: 24 },
  { month: "T1/25", revenue: 38, orders: 15 },
  { month: "T2/25", revenue: 52, orders: 21 },
  { month: "T3/25", revenue: 78, orders: 30 },
];

const CATEGORY_DATA = [
  { name: "MTB", value: 42 },
  { name: "Road", value: 28 },
  { name: "City", value: 18 },
  { name: "Kids", value: 12 },
];

const PAYMENT_METHOD = [
  { method: "Chuyển khoản", count: 18 },
  { method: "Tiền mặt", count: 10 },
  { method: "Ví MoMo", count: 8 },
  { method: "Thẻ NH", count: 6 },
];

const PIE_COLORS = ["#3B82F6", "#EF4444", "#F59E0B", "#10B981"];
const BAR_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

function fmt(v: number) {
  return `${v}tr₫`;
}

function fmtCurrency(v: number) {
  return v.toLocaleString("vi-VN") + "₫";
}

interface DashboardData {
  totalListings: number;
  totalUsers: number;
  pendingDisputes: number;
  totalCommissionRevenue: number;
  inspectionStatistics: {
    requested: number;
    inspectedWaitApprove: number;
    assigned: number;
  };
  totalCompletedOrders: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboardAPI()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: "Doanh thu hoa hồng",
      value: loading ? "—" : fmtCurrency(data?.totalCommissionRevenue ?? 0),
      icon: Banknote,
      bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-600",
    },
    {
      label: "Đơn hàng hoàn thành",
      value: loading ? "—" : String(data?.totalCompletedOrders ?? 0),
      icon: ShoppingBag,
      bg: "bg-green-50", iconBg: "bg-green-100", iconColor: "text-green-600",
    },
    {
      label: "Tổng người dùng",
      value: loading ? "—" : String(data?.totalUsers ?? 0),
      icon: Users,
      bg: "bg-purple-50", iconBg: "bg-purple-100", iconColor: "text-purple-600",
    },
    {
      label: "Tranh chấp chờ xử lý",
      value: loading ? "—" : String(data?.pendingDisputes ?? 0),
      icon: AlertTriangle,
      bg: "bg-red-50", iconBg: "bg-red-100", iconColor: "text-red-500",
    },
    {
      label: "Tin đăng xe",
      value: loading ? "—" : String(data?.totalListings ?? 0),
      icon: ListChecks,
      bg: "bg-orange-50", iconBg: "bg-orange-100", iconColor: "text-orange-600",
    },
  ];

  const inspectionStats = data?.inspectionStatistics;
  const inspectionCards = [
    { label: "Yêu cầu kiểm định", value: inspectionStats?.requested ?? 0, icon: ClipboardCheck, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Đã phân công", value: inspectionStats?.assigned ?? 0, icon: PackageCheck, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Chờ phê duyệt", value: inspectionStats?.inspectedWaitApprove ?? 0, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tổng Quan</h1>
        <p className="text-sm text-gray-500 mt-1">Hiệu suất kinh doanh BikeExchange</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map(({ label, value, icon: Icon, bg, iconBg, iconColor }) => (
          <div key={label} className={`rounded-2xl border border-gray-100 p-5 ${bg}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon size={20} className={iconColor} />
              </span>
            </div>
            <div className="text-xl font-bold text-gray-900 leading-tight">{value}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Inspection statistics */}
      <div className="rounded-2xl bg-white border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Thống Kê Kiểm Định</h2>
        <div className="grid grid-cols-3 gap-4">
          {inspectionCards.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-4">
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                <Icon size={20} className={color} />
              </span>
              <div>
                <div className="text-2xl font-bold text-gray-900">{loading ? "—" : value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue area chart */}
      <div className="rounded-2xl bg-white border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Doanh thu & Đơn hàng theo tháng</h2>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={MONTHLY_REVENUE} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmt} tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(val: number | undefined, name: string | undefined) =>
                name === "revenue" ? [`${val ?? 0}tr₫`, "Doanh thu"] : [val ?? 0, "Đơn hàng"]
              }
              contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: 13 }}
            />
            <Legend
              formatter={(val) => (val === "revenue" ? "Doanh thu (triệu ₫)" : "Đơn hàng")}
              wrapperStyle={{ fontSize: 12 }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#gradRevenue)" />
            <Area type="monotone" dataKey="orders" stroke="#EF4444" strokeWidth={2} fill="url(#gradOrders)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Payment method bar chart */}
        <div className="rounded-2xl bg-white border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PAYMENT_METHOD} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="method" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(val: number | undefined) => [val ?? 0, "Giao dịch"]}
                contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: 13 }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {PAYMENT_METHOD.map((_, i) => (
                  <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie chart */}
        <div className="rounded-2xl bg-white border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Cơ cấu danh mục xe</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={CATEGORY_DATA}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {CATEGORY_DATA.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: number | undefined, _: string | undefined, props: { payload?: { name?: string } }) => [
                  `${val ?? 0}%`,
                  props.payload?.name ?? "",
                ]}
                contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: 13 }}
              />
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
