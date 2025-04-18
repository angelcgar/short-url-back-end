import express, { type Router } from 'express';
import path from 'node:path';

interface ServerAppProps {
	port?: number;
	public_path?: string;
	router: Router;
}

type ServerListener = import('http').Server<
	typeof import('http').IncomingMessage,
	typeof import('http').ServerResponse
>;

export class ServerApp {
	public readonly app = express();

	private port: number | string;
	private publicPath: string;
	private router: Router;

	private serverListener?: ServerListener;

	constructor(serverProps: ServerAppProps) {
		const { port, router, public_path = 'public' } = serverProps;

		this.port = port ?? 3000;
		this.publicPath = public_path;
		this.router = router;
	}

	public start() {
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

	public close() {
		this.serverListener?.close();
	}
}
