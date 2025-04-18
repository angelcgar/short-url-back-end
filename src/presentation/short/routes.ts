import { Router } from 'express';
import { ShortUrlDatasourceImpl } from '../../infrastructure/datasource/short-url.datasource.impl';
import { ShortUrlRepositoryImpl } from '../../infrastructure/repositories/short-url.repository.impl';
import { ShortUrlController } from './controller';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ShortUrlRoutes {
	static get routes(): Router {
		const router = Router();

		console.log('hola mundo');

		const datasource = new ShortUrlDatasourceImpl();

		const shortUrlRepository = new ShortUrlRepositoryImpl(datasource);

		const shortUrlController = new ShortUrlController(shortUrlRepository);

		router.get('/', (_req, res) => {
			return res.status(200).json({ message: 'Hello, World!!!!!' });
		});

		router.post('/', shortUrlController.createShortUrl);

		return router;
	}
}
