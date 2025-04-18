import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),

	TURSO_DATABASE_URL: get('TURSO_DATABASE_URL').required().asString(),
	TURSO_AUTH_TOKEN: get('TURSO_AUTH_TOKEN').required().asString(),
};
