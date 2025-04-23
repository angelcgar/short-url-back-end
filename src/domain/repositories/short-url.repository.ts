/**
 * Este archivo define el contrato abstracto para el repositorio de URLs cortas.
 *
 * Permite desacoplar la lógica de negocio de la infraestructura de persistencia,
 * facilitando la implementación de diferentes estrategias de almacenamiento.
 */
import type { CreateShortUrlDto } from '../dtos/url/create-short-url.dto';
import type { ShortUrlEntity } from '../entities/short-url.entity';

/**
 * Contrato abstracto para la gestión de URLs cortas en el dominio.
 *
 * Las implementaciones deben encargarse de la creación, búsqueda e incremento de visitas de URLs cortas.
 */
export abstract class ShortUrlRepository {
	/**
	 * Crea una nueva URL corta a partir de los datos proporcionados.
	 * @param createShortUrlDto Datos necesarios para crear la URL corta.
	 * @returns La entidad ShortUrl creada.
	 */
	abstract create(
		createShortUrlDto: CreateShortUrlDto,
	): Promise<ShortUrlEntity>;

	/**
	 * Busca una URL corta por su código corto.
	 * @param shortCode Código corto a buscar.
	 * @returns La entidad encontrada o null si no existe.
	 */
	abstract findByShortCode(shortCode: string): Promise<string | null>;

	/**
	 * Busca una URL corta por su código identificador.
	 * @param short_code Código corto a buscar.
	 * @returns La entidad encontrada o null si no existe.
	 */
	abstract findByCode(short_code: string): Promise<ShortUrlEntity | null>;

	/**
	 * Incrementa el contador de visitas de una URL corta.
	 * @param short_code Código corto al que incrementar visitas.
	 */
	abstract incrementVisits(short_code: string): Promise<void>;
}
