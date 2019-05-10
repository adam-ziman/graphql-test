import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import CharacterModal from '../modal';
import noImage from './image-not-found.png';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 'auto',
  },
  // had problems placeing this where i wanted it to go
  tooltip: {
    position: 'relative',
    bottom: -50,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  button: {
    margin: theme.spacing.unit,
  },
  pagination: {
    'text-align': 'centre'
  }
});

const MovieList = () => (
  <Query
    query={gql`
      {
      searchPeople(query: "tom cruise") {
        name
        appearsIn(limit: 50) {
          ... on Movie {
            id
            title
            releaseDate
            overview
            poster {
              small
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
      console.log(data)

      return movies.map(({ id, title, overview, poster, releaseDate }) => (
        <div key={id}>
          <p>{`${title} by ${overview}`}</p>
        </div>
      ));
    }}
  </Query>
);
export default MovieList;
