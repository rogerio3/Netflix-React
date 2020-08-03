import PropTypes from 'prop-types';
import config from '../config';

const URL_VIDEOS = `${config.URL_BACKEND_TOP}/videos`;

function create(objetoDoVideo) {
  return fetch(`${URL_VIDEOS}?_embed=videos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(objetoDoVideo),
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
create.PropTypes = {
  objetoDoVideo: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
  }),
};

export default {
  create,
};
