import React from 'react';
import { TrendingUp, Target, DollarSign, Users } from 'lucide-react';
import { Card } from '../ui/index.js';

export interface OverviewMetricsData {
  total_leads?: number;
  pipeline_value?: number;
  won_revenue?: number;
  win_rate_percentage?: number;
}

interface MetricCardsProps {
  metrics?: OverviewMetricsData;
  isLoading?: boolean;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ metrics, isLoading = false }) => {
  const pipelineValueFormatted =
    metrics?.pipeline_value !== undefined
      ? `€${metrics.pipeline_value.toLocaleString('es-ES')}`
      : '€345,000';

  const winRateFormatted =
    metrics?.win_rate_percentage !== undefined ? `${metrics.win_rate_percentage}%` : '42%';

  const wonRevenueFormatted =
    metrics?.won_revenue !== undefined
      ? `€${metrics.won_revenue.toLocaleString('es-ES')}`
      : '€120,000';

  const totalLeadsFormatted = metrics?.total_leads !== undefined ? `${metrics.total_leads}` : '18';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* 1. Total Pipeline Value */}
      <Card className="bg-[#121824] border-slate-800/80 p-5 rounded-2xl relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-slate-400">Total Pipeline Value</span>
            <div className="text-2xl font-bold tracking-tight text-white">
              {isLoading ? (
                <div className="h-8 w-28 bg-slate-800 animate-pulse rounded-lg" />
              ) : (
                pipelineValueFormatted
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+12.5%</span>
          <span className="text-slate-500 font-normal">from last month</span>
        </div>
      </Card>

      {/* 2. Win Rate */}
      <Card className="bg-[#121824] border-slate-800/80 p-5 rounded-2xl relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-slate-400">Win Rate</span>
            <div className="text-2xl font-bold tracking-tight text-white">
              {isLoading ? (
                <div className="h-8 w-20 bg-slate-800 animate-pulse rounded-lg" />
              ) : (
                winRateFormatted
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Target className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+4.3%</span>
          <span className="text-slate-500 font-normal">from last month</span>
        </div>
      </Card>

      {/* 3. Won Revenue */}
      <Card className="bg-[#121824] border-slate-800/80 p-5 rounded-2xl relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-slate-400">Won Revenue</span>
            <div className="text-2xl font-bold tracking-tight text-white">
              {isLoading ? (
                <div className="h-8 w-28 bg-slate-800 animate-pulse rounded-lg" />
              ) : (
                wonRevenueFormatted
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+18.2%</span>
          <span className="text-slate-500 font-normal">from last month</span>
        </div>
      </Card>

      {/* 4. Total Active Leads */}
      <Card className="bg-[#121824] border-slate-800/80 p-5 rounded-2xl relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-slate-400">Total Leads</span>
            <div className="text-2xl font-bold tracking-tight text-white">
              {isLoading ? (
                <div className="h-8 w-16 bg-slate-800 animate-pulse rounded-lg" />
              ) : (
                totalLeadsFormatted
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Pipeline</span>
        </div>
      </Card>
    </div>
  );
};
