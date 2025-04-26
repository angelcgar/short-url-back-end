/**
 * Este archivo define la clase ServerApp, encargada de configurar y levantar el servidor HTTP principal
 * de la aplicación Short URL utilizando Express. Gestiona middlewares, rutas, archivos estáticos y el ciclo de vida del servidor.
 */
import express, { type Router } from 'express';
import path from 'node:path';
import cors from 'cors';

/**
 * Propiedades para inicializar el servidor.
 * @property port Puerto en el que escuchará el servidor (opcional).
 * @property public_path Ruta a la carpeta de archivos estáticos (opcional).
 * @property router Router principal con las rutas de la app.
 */
interface ServerAppProps {
	port?: number;
	public_path?: string;
	router: Router;
}

type ServerListener = import('http').Server<
	typeof import('http').IncomingMessage,
	typeof import('http').ServerResponse
>;

/**
 * Clase principal para la gestión del servidor Express.
 *
 * - Configura middlewares para JSON, formularios y archivos estáticos.
 * - Define las rutas principales de la aplicación.
 * - Permite iniciar y cerrar el servidor.
 */
export class ServerApp {
	public readonly app = express();

	private port: number | string;
	private publicPath: string;
	private router: Router;

	private serverListener?: ServerListener;

	/**
	 * Inicializa la instancia del servidor con las propiedades dadas.
	 * @param serverProps Configuración del servidor (puerto, rutas, path público)
	 */
	constructor(serverProps: ServerAppProps) {
		const { port, router, public_path = 'public' } = serverProps;

		this.port = port ?? 3000;
		this.publicPath = public_path;
		this.router = router;
	}

	/**
	 * Inicia el servidor HTTP y configura los middlewares y rutas.
	 */
	public start() {
		// cors
		this.app.use(
			cors({
				origin: [
					'https://short-url-front-end.vercel.app',
					'http://localhost:5173',
				],
			}),
		);

		// * Middleware
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		// * PUBLIC FOLDER
		this.app.use(express.static(this.publicPath));

		// * ROUTES
		this.app.use(this.router);

		// * SPA
		this.app.get('*', (_req, res) => {
			const indexPath = path.join(
				`${__dirname}/../../${this.publicPath}/index.html`,
			);

			res.sendFile(indexPath);
		});

		this.serverListener = this.app.listen(this.port, () => {
			console.log(`Servidor escuchando en puerto ${this.port}`);
		});
	}

	/**
	 * Cierra el servidor HTTP si está activo.
	 */
	public close() {
		this.serverListener?.close();
	}
}
