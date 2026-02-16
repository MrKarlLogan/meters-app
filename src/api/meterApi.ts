import { Area, AreasResponse, MetersResponse } from '@/types/api';

const API_BASE_URL = '/api';

const areasCache = new Map<string, Area>([]);

export const meterApi = {
  async getMeters(offset: number, limit: number) {
    const response = await fetch(
      `${API_BASE_URL}/meters/?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) throw new Error('Ошибка при получении данных');
    return response.json() as Promise<MetersResponse>;
  },

  async getAreas(areasIds: string[]) {
    if (areasIds.length === 0) return { results: [] };

    const unknowIds = areasIds.filter((id) => !areasCache.has(id));

    if (unknowIds.length === 0) {
      return {
        results: areasIds.map((id) => areasCache.get(id)).filter(Boolean),
      };
    }

    await Promise.allSettled(
      unknowIds.map(async (id) => {
        try {
          const response = await fetch(`${API_BASE_URL}/areas/?id__in=${id}`);
          if (response.ok) {
            const data = (await response.json()) as AreasResponse;
            if (data.results[0]) areasCache.set(id, data.results[0]);
          }
        } catch (error) {
          console.log(`Не удалось загрузить адрес ${id}:`, error);
        }
      })
    );

    return {
      results: areasIds
        .map((id) => areasCache.get(id))
        .filter(Boolean) as Area[],
    };
  },

  async deleteMeter(meterId: string) {
    const response = await fetch(`${API_BASE_URL}/meters/${meterId}/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Произошла ошибка при удалении счётчика');
  },
};
