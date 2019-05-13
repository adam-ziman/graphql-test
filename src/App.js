import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import debounce from './helper';
import MovieList from './list';
import './App.css';

const client = new ApolloClient({
  uri: 'https://112qaej5y9.execute-api.ap-southeast-2.amazonaws.com/dev/graphql'
});

const App = ()=> {
  const [state, setState] = useState({actor: 'tom cruise'});

  const setName = debounce((value) => {
    setState({ actor: value })
  }, 100)

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <header className='App-header'>
          <h1>Tom Cruise movie night</h1>
        </header>
        <main>
          <p>
            <label>Search for movies by actor</label>
            <input type='text' name='actor' onChange={(event)=> setName(event.target.value)}/>
          </p>
          <MovieList actor={state.actor} />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
