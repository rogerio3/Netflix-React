import PropTypes from 'prop-types';
import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND_TOP}/categorias`;

function getAll() {
  return fetch(`${URL_CATEGORIES}`)
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }

      throw new Error('Não foi possível pegar os dados :(');
    });
}

function getAllWithVideos() {
  return fetch(`${URL_CATEGORIES}?_embed=videos`)
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }

      throw new Error('Não foi possível pegar os dados :(');
    });
}

function createCategories(objetoCategoria) {
  return fetch(`${URL_CATEGORIES}?_embed=categorias`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(objetoCategoria),
  })
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.status >= 200 && respostaDoServidor.status <= 299) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }

      const error = await respostaDoServidor.json();
      return new Error(error.message);
    });
}
createCategories.PropTypes = {
  objetoCategoria: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    cor: PropTypes.string.isRequired,
  }),
};

export default {
  getAllWithVideos,
  getAll,
  createCategories,
};
