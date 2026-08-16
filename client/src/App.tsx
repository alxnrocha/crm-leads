import { ShieldCheck, Database, LayoutGrid, Users } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mb-6">
          <LayoutGrid className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">LeadFlow CRM</h1>
        <p className="text-slate-500 mb-8">
          Sistema integral de gestión de leads, prospección B2B y pipeline comercial.
        </p>

        <div className="grid grid-cols-3 gap-3 text-left mb-8">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <ShieldCheck className="w-5 h-5 text-indigo-600 mb-1" />
            <div className="text-xs font-semibold text-slate-700">Auth JWT</div>
            <div className="text-[11px] text-slate-400">Node & Express 5</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Database className="w-5 h-5 text-indigo-600 mb-1" />
            <div className="text-xs font-semibold text-slate-700">MySQL 8.4</div>
            <div className="text-[11px] text-slate-400">ORM Sequelize</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Users className="w-5 h-5 text-indigo-600 mb-1" />
            <div className="text-xs font-semibold text-slate-700">React 19</div>
            <div className="text-[11px] text-slate-400">TypeScript + Vite 8</div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Proyecto 11 — Estructura y Tooling Inicial Configurados
        </div>
      </div>
    </div>
  );
}
