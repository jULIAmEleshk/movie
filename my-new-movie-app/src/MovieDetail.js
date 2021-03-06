import React, { Component } from "react";
import styled from "styled-components";
import Overdrive from "react-overdrive";
import { Poster } from "./Movie";

const POSTER_PATH = "http://image.tmdb.org/t/p/w154"; //it is need that to use img from movie db
const BACKDROP_PATH = "http://image.tmdb.org/t/p/w1280";

class MovieDetail extends Component {
  state = {
    movie: {}
  };
  async componentDidMount() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }?api_key=7cd644152efd10ba41e8af4fec2893fd&language=en-US`
      );
      const movie = await res.json();
      console.log(movie);
      this.setState({
        movie: movie
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster
              src={`${POSTER_PATH}${movie.poster_path}`}
              alt={movie.title}
            />
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <div>{movie.overview}</div>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const MovieWrapper = styled.div`
  background-position: relative;
  padding-top: 50vh;
  background-size: cover;
  background: url(${props => props.backdrop}) no-repeat;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
