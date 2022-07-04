import React from 'react';
import "./assets/css/style.css";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import TableComponent from './components/TableComponent';

const httpLink = createHttpLink({
  uri: 'https://coherent-molly-97.hasura.app/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = 'U38Molv0y33LXf6EZPW8fNVFLQr9orLqnbAOR0sMGs5Sqx7lRsYADWDgC79luszu';
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      "x-hasura-admin-secret": token
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <>
      <div className='AppMainDiv'>
        <ApolloProvider client={client}>
          <TableComponent />
        </ApolloProvider>
      </div>
    </>
  )
}

export default App