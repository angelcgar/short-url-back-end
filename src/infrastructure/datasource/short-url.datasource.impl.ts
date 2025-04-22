import { turso } from '../../data/sqlite';
import type { ShortUrlDatasource } from '../../datasources/short-url.datasource';
import type { CreateShortUrlDto } from '../../domain/dtos/url/create-short-url.dto';
import { ShortUrlEntity } from '../../domain/entities/shor-url.entity';

import shortid from 'shortid';

export class ShortUrlDatasourceImpl implements ShortUrlDatasource {
	async create(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrlEntity> {
		// logica para generar el short_code
		const shortCode = shortid.generate();
		const shortUrl = `http://localhost:3000/${shortCode}`; // Cambia por tu dominio

		const result = await turso.execute(
			'INSERT INTO short_urls (short_code, original_url) VALUES (?, ?)',
			[shortUrl, createShortUrlDto.original_url],
		);

		return ShortUrlEntity.fromObject({
			id: result.lastInsertRowid?.toString(),
			original_url: createShortUrlDto.original_url,
			short_code: shortUrl,
			created_at: new Date().toISOString(),
			visit_count: 0,
		});
	}
	async findByCode(short_code: string): Promise<ShortUrlEntity | null> {
		const result = await turso.execute(
			'SELECT * FROM short_urls WHERE short_code = ? LIMIT 1',
			[short_code],
		);
		return result.rows.length
			? (result.rows[0] as unknown as ShortUrlEntity)
			: null;
	}
	async incrementVisits(short_code: string): Promise<void> {
		await turso.execute(
			'UPDATE short_urls SET visit_count = visit_count + 1 WHERE short_code = ?',
			[short_code],
		);
	}
}
