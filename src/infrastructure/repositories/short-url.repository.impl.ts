import type { ShortUrlRepository } from '../../data/sqlite/ShortUrlRepository';
import type { ShortUrlDatasource } from '../../datasources/short-url.datasource';
import type { CreateShortUrlDto } from '../../domain/dtos/url/create-short-url.dto';
import type { ShortUrlEntity } from '../../domain/entities/shor-url.entity';

export class ShortUrlRepositoryImpl implements ShortUrlRepository {
	constructor(private readonly datasource: ShortUrlDatasource) {}

	async create(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrlEntity> {
		return this.datasource.create(createShortUrlDto);
	}
	async findByCode(short_code: string): Promise<ShortUrlEntity | null> {
		throw new Error('Method not implemented');
	}
	async incrementVisits(short_code: string): Promise<void> {
		throw new Error('Method not implemented');
	}
}
