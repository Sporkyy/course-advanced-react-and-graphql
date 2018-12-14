import { Query } from "react-apollo";
import Error from "./ErrorMessage";
import gql from "graphql-tag";

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <div>
        <Error error={error} />
        <p>Hey!</p>
      </div>
    )}
  </Query>
);

export default Permissions;
