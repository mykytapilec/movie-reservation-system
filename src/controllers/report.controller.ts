import type { Request, Response } from 'express';

import { reportService } from '../services/report.service.js';

type ShowtimeReportRequest = Request<{
  id: string;
}>;

export const reportController = {
  getSummary: async (_req: Request, res: Response): Promise<void> => {
    const report = await reportService.getSummary();

    res.json(report);
  },

  getShowtimeReport: async (
    req: ShowtimeReportRequest,
    res: Response,
  ): Promise<void> => {
    const report = await reportService.getShowtimeReport(req.params.id);

    res.json(report);
  },
};