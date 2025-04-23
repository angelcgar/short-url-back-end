/**
 * Este archivo define las rutas relacionadas con la gestión de URLs cortas (Short URL).
 *
 * Aquí se instancian los componentes necesarios (datasource, repositorio y controlador) y se configuran
 * los endpoints para crear y consultar URLs cortas.
 */
import { Router } from 'express';

import { ShortUrlDatasourceImpl } from '../../infrastructure/datasource/short-url.datasource.impl';
import { ShortUrlRepositoryImpl } from '../../infrastructure/repositories/short-url.repository.impl';

import { ShortUrlController } from './controller';

/**
 * Clase que agrupa y expone las rutas del módulo Short URL.
 *
 * Se encarga de construir el router con las dependencias necesarias y los endpoints disponibles.
 */
export class ShortUrlRoutes {
	/**
	 * Devuelve el router con las rutas del módulo Short URL.
	 *
	 * - GET /           : Endpoint de prueba para comprobar disponibilidad.
	 * - POST /          : Crea una nueva URL corta.
	 */
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

		router.get('/:shortCode', shortUrlController.getShortUrl);

		return router;
	}
}
