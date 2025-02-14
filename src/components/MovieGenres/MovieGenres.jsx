import { Button } from 'antd';

const MovieGenres = ({ genreIds = [], genres = {} }) => {
  const movieGenres = genreIds.map((genreId) => genres[genreId] || 'Неизвестный жанр');

  return (
    <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {movieGenres.map((genre, index) => (
        <Button key={genre + index} size="small" style={{ backgroundColor: '#FAFAFA', border: '1px solid #D9D9D9' }}>
          {genre}
        </Button>
      ))}
    </div>
  );
};

export default MovieGenres;
