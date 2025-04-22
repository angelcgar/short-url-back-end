/**
 * Clase base para errores personalizados en la aplicación.
 *
 * Permite asociar un mensaje y un código de estado HTTP a los errores lanzados en el dominio o presentación.
 */
export class CustomError extends Error {
	/**
	 * @param message Mensaje descriptivo del error.
	 * @param statusCode Código de estado HTTP asociado al error.
	 */
	constructor(
		public readonly message: string,
		public readonly statusCode: number,
	) {
		super(message);
	}
}
