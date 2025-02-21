import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
  const _apiBase = 'https://gateway.marvel.com:443/v1/public';
  const _apiKey = 'apikey=2f8baf570cbc87fe64237671a0c0deea';
  const {loading, request, error, clearError} = useHttp();

  const getAllCharacters = async (offset = 0, limit = 20) => {
    const res = await request(`${_apiBase}/characters?${_apiKey}&offset=${offset}&limit=${limit}`);
    return res.data.results.map(item => _transformCharacter(item));
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  }

  const _transformCharacter = (res) => {
   return {
     id: res.id,
     name: res.name,
     description: res.description,
     thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
     homepage: res.urls[0].url,
     wiki: res.urls[1].url,
     comics: res.comics.items.slice(0, 10)
   }
  }

  return {getCharacter, getAllCharacters, error, loading, clearError};
}

export default useMarvelService;
