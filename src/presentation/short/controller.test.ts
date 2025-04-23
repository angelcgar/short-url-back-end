import { describe, it, expect, vi } from 'vitest';
import { ShortUrlController } from './controller';
import type { ShortUrlRepository } from '../../domain/repositories/short-url.repository';
import type { Request, Response } from 'express';

describe('ShortUrlController', () => {
	const mockRepo = {} as unknown as ShortUrlRepository;
	const controller = new ShortUrlController(mockRepo);

	it('debe responder 400 si no hay body', async () => {
		const req = { body: undefined } as unknown as Request;
		const res = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn(),
		} as unknown as Response;
		// @ts-ignore
		await controller.createShortUrl(req, res);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: 'Invalid parameters' });
	});

	it('debe responder 400 si el DTO es inválido', async () => {
		const req = { body: { original_url: 'not-a-url' } } as Request;
		const res = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn(),
		} as unknown as Response;
		// @ts-ignore
		await controller.createShortUrl(req, res);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: 'Invalid URL' });
	});

	it('debe responder 201 si la creación es exitosa', async () => {
		const req = { body: { original_url: 'https://test.com' } } as Request;
		const res = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn(),
		} as unknown as Response;
		const fakeShortUrl = {
			id: 1,
			original_url: 'https://test.com',
			short_code: 'abc',
		};
		const repo = {
			create: vi.fn().mockResolvedValue(fakeShortUrl),
		} as unknown as ShortUrlRepository;
		const ctrl = new ShortUrlController(repo);
		// @ts-ignore
		await ctrl.createShortUrl(req, res);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith(fakeShortUrl);
	});
});
