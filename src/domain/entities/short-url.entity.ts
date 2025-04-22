/**
 * Entidad de dominio que representa una URL corta.
 *
 * Esta clase modela los atributos y comportamientos asociados a una URL corta en el sistema.
 */
export class ShortUrlEntity {
	/**
	 * @param id Identificador único de la URL corta.
	 * @param original_url URL original a la que apunta el short link.
	 * @param short_code Código corto generado para redireccionar.
	 * @param created_at Fecha de creación de la URL corta.
	 * @param visit_count (opcional) Número de veces que se ha visitado la URL corta.
	 */
	constructor(
		public id: number,
		public original_url: string,
		public short_code: string,
		public created_at: string,
		public visit_count?: number,
	) {}

	/**
	 * Getter para obtener el número de visitas.
	 */
	get visitCount() {
		return this.visit_count;
	}

	/**
	 * Crea una instancia de ShortUrlEntity a partir de un objeto plano.
	 * @param obj Objeto con las propiedades necesarias.
	 * @returns Instancia de ShortUrlEntity.
	 * @throws Error si falta el id.
	 */
	public static fromObject(obj: Record<string, any>): ShortUrlEntity {
		const { id, original_url, short_code, created_at, visit_count } = obj;
		if (!id) throw new Error('Invalid object');

		// todo: incrementar visit_count

		return new ShortUrlEntity(
			id,
			original_url,
			short_code,
			created_at,
			visit_count,
		);
	}
}
