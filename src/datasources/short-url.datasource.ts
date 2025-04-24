/**
 * Este archivo define la fuente de datos abstracta para la gestión de URLs cortas.
 *
 * Sirve como contrato para la implementación de operaciones sobre URLs cortas en diferentes orígenes de datos (por ejemplo, bases de datos SQL, NoSQL, etc).
 */
import type { CreateShortUrlDto } from '../domain/dtos/url/create-short-url.dto';
import type { ShortUrlEntity } from '../domain/entities/short-url.entity';

/**
 * Contrato abstracto para las operaciones de persistencia y consulta de URLs cortas.
 *
 * Las implementaciones concretas deben definir la lógica de almacenamiento, recuperación y actualización.
 */
export abstract class ShortUrlDatasource {
	/**
	 * Busca todas las URLs cortas.
	 * @returns La lista de entidades ShortUrl.
	 */
	abstract getAll(): Promise<ShortUrlEntity[]>;

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
