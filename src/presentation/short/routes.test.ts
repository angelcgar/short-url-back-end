import { describe, it, expect, vi, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import { ShortUrlRoutes } from './routes';
import * as controllerModule from './controller';

// Mock del controlador para POST exitoso
// todo: hacer que este test pase
const fakeShortUrl = {
	id: '21',
	original_url: 'https://example.com',
	short_code: 'abc123',
	created_at: new Date().toISOString(),
	visit_count: 0,
};

describe('ShortUrlRoutes', () => {
	const app = express();
	app.use(express.json());

	beforeAll(() => {
		// Mockear el método createShortUrl del controlador
		vi.spyOn(controllerModule, 'ShortUrlController').mockImplementation(
			() =>
				({
					createShortUrl: (_req, res) => res.status(201).json(fakeShortUrl),
				}) as any,
		);
	});

	app.use('/', ShortUrlRoutes.routes);

	it('GET / responde con Hello, World!!!!!', async () => {
		const res = await request(app).get('/');
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ message: 'Hello, World!!!!!' });
	});

	it('POST / responde 400 si original_url es inválida', async () => {
		const res = await request(app)
			.post('/')
			.send({ original_url: 'not-a-url' });
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('error');
	});

	it('POST / responde 201 y retorna el shortUrl creado', async () => {
		const res = await request(app)
			.post('/')
			.send({ original_url: 'https://example.com' });
		expect(res.status).toBe(201);
		expect(res.body).toMatchObject({
			id: expect.any(String),
			original_url: 'https://example.com',
			short_code: expect.any(String),
			created_at: expect.any(String),
			visit_count: 0,
		});
	});
});
