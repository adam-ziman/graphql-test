import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import noImage from './image-not-found.png';
import './theme.css';


const MovieList = (props) => {
  const { actor } = props;
  
  return (<Query
      query={gql`
        {
          searchPeople(query: "${actor}") {
            name
            appearsIn(limit: 50) {
              ... on Movie {
                id
                title
                overview
                poster {
                  thumbnail
                }
              }
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        const movies = data.searchPeople[0].appearsIn;

        return (
            <ul>
              {movies.map(({ id, title, overview, poster }) => (
                <li key={id} alignItems='flex-start'>
                  <span className='poster'>
                    <img alt={title} src={poster ? poster.thumbnail : noImage} />
                  </span>
                  <span className='text'>
                    <p><strong>{title}</strong></p>
                    <p>{overview}</p>
                  </span>
                </li>
              ))}
            </ul>
        );
      }}
    </Query>);
};

export default MovieList;
