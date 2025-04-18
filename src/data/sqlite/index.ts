import { createClient } from '@libsql/client';
import { envs } from '../../config/envs';

export const turso = createClient({
	url: envs.TURSO_DATABASE_URL,
	authToken: envs.TURSO_AUTH_TOKEN,
});
