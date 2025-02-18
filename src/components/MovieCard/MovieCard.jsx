import { Grid, Image, Rate, Typography } from 'antd';

import { imagePath } from '../../api/apiConfig.jsx';
import MovieDate from '../MovieDate/MovieDate.jsx';
import MovieGenres from '../MovieGenres/MovieGenres.jsx';
import MovieOverview from '../MovieOverview/MovieOverview.jsx';
import useMovieRating from '../../hooks/useMovieRating.jsx';

const { Title } = Typography;
const { useBreakpoint } = Grid;

const MovieCard = ({ item, genres = {}, onUpdateRatedMovies }) => {
  const { rating, isRated, handleRateChange } = useMovieRating(item.id, onUpdateRatedMovies);
  const ratingValue = Number(item?.vote_average).toFixed(1);
  const screens = useBreakpoint();

  const ratingColor = (ratingValue) => {
    if (ratingValue >= 7) return '#66E900';
    if (ratingValue >= 5) return '#E9D100';
    if (ratingValue >= 3) return '#E97E00';
    return '#E90000';
  };

  return (
    <div
      className={`flex gap-4 items-start ${screens.lg ? 'flex-row' : 'flex-col items-center'}`}
      style={{
        display: 'grid',
        gridTemplateColumns: screens.lg ? 'minmax(100px, 38%) 1fr' : '25% 1fr',
        gridTemplateRows: 'repeat(6, auto)',
        columnGap: '10px',
        alignItems: 'center',
        gridTemplateAreas: screens.lg
          ? `"Image title"
             "Image date"
             "Image genres"
             "Image overview"
             "Image rate"
             ". ."`
          : `"Image title"
             "Image date"
             "Image genres"
             "overview overview"
             "rate rate"
             ". ."`,
        boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
        minHeight: screens.lg ? '274px' : '290px',
      }}
    >
      <div
        style={{
          gridArea: 'Image',
        }}
      >
        <Image
          src={`${imagePath}/${item?.poster_path}`}
          alt={item?.title || item?.name}
          fallback={'https://dummyimage.com/183x281/8f8f8f/ffffff&text=No+image'}
          preview={false}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </div>
      <div
        style={{
          gridArea: 'title',
          fontSize: screens.lg ? '16px' : '14px',
        }}
      >
        <Title style={{ margin: '0', width: '80%' }} level={5}>
          {item?.title || item?.name}
        </Title>
      </div>
      <div style={{ display: 'flex' }}>
        <MovieDate style={{ gridArea: 'date' }} releaseDate={item?.release_date} firstAirDate={item?.first_air_date} />
      </div>
      <MovieGenres style={{ gridArea: 'genres' }} genreIds={item?.genre_ids} genres={genres} />
      <MovieOverview overview={item?.overview} />
      <div
        style={{
          gridArea: 'rate',
          display: 'flex',
          justifyContent: screens.lg ? 'flex-start' : 'flex-end',
          margin: screens.lg ? '0' : '5px 10px 10px 0 ',
        }}
      >
        <Rate value={rating} onChange={handleRateChange} count={10} disabled={isRated} />
      </div>
      <div
        className="absolute text-xs w-[30px] h-[30px] rounded-full border-2 flex justify-center items-center"
        style={{
          top: '8px',
          right: '25px',
          borderColor: ratingColor(ratingValue),
        }}
      >
        {ratingValue}
      </div>
    </div>
  );
};

export default MovieCard;
