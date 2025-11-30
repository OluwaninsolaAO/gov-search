export interface Official {
  id: string;
  title: string;
  name: string;
  official_name: string;
  state: string;
  area: {
    place: {
      parent_area: number | null;
      generation_high: number | null;
      all_names: Record<string, unknown>;
      id: number | null;
      codes: { poll_unit: string | null } | null;
      name: string | null;
      country: string | null;
      type_name: string | null;
      generation_low: number | null;
      country_name: string | null;
      type: string | null;
    };
    place_url: string;
    url: string;
    image: { url: string };
    parent_place: {
      parent_area: number | null;
      generation_high: number | null;
      all_names: Record<string, unknown> | null;
      id: number | null;
      codes: { poll_unit: string | null } | null;
      name: string | null;
      country: string | null;
      type_name: string | null;
      generation_low: number | null;
      country_name: string | null;
      type: string | null;
    };
    state_place: {
      parent_area: number | null;
      generation_high: number | null;
      all_names: Record<string, unknown>;
      id: number | null;
      codes: { poll_unit: string | null } | null;
      name: string | null;
      country: string | null;
      type_name: string | null;
      generation_low: number | null;
      country_name: string | null;
      type: string | null;
    };
  };
  party: string;
  birth_date: string;
  gender: string;
  slug: string;
  url: string;
  summary_doc: {
    title: string;
    slug: string;
    published: string;
    featured: string;
    url: string;
    author: string;
    body: string;
  };
  address: {
    postal_address: { type: string; value: string };
    district: { type: string; value: string };
  };
  other_names: string[];
  contact: {
    phone: { type: string; value: string; note: string };
    email: { type: string; value: string; note: string };
    facebook: { type: string; value: string; note: string };
    twitter: { type: string; value: string; note: string };
    instagram: { type: string; value: string; note: string };
  };
  images: {
    thumbnail: { url: string };
    medium: { url: string };
    original: { url: string };
    url: string;
  };
  links: {
    wikipedia: { note: string; url: string };
    website: { note: string; url: string };
  };
  identifiers: {
    official_position: { identifier: string; value: string };
    official_position_order: { identifier: string; value: string };
  };
  position: string;
  start_date: string;
  end_date: string;
  legislative_period: string;
}

export interface SearchResponse {
  status: boolean;
  message: string;
  data: {
    took: number;
    results: Official[];
  };
}

export interface AISearchResponse {
  status: boolean;
  message: string;
  data: {
    answer: string;
    sources: Array<{
      id: string;
      name: string;
      position: string;
      relevance: number;
    }>;
    suggestions: string[];
    officials?: Official[];
  };
}
