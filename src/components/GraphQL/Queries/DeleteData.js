import gql from 'graphql-tag';

import { deleteCustomerParams } from '../Params/deleteCustomerParams';

export const DELETE_Customers = gql`
  mutation deleteCustomer(
    $${deleteCustomerParams.id}: Int!
  ) {
    delete_customers_by_pk(id: $${deleteCustomerParams.id}) {
      id
      name
      email
      role
    }
  }
`;