import type { ShortUrl } from '../data/sqlite/ShortUrlRepository';

import type { CreateShortUrlDto } from '../domain/dtos/url/create-short-url.dto';
import type { ShortUrlEntity } from '../domain/entities/shor-url.entity';

export abstract class ShortUrlDatasource {
	abstract create(
		createShortUrlDto: CreateShortUrlDto,
	): Promise<ShortUrlEntity>;
	abstract findByCode(short_code: string): Promise<ShortUrlEntity | null>;
	abstract incrementVisits(short_code: string): Promise<void>;
}
