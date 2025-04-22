/**
 * Implementación concreta del repositorio de URLs cortas en la capa de infraestructura.
 *
 * Este archivo conecta el dominio con la fuente de datos, delegando las operaciones al datasource correspondiente.
 */
import type { ShortUrlDatasource } from '../../datasources/short-url.datasource';

import type { CreateShortUrlDto } from '../../domain/dtos/url/create-short-url.dto';
import type { ShortUrlEntity } from '../../domain/entities/short-url.entity';
import type { ShortUrlRepository } from '../../domain/repositories/short-url.repository';

/**
 * Implementa el contrato ShortUrlRepository utilizando un ShortUrlDatasource.
 *
 * Permite desacoplar el dominio de la infraestructura de persistencia.
 */
export class ShortUrlRepositoryImpl implements ShortUrlRepository {
	/**
	 * Recibe una instancia de datasource para delegar las operaciones de persistencia.
	 * @param datasource Fuente de datos concreta (por ejemplo, SQL, memoria, etc).
	 */
	constructor(private readonly datasource: ShortUrlDatasource) {}

	/**
	 * Crea una nueva URL corta delegando al datasource.
	 * @param createShortUrlDto Datos necesarios para crear la URL corta.
	 * @returns La entidad ShortUrl creada.
	 */
	async create(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrlEntity> {
		return this.datasource.create(createShortUrlDto);
	}

	/**
	 * Busca una URL corta por su código identificador.
	 * @param short_code Código corto a buscar.
	 * @returns La entidad encontrada o null si no existe.
	 * @throws Error si el método no está implementado.
	 */
	async findByCode(short_code: string): Promise<ShortUrlEntity | null> {
		throw new Error('Method not implemented');
	}

	/**
	 * Incrementa el contador de visitas de una URL corta.
	 * @param short_code Código corto al que incrementar visitas.
	 * @throws Error si el método no está implementado.
	 */
	async incrementVisits(short_code: string): Promise<void> {
		throw new Error('Method not implemented');
	}
}
