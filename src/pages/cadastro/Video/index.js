import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const [message, setMessage] = useState('');
  const { handleChange, values } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        // eslint-disable-next-line max-len
        const categoriaEscolhida = categorias.find((categoria) => categoria.titulo === values.categoria);
        console.log('categoriaEscolhida:', categoriaEscolhida);
        if (categoriaEscolhida === undefined) {
          alert('Categoria não localizada. Selecione uma categoria da lista ou Cadastre uma nova');
          // history.push('/cadastro/categoria');
        } else {
          videosRepository.create({
            titulo: values.titulo,
            url: values.url,
            categoriaId: categoriaEscolhida.id,
          })
            .then((response) => {
              if (response.status === 200) {
                setMessage('Cadastro efetuado com sucesso!');
                history.push('/');
              }
            })
            .catch((err) => {
              setMessage(err.message);
            });
        }
      }}
      >
        {message && (<div>{message}</div>)}
        <FormField
          label="Título"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit" margin="20px 0">
          Cadastrar
        </Button>
      </form>
      <Button margin="20px 0">
        <Link to="/cadastro/categoria">
          Cadastrar Categoria
        </Link>
      </Button>
    </PageDefault>
  );
}
export default CadastroVideo;
