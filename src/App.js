import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import debounce from './helper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MovieList from './list';
import './App.css';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

const client = new ApolloClient({
  uri: 'https://112qaej5y9.execute-api.ap-southeast-2.amazonaws.com/dev/graphql'
});

const App = (props)=> {
  const { classes } = props;
  const [state, setState] = useState({actor: 'tom cruise'});

  const setName = debounce((value) => {
    setState({ actor: value })
  }, 1000)

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Tom Cruise movie night</h1>
        </header>
        <main>
          <p>Type in the name of another actor you are looking for</p>
          <TextField
            id="actor-name"
            label="Actor"
            className={classes.textField}
            onChange={(event)=> setName(event.target.value)}
            margin="normal"
          />
          <MovieList actor={state.actor} />
        </main>
      </div>
    </ApolloProvider>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
