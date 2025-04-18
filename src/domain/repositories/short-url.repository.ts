import type { CreateShortUrlDto } from '../dtos/url/create-short-url.dto';
import type { ShortUrlEntity } from '../entities/shor-url.entity';

export abstract class ShortUrlRepository {
	abstract create(
		createShortUrlDto: CreateShortUrlDto,
	): Promise<ShortUrlEntity>;
	abstract findByCode(short_code: string): Promise<ShortUrlEntity | null>;
	abstract incrementVisits(short_code: string): Promise<void>;
}
