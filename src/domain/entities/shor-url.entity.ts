export class ShortUrlEntity {
	constructor(
		public id: number,
		public original_url: string,
		public short_code: string,
		public created_at: string,
		public visit_count?: number,
	) {}

	get visitCount() {
		return this.visit_count;
	}

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
