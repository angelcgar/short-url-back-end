import type { CreateShortUrlDto } from '../../dtos/url/create-short-url.dto';
import type { ShortUrlEntity } from '../../entities/shor-url.entity';
import type { ShortUrlRepository } from '../../repositories/short-url.repository';

export interface CreateShortUrlUseCase {
	execute(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrlEntity>;
}

export class CreateShortUrl implements CreateShortUrlUseCase {
	constructor(private readonly repository: ShortUrlRepository) {}

	execute(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrlEntity> {
		return this.repository.create(createShortUrlDto);
	}
}
