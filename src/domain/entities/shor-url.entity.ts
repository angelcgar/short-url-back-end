export class ShortUrlEntity {
	constructor(
		public short_code: string,
		public original_url: string,
		public id: number,
		public created_at: string,
		public visit_count?: number,
	) {}

	get visitCount() {
		return this.visit_count;
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static fromObject(obj: Record<string, any>) {
		const { short_code, original_url, id, created_at, visit_count } = obj;
		if (!id) throw new Error('Invalid object');

		// todo: incrementar visit_count

		return new ShortUrlEntity(
			short_code,
			original_url,
			id,
			created_at,
			visit_count,
		);
	}
}
