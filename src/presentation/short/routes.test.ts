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

	it('GET /:shortCode redirige a la URL original si existe', async () => {
		// Mock del controlador para getShortUrl
		const mockRedirect = vi.fn((_req, res) =>
			res.redirect('[https://original.com](https://original.com)'),
		);
		vi.spyOn(controllerModule, 'ShortUrlController').mockImplementation(
			() =>
				({
					getShortUrl: mockRedirect,
					createShortUrl: (_req, res) => res.status(201).json(fakeShortUrl),
				}) as any,
		);

		const res = await request(app).get('/abc123');
		expect(res.status).toBe(302); // 302 Found (redirección)
		expect(res.header.location).toBe(
			'[https://original.com](https://original.com)',
		);
	});

	it('GET /:shortCode responde 400 si falta el parámetro', async () => {
		// El endpoint espera un parámetro, pero si se llama a / sin parámetro, debería devolver 404 por routing,
		// pero si quieres testear el controlador directamente:
		const req = { params: {} } as any;
		const res = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn(),
		} as unknown as Response;
		const ctrl = new controllerModule.ShortUrlController({} as any);
		// @ts-ignore
		await ctrl.getShortUrl(req, res);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: 'Invalid parameters' });
	});

	// Opcional: test para shortCode inexistente (simulando error 404)
	it('GET /:shortCode responde 404 si el shortCode no existe', async () => {
		const mockGetShortUrl = vi.fn((_req, res) =>
			res.status(404).json({ error: 'ShortUrl not found' }),
		);
		vi.spyOn(controllerModule, 'ShortUrlController').mockImplementation(
			() =>
				({
					getShortUrl: mockGetShortUrl,
					createShortUrl: (_req, res) => res.status(201).json(fakeShortUrl),
				}) as any,
		);

		const res = await request(app).get('/noexiste');
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty('error', 'ShortUrl not found');
	});
});
