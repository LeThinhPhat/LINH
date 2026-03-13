import { useState } from "react";
import { FileBarChart2, Search, Eye, Download, CheckCircle2, XCircle, Clock, Filter, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const REPORTS = [
  {
    id: "BC-001",
    inspectionId: "KD-003",
    bike: "Cannondale Quick 4",
    seller: "Lê Văn C",
    inspector: "Minh Trung",
    createdAt: "09/03/2026",
    result: "Đạt",
    score: 92,
    note: "Xe trong tình trạng tốt, đủ tiêu chuẩn lưu hành.",
    issues: [],
  },
  {
    id: "BC-002",
    inspectionId: "KD-005",
    bike: "Scott Speedster 40",
    seller: "Hoàng Văn E",
    inspector: "Minh Trung",
    createdAt: "08/03/2026",
    result: "Đạt",
    score: 87,
    note: "Cần thay pads phanh trong vòng 3 tháng.",
    issues: ["Pads phanh mòn 70%"],
  },
  {
    id: "BC-003",
    inspectionId: "KD-006",
    bike: "Merida Reacto 400",
    seller: "Vũ Thị F",
    inspector: "Minh Trung",
    createdAt: "08/03/2026",
    result: "Không đạt",
    score: 34,
    note: "Khung bị nứt, nguy hiểm cho người sử dụng.",
    issues: ["Khung bị biến dạng", "Bánh trước không đồng tâm", "Phanh không hoạt động"],
  },
  {
    id: "BC-004",
    inspectionId: "KD-008",
    bike: "Brompton M6L 2023",
    seller: "Bùi Thị H",
    inspector: "Minh Trung",
    createdAt: "07/03/2026",
    result: "Đạt",
    score: 96,
    note: "Xe gần như mới, rất ít sử dụng.",
    issues: [],
  },
];

const resultStyle: Record<string, { cls: string; icon: typeof CheckCircle2 }> = {
  "Đạt": { cls: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  "Không đạt": { cls: "bg-red-100 text-red-600", icon: XCircle },
  "Chờ duyệt": { cls: "bg-amber-100 text-amber-700", icon: Clock },
};

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`${color} h-full rounded-full`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-8 text-right">{score}</span>
    </div>
  );
}

export default function ManagerInspectionReport() {
  const [search, setSearch] = useState("");
  const [filterResult, setFilterResult] = useState("Tất cả");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = REPORTS.filter((r) => {
    const matchSearch =
      r.bike.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.seller.toLowerCase().includes(search.toLowerCase());
    const matchResult = filterResult === "Tất cả" || r.result === filterResult;
    return matchSearch && matchResult;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileBarChart2 size={20} className="text-amber-500" />
            Quản lý báo cáo kiểm định
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Xem và quản lý toàn bộ báo cáo kiểm định xe đạp</p>
        </div>
        <Link
          to="/inspector/create-report"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm"
        >
          + Tạo báo cáo mới
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tổng báo cáo", value: REPORTS.length, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
          { label: "Đạt tiêu chuẩn", value: REPORTS.filter(r => r.result === "Đạt").length, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-100" },
          { label: "Không đạt", value: REPORTS.filter(r => r.result === "Không đạt").length, color: "bg-red-50 text-red-600", border: "border-red-100" },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-2xl border ${s.border} p-4 shadow-sm`}>
            <div className={`text-2xl font-bold ${s.color.split(" ")[1]}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo mã báo cáo, tên xe, người bán..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={filterResult}
            onChange={(e) => setFilterResult(e.target.value)}
            className="pl-8 pr-8 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-amber-400 appearance-none cursor-pointer bg-white"
          >
            {["Tất cả", "Đạt", "Không đạt"].map((s) => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Reports list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
            Không tìm thấy báo cáo phù hợp
          </div>
        )}
        {filtered.map((report) => {
          const { cls, icon: Icon } = resultStyle[report.result] ?? resultStyle["Chờ duyệt"];
          const isOpen = expanded === report.id;
          return (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-amber-200 transition-colors"
            >
              {/* Row */}
              <div className="px-5 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0 grid sm:grid-cols-4 gap-3 items-center">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{report.id}</p>
                    <p className="font-semibold text-gray-800 text-sm truncate">{report.bike}</p>
                    <p className="text-xs text-gray-400">{report.seller} · {report.createdAt}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs text-gray-400">Điểm đánh giá</p>
                    <ScoreBar score={report.score} />
                  </div>
                  <div className="hidden sm:block">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cls}`}>
                      <Icon size={12} />
                      {report.result}
                    </span>
                  </div>
                  <div className="hidden sm:block text-xs text-gray-500 italic truncate">
                    "{report.note}"
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setExpanded(isOpen ? null : report.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Eye size={13} />
                    {isOpen ? "Ẩn" : "Xem"}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
                    <Download size={13} />
                    Xuất
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50 space-y-3">
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Thông tin kiểm định</p>
                      <p className="text-gray-700">Mã kiểm định: <span className="font-medium">{report.inspectionId}</span></p>
                      <p className="text-gray-700">Kiểm định viên: <span className="font-medium">{report.inspector}</span></p>
                      <p className="text-gray-700">Ngày tạo: <span className="font-medium">{report.createdAt}</span></p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Kết quả</p>
                      <div className="mb-2">
                        <ScoreBar score={report.score} />
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cls}`}>
                        <Icon size={12} />
                        {report.result}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Vấn đề phát hiện ({report.issues.length})
                      </p>
                      {report.issues.length === 0 ? (
                        <p className="text-emerald-600 text-xs flex items-center gap-1">
                          <CheckCircle2 size={12} /> Không có vấn đề
                        </p>
                      ) : (
                        <ul className="space-y-1">
                          {report.issues.map((issue, i) => (
                            <li key={i} className="text-xs text-red-600 flex items-center gap-1.5">
                              <XCircle size={11} />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Ghi chú</p>
                    <p className="text-sm text-gray-700">{report.note}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
