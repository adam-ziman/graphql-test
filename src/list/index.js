import React from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import noImage from './image-not-found.png';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  poster: {
    width: 100,
    height: 'auto',
    'border-radius': 0
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

const MovieList = (props) => {
  const { classes, actor } = props;
  
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
            <List className={classes.root}>
              {movies.map(({ id, title, overview, poster }) => (
                <ListItem key={id} alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar className={classes.poster} alt={title} src={poster ? poster.thumbnail : noImage} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={title}
                    secondary={overview}
                  />
                </ListItem>
              ))}
            </List>
        );
      }}
    </Query>);
};

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MovieList);
