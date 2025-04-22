import validUrl from 'valid-url';

export class CreateShortUrlDto {
	constructor(
		public original_url: string,
		public short_code?: string,
	) {}

	// TODO: dar retroalimentacion del lado del Front-end en caso de hacer un error
	static create(props: { [key: string]: any }): [string?, CreateShortUrlDto?] {
		const { original_url } = props;

		if (!original_url) {
			return ['Invalid parameters', undefined];
		}

		// Validar URL
		if (!validUrl.isUri(original_url)) {
			return ['Invalid URL', undefined];
		}

		return [undefined, new CreateShortUrlDto(original_url)];
	}
}
