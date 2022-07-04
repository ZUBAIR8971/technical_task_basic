import gql from 'graphql-tag';
import { insertCustomerParams } from '../Params/insertCustomerParams';

export const INSERT_Customers = gql`
  mutation insertCustomer(
    $${insertCustomerParams.name}: String!, 
    $${insertCustomerParams.email}: String!, 
    $${insertCustomerParams.role}: String
  ) {
    insert_customers_one(object: { 
      name: $${insertCustomerParams.name}, 
      email: $${insertCustomerParams.email}, 
      role: $${insertCustomerParams.role} }
    ) {
      name
      email
      role
    }
  }
`;