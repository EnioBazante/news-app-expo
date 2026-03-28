export type NewsData = {
  id: number;
  title: string;
  summary: string;
  link: string;
  published: string;
  image?: string | null;
}

export const fetchNewsService = async (): Promise<NewsData[]> => {
  const response = await fetch('https://api.first.org/data/v1/news');
  const json = await response.json();
  
  if (json && json.data) {
    return json.data;
  } else {
    throw new Error("Falha ao obter notícias");
  }
};
