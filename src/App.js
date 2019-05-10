import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import logo from './logo.svg';
import MovieList from './list';
import './App.css';

const client = new ApolloClient({
  uri: 'https://112qaej5y9.execute-api.ap-southeast-2.amazonaws.com/dev/graphql'
});

const App = ()=> {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Tom Cruise movie night</h1>
        </header>
        <main>
          <MovieList />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
