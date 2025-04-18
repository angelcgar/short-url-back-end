import type { Request, Response } from 'express';

import { CustomError } from '../../domain/errors/custom.error';
import type { ShortUrlRepository } from '../../domain/repositories/short-url.repository';
import { CreateShortUrlDto } from '../../domain/dtos/url/create-short-url.dto';
import { CreateShortUrl } from '../../domain/use-cases/short-url/create-short-url';

export class ShortUrlController {
	constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

	private handleError = (res: Response, error: unknown) => {
		if (error instanceof CustomError) {
			res.status(error.statusCode).json({ error: error.message });
			return;
		}

		// grabar log
		res.status(500).json({ error: 'Internal server error - check logs' });
	};

	public createShortUrl = async (req: Request, res: Response) => {
		console.log('hola');

		if (!req.body) res.status(400).json({ error: 'Invalid parameters' });

		const [error, createShortUrlDto] = CreateShortUrlDto.create(req.body);

		if (error) {
			res.status(400).json({ error });
		}

		new CreateShortUrl(this.shortUrlRepository)
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			.execute(createShortUrlDto!)
			.then((shortUrl) => res.status(201).json(shortUrl))
			.catch((err) => this.handleError(res, err));
	};
}
