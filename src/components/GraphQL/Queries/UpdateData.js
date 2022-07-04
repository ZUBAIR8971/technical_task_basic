import gql from 'graphql-tag';
import { updateCustomerParams } from '../Params/updateCustomerParams';

export const UPDATE_Customers = gql`
  mutation updateCustomer(
    $${updateCustomerParams.id}: Int!,
    $${updateCustomerParams.name}: String!, 
    $${updateCustomerParams.email}: String!, 
    $${updateCustomerParams.role}: String
  ) {
      update_customers_by_pk(pk_columns: {id: $${updateCustomerParams.id}}, 
        _set: {
          id: $${updateCustomerParams.id}, 
          name: $${updateCustomerParams.name}, 
          email: $${updateCustomerParams.email}, 
          role: $${updateCustomerParams.role}
      }) {
        id
        name
        email
        role
      }
    }
`;