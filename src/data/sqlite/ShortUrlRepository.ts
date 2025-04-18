import type { ShortUrlDatasource } from '../../datasources/short-url.datasource';
import type { CreateShortUrlDto } from '../../domain/dtos/url/create-short-url.dto';
import { ShortUrlEntity } from '../../domain/entities/shor-url.entity';
import { turso } from './index';

export interface ShortUrl {
	id?: number;
	short_code: string;
	original_url: string;
	created_at?: string;
	visit_count?: number;
}

export class ShortUrlRepository implements ShortUrlDatasource {
	async create(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrlEntity> {
		const result = await turso.execute(
			'INSERT INTO short_urls (short_code, original_url) VALUES (?, ?)',
			[createShortUrlDto.short_code, createShortUrlDto.original_url],
		);

		return ShortUrlEntity.fromObject({
			id: result.lastInsertRowid,
			short_code: createShortUrlDto.short_code,
			original_url: createShortUrlDto.original_url,
			created_at: new Date().toISOString(),
			visit_count: 0,
		});
	}

	async findByCode(short_code: string): Promise<ShortUrlEntity | null> {
		// const result = await turso.execute(
		// 	'SELECT * FROM short_urls WHERE short_code = ? LIMIT 1',
		// 	[short_code],
		// );
		// return result.rows.length ? (result.rows[0] as ShortUrlEntity) : null;

		throw new Error('Method not implemented');
	}

	async incrementVisits(short_code: string): Promise<void> {
		await turso.execute(
			'UPDATE short_urls SET visit_count = visit_count + 1 WHERE short_code = ?',
			[short_code],
		);
	}
}
