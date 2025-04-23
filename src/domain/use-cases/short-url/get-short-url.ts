import { CustomError } from '../../errors/custom.error';
import type { ShortUrlRepository } from '../../repositories/short-url.repository';

/**
 * Caso de uso para obtener una URL corta a partir de su shortCode.
 */
export interface GetShortUrlUseCase {
	/**
	 * Busca la entidad ShortUrl correspondiente al shortCode proporcionado.
	 * @param shortCode Código corto de la URL.
	 * @returns La entidad ShortUrl encontrada o null si no existe.
	 */
	execute(shortCode: string): Promise<string | null>;
}

/**
 * Implementación concreta del caso de uso GetShortUrl.
 */
export class GetShortUrl implements GetShortUrlUseCase {
	constructor(private readonly repository: ShortUrlRepository) {}

	async execute(shortCode: string): Promise<string> {
		const shortUrl = await this.repository.findByShortCode(shortCode);

		if (!shortUrl) {
			throw new CustomError('ShortUrl not found', 404);
		}

		return shortUrl;
	}
}
