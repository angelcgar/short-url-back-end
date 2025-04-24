/**
 * Controlador para gestionar las operaciones HTTP relacionadas con URLs cortas.
 *
 * Este archivo define la clase que recibe las peticiones del cliente, valida los datos y coordina
 * la ejecución de los casos de uso del dominio, devolviendo respuestas adecuadas.
 */
import type { Request, Response } from 'express';

import { CustomError } from '../../domain/errors/custom.error';
import type { ShortUrlRepository } from '../../domain/repositories/short-url.repository';
import { CreateShortUrlDto } from '../../domain/dtos/url/create-short-url.dto';
import { CreateShortUrl } from '../../domain/use-cases/short-url/create-short-url';
import { GetShortUrl } from '../../domain/use-cases/short-url/get-short-url';
import { GetAllShortUrl } from '../../domain/use-cases/short-url/get-short.urls';

/**
 * Controlador para las rutas relacionadas con Short URL.
 *
 * Gestiona la creación de nuevas URLs cortas y el manejo de errores.
 */
export class ShortUrlController {
	/**
	 * Recibe una instancia de repositorio para interactuar con el dominio.
	 * @param shortUrlRepository Repositorio de URLs cortas.
	 */
	constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

	/**
	 * Maneja los errores y envía respuestas HTTP adecuadas.
	 * @param res Objeto Response de Express.
	 * @param error Error capturado.
	 * @private
	 */
	private handleError = (res: Response, error: unknown) => {
		if (error instanceof CustomError) {
			res.status(error.statusCode).json({ error: error.message });
			return;
		}

		// grabar log
		res.status(500).json({ error: 'Internal server error - check logs' });
	};

	public getAllShortUrl = async (req: Request, res: Response) => {
		new GetAllShortUrl(this.shortUrlRepository)
			.execute()
			.then((shortUrls) => res.status(200).json(shortUrls))
			.catch((err) => this.handleError(res, err));
	};

	/**
	 * Endpoint para crear una nueva URL corta.
	 *
	 * - Valida el body de la petición.
	 * - Ejecuta el caso de uso de creación.
	 * - Devuelve la URL corta creada o un error si corresponde.
	 *
	 * @param req Objeto Request de Express.
	 * @param res Objeto Response de Express.
	 */
	public createShortUrl = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).json({ error: 'Invalid parameters' });
			return;
		}

		const [error, createShortUrlDto] = CreateShortUrlDto.create(req.body);

		if (error) {
			res.status(400).json({ error });
			return;
		}

		new CreateShortUrl(this.shortUrlRepository)
			.execute(createShortUrlDto!)
			.then((shortUrl) => res.status(201).json(shortUrl))
			.catch((err) => this.handleError(res, err));
	};

	public getShortUrl = async (req: Request, res: Response) => {
		if (!req.params.shortCode) {
			res.status(400).json({ error: 'Invalid parameters' });
			return;
		}

		const shortCode = req.params.shortCode;
		console.log(shortCode);

		new GetShortUrl(this.shortUrlRepository)
			.execute(shortCode)
			.then((shortUrl) => res.redirect(shortUrl))
			.catch((err) => this.handleError(res, err));
	};
}
