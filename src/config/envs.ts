/**
 * Carga y valida las variables de entorno necesarias para la aplicación.
 *
 * Utiliza dotenv y env-var para asegurar la presencia y el tipo correcto de cada variable.
 */
import 'dotenv/config';
import { get } from 'env-var';

/**
 * Objeto que contiene las variables de entorno validadas y listas para usar en la app.
 */
export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),

	TURSO_DATABASE_URL: get('TURSO_DATABASE_URL').required().asString(),
	TURSO_AUTH_TOKEN: get('TURSO_AUTH_TOKEN').required().asString(),
};
