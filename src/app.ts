import { AppRoutes } from './presentation/routes/AppRoutes';
import { ServerApp } from './presentation/server';
import 'dotenv/config';

// console.log('Environment:', process.env.NODE_ENV);

(async () => {
	main();
})();

function main() {
	const server = new ServerApp({
		port: Number(process.env.PORT),
		router: AppRoutes.routes,
		public_path: process.env.PUBLIC_PATH,
	});
	server.start();
}
