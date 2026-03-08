import { Bike, Heart, ShoppingBag, Truck, LogOut, Search } from "lucide-react";

const stats = [
  { label: "Đơn đã mua", value: "5", icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
  { label: "Yêu thích", value: "12", icon: Heart, color: "bg-rose-50 text-rose-500" },
  { label: "Đang vận chuyển", value: "1", icon: Truck, color: "bg-amber-50 text-amber-600" },
  { label: "Xe đã xem", value: "38", icon: Bike, color: "bg-purple-50 text-purple-600" },
];

const bikes = [
  { id: 1, name: "Trek FX 3 Disc", price: "8.500.000đ", condition: "95%", tag: "Mới nhất" },
  { id: 2, name: "Giant Escape 3", price: "6.200.000đ", condition: "88%", tag: "Phổ biến" },
  { id: 3, name: "Specialized Sirrus", price: "12.000.000đ", condition: "92%", tag: "" },
  { id: 4, name: "Cannondale Quick 4", price: "9.800.000đ", condition: "85%", tag: "Giảm giá" },
  { id: 5, name: "Scott Sub Cross 40", price: "7.400.000đ", condition: "90%", tag: "" },
  { id: 6, name: "Merida Crossway 40", price: "5.900.000đ", condition: "80%", tag: "Nổi bật" },
];

export default function BuyerPage() {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  })();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center">
            <Bike size={18} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">BikeExchange</span>
          <span className="text-gray-300 mx-1">|</span>
          <span className="text-sm text-gray-500">Người mua</span>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2 w-72">
          <Search size={15} className="text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm xe đạp..."
            className="bg-transparent text-sm outline-none w-full text-gray-600 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.email ?? "Người mua"}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition"
          >
            <LogOut size={16} />
            Đăng xuất
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Xin chào, {user?.email ?? "bạn"} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Khám phá xe đạp chất lượng đã được kiểm định.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bike grid */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-4">Xe đề xuất cho bạn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bikes.map((bike) => (
              <div key={bike.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition group">
                {/* Placeholder image */}
                <div className="w-full h-32 bg-gray-100 rounded-xl mb-4 flex items-center justify-center group-hover:bg-gray-200 transition">
                  <Bike size={36} className="text-gray-300" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{bike.name}</h3>
                    <p className="text-blue-600 font-bold mt-1">{bike.price}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Tình trạng: {bike.condition}</p>
                  </div>
                  {bike.tag && (
                    <span className="text-[11px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium shrink-0">
                      {bike.tag}
                    </span>
                  )}
                </div>
                <button className="mt-4 w-full py-2 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium transition">
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
