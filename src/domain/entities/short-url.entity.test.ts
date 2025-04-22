import { describe, it, expect } from 'vitest';
import { ShortUrlEntity } from './short-url.entity';

describe('ShortUrlEntity', () => {
  it('debe crear una entidad válida desde un objeto plano', () => {
    const obj = {
      id: 1,
      original_url: 'https://test.com',
      short_code: 'abc123',
      created_at: new Date().toISOString(),
    };
    const entity = ShortUrlEntity.fromObject(obj);
    expect(entity).toBeInstanceOf(ShortUrlEntity);
    expect(entity.original_url).toBe('https://test.com');
    expect(entity.short_code).toBe('abc123');
    expect(entity.id).toBe(1);
  });

  it('debe lanzar error si falta original_url', () => {
    const obj = {
      id: 1,
      short_code: 'abc123',
      created_at: new Date().toISOString(),
    };
    expect(() => ShortUrlEntity.fromObject(obj as any)).toThrow();
  });
});
