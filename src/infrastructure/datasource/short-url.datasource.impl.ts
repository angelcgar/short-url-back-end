/**
 * Implementación concreta de la fuente de datos para URLs cortas usando SQLite.
 *
 * Este archivo contiene la lógica para crear, buscar e incrementar visitas de URLs cortas
 * persistidas en una base de datos SQLite.
 */
import shortid from 'shortid';

import { turso } from '../../data/sqlite';

import type { ShortUrlDatasource } from '../../datasources/short-url.datasource';

import type { CreateShortUrlDto } from '../../domain/dtos/url/create-short-url.dto';
import { ShortUrlEntity } from '../../domain/entities/short-url.entity';
import { CustomError } from '../../domain/errors/custom.error';

/**
 * Implementa la interfaz ShortUrlDatasource para gestionar URLs cortas en SQLite.
 * Esta clase proporciona métodos para crear, buscar e incrementar visitas de URLs cortas.
 */
export class ShortUrlDatasourceImpl implements ShortUrlDatasource {
	/**
	 * Crea y almacena una nueva URL corta en la base de datos.
	 * @param createShortUrlDto Datos necesarios para crear la URL corta.
	 * @returns La entidad ShortUrl creada y persistida.
	 */
	async create(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrlEntity> {
		// logica para generar el short_code
		const shortCode = shortid.generate();
		const shortUrl = `http://localhost:3000/${shortCode}`; // Cambia por tu dominio

		const result = await turso.execute(
			'INSERT INTO short_urls (short_code, original_url) VALUES (?, ?)',
			[shortCode, createShortUrlDto.original_url],
		);

		return ShortUrlEntity.fromObject({
			id: result.lastInsertRowid?.toString(),
			original_url: createShortUrlDto.original_url,
			short_code: shortCode.toString(),
			created_at: new Date().toISOString(),
			visit_count: 0,
		});
	}

	/**
	 * Busca una URL corta por su código corto.
	 * @param shortCode Código corto a buscar.
	 * @returns La entidad encontrada o null si no existe.
	 */
	async findByShortCode(shortCode: string): Promise<string | null> {
		const result = await turso.execute(
			'SELECT * FROM short_urls WHERE short_code = ? LIMIT 1',
			[shortCode],
		);

		console.log(result.rows[0].original_url, 'result ====>');

		if (!result.rows.length) {
			// todo: hacer un custom error
			throw new CustomError('ShortUrl not found', 404);
		}

		return result.rows[0].original_url as string;
	}

	/**
	 * Busca una URL corta por su código en la base de datos.
	 * @param short_code Código corto a buscar.
	 * @returns La entidad encontrada o null si no existe.
	 */
	async findByCode(short_code: string): Promise<ShortUrlEntity | null> {
		const result = await turso.execute(
			'SELECT * FROM short_urls WHERE short_code = ? LIMIT 1',
			[short_code],
		);
		return result.rows.length
			? (result.rows[0] as unknown as ShortUrlEntity)
			: null;
	}
	/**
	 * Incrementa el contador de visitas de una URL corta en la base de datos.
	 * @param short_code Código corto al que incrementar visitas.
	 */
	async incrementVisits(short_code: string): Promise<void> {
		await turso.execute(
			'UPDATE short_urls SET visit_count = visit_count + 1 WHERE short_code = ?',
			[short_code],
		);
	}
}
