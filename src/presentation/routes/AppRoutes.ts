import { Router, type Request, type Response } from 'express';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AppRoutes {
	public static get routes(): Router {
		const router = Router();
		router.use('/api/short', (req: Request, res: Response) => {
			res.json({ message: 'Hello World' });
		});

		return router;
	}
}
