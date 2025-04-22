import { describe, it, expect, vi } from 'vitest';
import { CreateShortUrl } from './create-short-url';
import type { ShortUrlRepository } from '../../repositories/short-url.repository';

const dto = { original_url: 'https://test.com' };

describe('CreateShortUrl', () => {
	it('debe ejecutar el caso de uso y llamar al repositorio', async () => {
		const mockRepo = {
			create: vi.fn().mockResolvedValue({ id: 1 }),
		} as unknown as ShortUrlRepository;
		const useCase = new CreateShortUrl(mockRepo);
		await useCase.execute(dto as any);
		expect(mockRepo.create).toHaveBeenCalledWith(dto);
	});

	it('propaga el error si el repositorio lanza una excepción', async () => {
		const mockRepo = {
			create: vi.fn().mockRejectedValue(new Error('DB error')),
		} as unknown as ShortUrlRepository;
		const useCase = new CreateShortUrl(mockRepo);
		await expect(useCase.execute(dto as any)).rejects.toThrow('DB error');
	});
});
