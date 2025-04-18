import { AppRoutes } from './presentation/routes';
import { ServerApp } from './presentation/server';
import { envs } from './config/envs';

(async () => {
	main();
})();

function main() {
	const server = new ServerApp({
		port: envs.PORT,
		router: AppRoutes.routes,
		public_path: envs.PUBLIC_PATH,
	});
	server.start();
}
