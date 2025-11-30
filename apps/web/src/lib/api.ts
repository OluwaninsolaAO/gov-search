import { SearchResponse, AISearchResponse, Official } from '@/types/official';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function searchOfficials(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<SearchResponse> {
  try {
    const params = new URLSearchParams({
      q: query,
      currPage: page.toString(),
      perPage: perPage.toString(),
    });

    const response = await fetch(`${API_BASE_URL}/search?${params}`, {
      headers: {
        accept: '*/*',
      },
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Search error:', error);
  }
}

export async function askAI(query: string): Promise<AISearchResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/search/ai?q=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
    });

    if (!response.ok) {
      throw new Error(`AI search failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('AI search error:', error);
  }
}
