import type { ShortUrlEntity } from '../../entities/short-url.entity';
import type { ShortUrlRepository } from '../../repositories/short-url.repository';

export interface GetAllShortUrlUseCase {
	execute(): Promise<ShortUrlEntity[]>;
}

export class GetAllShortUrl implements GetAllShortUrlUseCase {
	constructor(private readonly repository: ShortUrlRepository) {}

	async execute(): Promise<ShortUrlEntity[]> {
		return this.repository.getAll();
	}
}
