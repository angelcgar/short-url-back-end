/**
 * Caso de uso para la creación de una nueva URL corta.
 *
 * Este archivo define el contrato y la implementación para orquestar la lógica
 * de negocio al crear una URL corta, delegando la persistencia al repositorio correspondiente.
 */
import type { CreateShortUrlDto } from '../../dtos/url/create-short-url.dto';
import type { ShortUrlEntity } from '../../entities/short-url.entity';
import type { ShortUrlRepository } from '../../repositories/short-url.repository';

/**
 * Contrato para el caso de uso de creación de URLs cortas.
 */
export interface CreateShortUrlUseCase {
	/**
	 * Ejecuta la lógica de creación de una nueva URL corta.
	 * @param createShortUrlDto Datos necesarios para crear la URL corta.
	 * @returns La entidad ShortUrl creada.
	 */
	execute(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrlEntity>;
}

/**
 * Implementación del caso de uso de creación de URLs cortas.
 *
 * Orquesta la operación utilizando el repositorio del dominio.
 */
export class CreateShortUrl implements CreateShortUrlUseCase {
	/**
	 * Recibe el repositorio de URLs cortas para interactuar con la capa de persistencia.
	 * @param repository Repositorio de URLs cortas.
	 */
	constructor(private readonly repository: ShortUrlRepository) {}

	/**
	 * Ejecuta la creación de la URL corta delegando al repositorio.
	 * @param createShortUrlDto Datos necesarios para crear la URL corta.
	 * @returns La entidad ShortUrl creada.
	 */
	execute(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrlEntity> {
		return this.repository.create(createShortUrlDto);
	}
}
