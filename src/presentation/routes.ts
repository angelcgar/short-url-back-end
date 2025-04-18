import { Router, type Request, type Response } from 'express';
import { ShortUrlDatasourceImpl } from '../infrastructure/datasource/short-url.datasource.impl';
import { ShortUrlRoutes } from './short/routes';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AppRoutes {
	public static get routes(): Router {
		const router = Router();

		router.use('/api/short', ShortUrlRoutes.routes);

		return router;
	}
}
