
import gql from 'graphql-tag';

export const GET_Customers = gql`
  query GetCustomers {
    customers {
      id
      name
      email
      role
    }
  }
`;