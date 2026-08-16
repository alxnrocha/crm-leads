import { Request, Response, NextFunction } from 'express';
import { Lead, Stage, User, LeadSource } from '../models/index.js';

export const getOverviewMetrics = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const totalLeads = await Lead.count();

    const leadsWithStages = await Lead.findAll({
      include: [{ model: Stage, as: 'stage', attributes: ['is_won', 'is_lost'] }],
      attributes: ['value_amount'],
    });

    let pipelineValue = 0;
    let wonRevenue = 0;
    let lostValue = 0;
    let wonCount = 0;
    let lostCount = 0;

    leadsWithStages.forEach((l) => {
      const val = Number(l.value_amount || 0);
      const stage = (l as unknown as { stage?: { is_won: boolean; is_lost: boolean } }).stage;

      if (stage?.is_won) {
        wonRevenue += val;
        wonCount += 1;
      } else if (stage?.is_lost) {
        lostValue += val;
        lostCount += 1;
      } else {
        pipelineValue += val;
      }
    });

    const closedDeals = wonCount + lostCount;
    const winRate = closedDeals > 0 ? Number(((wonCount / closedDeals) * 100).toFixed(1)) : 0;
    const avgDealSize =
      totalLeads > 0 ? Number(((pipelineValue + wonRevenue) / totalLeads).toFixed(2)) : 0;

    res.status(200).json({
      metrics: {
        total_leads: totalLeads,
        pipeline_value: pipelineValue,
        won_revenue: wonRevenue,
        lost_value: lostValue,
        won_count: wonCount,
        lost_count: lostCount,
        win_rate_percentage: winRate,
        avg_deal_size: avgDealSize,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStageDistribution = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stages = await Stage.findAll({
      order: [['order_index', 'ASC']],
      include: [{ model: Lead, as: 'leads', attributes: ['id', 'value_amount'] }],
    });

    const distribution = stages.map((s) => {
      const data = s.toJSON() as {
        id: number;
        name: string;
        color: string;
        order_index: number;
        is_won: boolean;
        is_lost: boolean;
        leads?: { id: number; value_amount: number }[];
      };
      const count = data.leads?.length || 0;
      const totalValue =
        data.leads?.reduce((acc, curr) => acc + Number(curr.value_amount || 0), 0) || 0;

      return {
        stage_id: data.id,
        stage_name: data.name,
        color: data.color,
        order_index: data.order_index,
        is_won: data.is_won,
        is_lost: data.is_lost,
        lead_count: count,
        total_value: totalValue,
      };
    });

    res.status(200).json({ distribution });
  } catch (error) {
    next(error);
  }
};

export const getSourcePerformance = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sources = await LeadSource.findAll({
      include: [
        {
          model: Lead,
          as: 'leads',
          attributes: ['id', 'value_amount'],
          include: [{ model: Stage, as: 'stage', attributes: ['is_won'] }],
        },
      ],
    });

    const performance = sources.map((src) => {
      const data = src.toJSON() as {
        id: number;
        name: string;
        leads?: { id: number; value_amount: number; stage?: { is_won: boolean } }[];
      };
      const count = data.leads?.length || 0;
      const totalValue =
        data.leads?.reduce((acc, curr) => acc + Number(curr.value_amount || 0), 0) || 0;
      const wonDeals = data.leads?.filter((l) => l.stage?.is_won).length || 0;
      const conversionRate = count > 0 ? Number(((wonDeals / count) * 100).toFixed(1)) : 0;

      return {
        source_id: data.id,
        source_name: data.name,
        lead_count: count,
        total_value: totalValue,
        won_deals: wonDeals,
        conversion_rate: conversionRate,
      };
    });

    res.status(200).json({ performance });
  } catch (error) {
    next(error);
  }
};

export const getRepPerformance = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reps = await User.findAll({
      attributes: ['id', 'name', 'email', 'avatar_url', 'role'],
      include: [
        {
          model: Lead,
          as: 'leads',
          attributes: ['id', 'value_amount'],
          include: [{ model: Stage, as: 'stage', attributes: ['is_won'] }],
        },
      ],
    });

    const performance = reps.map((rep) => {
      const data = rep.toJSON() as {
        id: number;
        name: string;
        email: string;
        avatar_url: string | null;
        role: string;
        leads?: { id: number; value_amount: number; stage?: { is_won: boolean } }[];
      };
      const count = data.leads?.length || 0;
      const totalValue =
        data.leads?.reduce((acc, curr) => acc + Number(curr.value_amount || 0), 0) || 0;
      const wonValue =
        data.leads
          ?.filter((l) => l.stage?.is_won)
          .reduce((acc, curr) => acc + Number(curr.value_amount || 0), 0) || 0;
      const wonCount = data.leads?.filter((l) => l.stage?.is_won).length || 0;

      return {
        user_id: data.id,
        name: data.name,
        email: data.email,
        avatar_url: data.avatar_url,
        role: data.role,
        assigned_leads: count,
        total_volume: totalValue,
        won_volume: wonValue,
        won_deals: wonCount,
      };
    });

    res.status(200).json({ reps: performance });
  } catch (error) {
    next(error);
  }
};
