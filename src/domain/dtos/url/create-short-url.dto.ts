/**
 * DTO para la creación de una nueva URL corta.
 *
 * Este archivo define la estructura y validación de los datos necesarios para crear una URL corta en el sistema.
 */
import validUrl from 'valid-url';

/**
 * Data Transfer Object para la creación de Short URLs.
 */
export class CreateShortUrlDto {
	/**
	 * @param original_url URL original a acortar.
	 */
	constructor(public original_url: string) {}

	/**
	 * Valida y construye una instancia de CreateShortUrlDto a partir de un objeto plano.
	 *
	 * - Verifica que el parámetro original_url esté presente y sea una URL válida.
	 * - Devuelve una tupla [error, instancia] donde error es un string si hay error, o undefined si es válido.
	 *
	 * @param props Objeto con los datos de entrada.
	 * @returns [string?, CreateShortUrlDto?]
	 */
	static create(props: { [key: string]: any }): [string?, CreateShortUrlDto?] {
		const { original_url } = props;

		if (!original_url) {
			return ['original_url is required', undefined];
		}

		// Validar URL
		if (!validUrl.isUri(original_url)) {
			return ['Invalid URL', undefined];
		}

		return [undefined, new CreateShortUrlDto(original_url)];
	}
}
