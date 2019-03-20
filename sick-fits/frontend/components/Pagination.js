import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { perPage } from '../config';
import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page }) => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading&hellip;</p>;
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        return (
          <PaginationStyles data-test="pagination">
            <Head>
              <title>
                Sick Fits! 〰 Page {page} of {pages}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: page - 1 }
              }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                &lt; Prev
              </a>
            </Link>
            <p>
              Page {page} of
              <span className="totalPages">{pages}</span>!
            </p>
            <p>{count} Items total</p>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: page + 1 }
              }}
            >
              <a className="next" aria-disabled={pages <= page}>
                Next &gt;
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default Pagination;
export { PAGINATION_QUERY };
