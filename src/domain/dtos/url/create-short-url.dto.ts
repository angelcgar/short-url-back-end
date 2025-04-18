export class CreateShortUrlDto {
	constructor(
		public short_code: string,
		public original_url: string,
	) {}

	static create(props: { [key: string]: any }): [string?, CreateShortUrlDto?] {
		const { short_code, original_url } = props;

		if (!short_code || !original_url) {
			return ['Invalid parameters', undefined];
		}

		return [undefined, new CreateShortUrlDto(short_code, original_url)];
	}
}
