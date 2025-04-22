import { describe, it, expect } from 'vitest';
import { CreateShortUrlDto } from './create-short-url.dto';

describe('CreateShortUrlDto', () => {
  it('debe crear una instancia válida con una URL válida', () => {
    const [error, dto] = CreateShortUrlDto.create({ original_url: 'https://example.com' });
    expect(error).toBeUndefined();
    expect(dto).toBeInstanceOf(CreateShortUrlDto);
    expect(dto?.original_url).toBe('https://example.com');
  });

  it('debe retornar error si falta original_url', () => {
    const [error, dto] = CreateShortUrlDto.create({});
    expect(error).toBe('Invalid parameters');
    expect(dto).toBeUndefined();
  });

  it('debe retornar error si la URL es inválida', () => {
    const [error, dto] = CreateShortUrlDto.create({ original_url: 'not-a-url' });
    expect(error).toBe('Invalid URL');
    expect(dto).toBeUndefined();
  });
});
