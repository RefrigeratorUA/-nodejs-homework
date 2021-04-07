import { Component } from 'react';
import { fetchCreditsMovie, BASE_IMG_URL } from '../../services/themoviedb-api';
import ImgNotFound from '../../images/image-not-found.svg';

class Cast extends Component {
  state = {
    credits: [],
  };
  async componentDidMount() {
    if (this.props.match.params && this.props.match.params.movieId) {
      const {
        match: {
          params: { movieId },
        },
      } = this.props;
      await fetchCreditsMovie(movieId).then(credits => this.setState({ credits: [...credits] }));
    }
  }
  render() {
    const { credits } = this.state;
    return (
      <>
        {credits.length > 0 ? (
          <ul className="FacesList">
            {credits.map(({ original_name, profile_path, character }, index) => (
              <li key={index}>
                {profile_path ? (
                  <img src={`${BASE_IMG_URL}${profile_path}`} alt={original_name} />
                ) : (
                  <img src={ImgNotFound} alt="Изображение не найдено" />
                )}
                <div>
                  <p>{original_name}</p>
                  <p>
                    <b>Character</b>: <span>{character}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h1>No info about heros!!!</h1>
        )}
      </>
    );
  }
}

export default Cast;
