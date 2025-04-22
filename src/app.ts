/**
 * Punto de entrada principal de la aplicación Short URL backend.
 *
 * Inicializa y arranca el servidor HTTP utilizando la configuración definida en los archivos de entorno y rutas principales.
 *
 * Estructura general:
 * - Importa las rutas principales, el servidor y las variables de entorno.
 * - Ejecuta la función main() de manera asíncrona.
 */
import { AppRoutes } from './presentation/routes';
import { ServerApp } from './presentation/server';
import { envs } from './config/envs';

(async () => {
	main();
})();

/**
 * Función principal que configura y arranca el servidor.
 *
 * - Crea una instancia de ServerApp con el puerto, path público y rutas.
 * - Inicia el servidor para escuchar peticiones HTTP.
 */
function main() {
	const server = new ServerApp({
		port: envs.PORT,
		public_path: envs.PUBLIC_PATH,
		router: AppRoutes.routes,
	});

	server.start();
}
