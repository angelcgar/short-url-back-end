/**
 * Inicializa y exporta el cliente de base de datos Turso (compatible con SQLite).
 *
 * Este archivo configura la conexión a la base de datos utilizando las variables de entorno definidas en config/envs.
 */
import { createClient } from '@libsql/client';
import { envs } from '../../config/envs';

/**
 * Cliente de base de datos para ejecutar consultas SQL sobre Turso.
 * Se utiliza en los data sources y repositorios de la aplicación.
 */
export const turso = createClient({
	url: envs.TURSO_DATABASE_URL,
	authToken: envs.TURSO_AUTH_TOKEN,
});
