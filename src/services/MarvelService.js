class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public';
  _apiKey = 'apikey=2f8baf570cbc87fe64237671a0c0deea';

  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = async (offset = 0, limit = 20) => {
    const res = await this.getResource(`${this._apiBase}/characters?${this._apiKey}&offset=${offset}&limit=${limit}`);
    return res.data.results.map(item => this._transformCharacter(item));
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);

    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (res) => {
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
}

export default MarvelService;
