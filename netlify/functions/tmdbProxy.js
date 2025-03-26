exports.handler = async (event) => {
  const API_KEY = process.env.API_KEY;

  const { endpoint, append = '', page } = event.queryStringParameters;

  const pageParam = page ? `&page=${page}` : '';
  const appendParams = append ? `${append}` : '';

  const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}${pageParam}${appendParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch from TMDB',
        details: err.message,
      }),
    };
  }
};
