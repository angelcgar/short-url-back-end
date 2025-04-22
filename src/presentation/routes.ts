/**
 * Este archivo define las rutas principales de la aplicación Short URL.
 *
 * Centraliza y organiza los routers de los diferentes módulos, permitiendo una fácil extensión y mantenimiento.
 */
import { Router } from 'express';
import { ShortUrlRoutes } from './short/routes';

/**
 * Clase encargada de exponer el router principal de la app.
 *
 * Permite obtener todas las rutas agrupadas de la aplicación, delegando a los routers de cada módulo.
 */
export class AppRoutes {
	/**
	 * Devuelve el router principal con todas las rutas de la aplicación.
	 * Actualmente, monta las rutas del módulo Short URL bajo /api/short.
	 */
	public static get routes(): Router {
		const router = Router();

		router.use('/api/short', ShortUrlRoutes.routes);

		return router;
	}
}
