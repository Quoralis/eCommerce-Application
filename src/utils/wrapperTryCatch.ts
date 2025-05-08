export async function wrapperTryCatch<T = unknown>(
  url: string,
  opts: RequestInit = {} // глобальный интерфейс TS для fetch-опций
): Promise<T> {
  try {
    const res = await fetch(url, opts);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Error ${res.status}: ${text}`);
    }
    const data = (await res.json()) as T;
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('API Error:', err.message);
    } else {
      console.error('API Error: Unknown', err);
    }
    throw err;
  }
}
