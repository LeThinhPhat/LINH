import { useState } from "react";
import {
  Search, Filter, Eye, ChevronDown, Bike,
  MapPin, Calendar, ClipboardList,
} from "lucide-react";

const ALL_INSPECTIONS = [
  { id: "KD-001", bike: "Trek FX 3 Disc 2023", brand: "Trek", seller: "Nguyễn Văn A", phone: "0901 111 222", location: "TP.HCM", date: "10/03/2026", type: "Đường trường", status: "Chờ kiểm định", priority: "Cao" },
  { id: "KD-002", bike: "Giant Escape 3 2022", brand: "Giant", seller: "Trần Thị B", phone: "0902 333 444", location: "Hà Nội", date: "10/03/2026", type: "Thành thị", status: "Đang kiểm định", priority: "Bình thường" },
  { id: "KD-003", bike: "Cannondale Quick 4", brand: "Cannondale", seller: "Lê Văn C", phone: "0903 555 666", location: "Đà Nẵng", date: "09/03/2026", type: "Địa hình", status: "Hoàn thành", priority: "Thấp" },
  { id: "KD-004", bike: "Specialized Sirrus 3.0", brand: "Specialized", seller: "Phạm Thị D", phone: "0904 777 888", location: "Cần Thơ", date: "09/03/2026", type: "Đường trường", status: "Chờ kiểm định", priority: "Cao" },
  { id: "KD-005", bike: "Scott Speedster 40", brand: "Scott", seller: "Hoàng Văn E", phone: "0905 999 000", location: "TP.HCM", date: "08/03/2026", type: "Đường trường", status: "Hoàn thành", priority: "Bình thường" },
  { id: "KD-006", bike: "Merida Reacto 400", brand: "Merida", seller: "Vũ Thị F", phone: "0906 111 333", location: "Hà Nội", date: "08/03/2026", type: "Địa hình", status: "Từ chối", priority: "Thấp" },
  { id: "KD-007", bike: "Cube Attention 27.5", brand: "Cube", seller: "Đặng Văn G", phone: "0907 222 444", location: "TP.HCM", date: "07/03/2026", type: "Địa hình", status: "Đang kiểm định", priority: "Cao" },
  { id: "KD-008", bike: "Brompton M6L 2023", brand: "Brompton", seller: "Bùi Thị H", phone: "0908 333 555", location: "Hà Nội", date: "07/03/2026", type: "Thành thị", status: "Hoàn thành", priority: "Bình thường" },
];

const STATUS_OPTIONS = ["Tất cả", "Chờ kiểm định", "Đang kiểm định", "Hoàn thành", "Từ chối"];

const statusStyle: Record<string, string> = {
  "Chờ kiểm định": "bg-amber-100 text-amber-700",
  "Đang kiểm định": "bg-blue-100 text-blue-700",
  "Hoàn thành": "bg-emerald-100 text-emerald-700",
  "Từ chối": "bg-red-100 text-red-600",
};

const priorityStyle: Record<string, string> = {
  "Cao": "bg-red-50 text-red-600 border border-red-200",
  "Bình thường": "bg-gray-50 text-gray-600 border border-gray-200",
  "Thấp": "bg-green-50 text-green-600 border border-green-200",
};

export default function ManagerInspection() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");

  const filtered = ALL_INSPECTIONS.filter((item) => {
    const matchSearch =
      item.bike.toLowerCase().includes(search.toLowerCase()) ||
      item.seller.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Tất cả" || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ClipboardList size={20} className="text-amber-500" />
            Quản lý kiểm định
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Danh sách tất cả yêu cầu kiểm định xe đạp</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="bg-amber-50 text-amber-700 font-semibold px-3 py-1 rounded-lg border border-amber-200">
            {ALL_INSPECTIONS.filter(i => i.status === "Chờ kiểm định").length} chờ xử lý
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo mã, tên xe, người bán..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-8 pr-8 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-amber-400 appearance-none cursor-pointer bg-white"
            >
              {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-left text-xs uppercase tracking-wide">
                <th className="px-5 py-3 font-semibold">Mã / Xe</th>
                <th className="px-5 py-3 font-semibold">Người bán</th>
                <th className="px-5 py-3 font-semibold">Địa điểm</th>
                <th className="px-5 py-3 font-semibold">Ngày yêu cầu</th>
                <th className="px-5 py-3 font-semibold">Ưu tiên</th>
                <th className="px-5 py-3 font-semibold">Trạng thái</th>
                <th className="px-5 py-3 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-400">
                    Không tìm thấy kết quả phù hợp
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                          <Bike size={16} className="text-amber-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{item.bike}</p>
                          <p className="text-xs text-gray-400">{item.id} · {item.brand} · {item.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-gray-700">{item.seller}</p>
                      <p className="text-xs text-gray-400">{item.phone}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <MapPin size={12} />
                        {item.location}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <Calendar size={12} />
                        {item.date}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${priorityStyle[item.priority]}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="flex items-center gap-1.5 text-xs font-medium text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors">
                        <Eye size={13} />
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Hiển thị {filtered.length} / {ALL_INSPECTIONS.length} kết quả</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${p === 1 ? "bg-amber-500 text-white" : "hover:bg-gray-100 text-gray-600"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
