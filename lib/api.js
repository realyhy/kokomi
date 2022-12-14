import { gql } from "@apollo/client";

const GET_ALL_SLUGS = gql`
  query {
    cards {
      data {
        attributes {
          slug
          types {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
const GET_ALL_CARDS = gql`
  query {
    cards(sort: "createdAt:desc", pagination: { limit: 10 }) {
      data {
        id
        attributes {
          name
          slug
          description
          types {
            data {
              attributes {
                name
              }
            }
          }
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
const GET_INDIVIDAL_CARD = gql`
  query ($slugUrl: String!) {
    cards(filters: { slug: { eq: $slugUrl } }) {
      data {
        id
        attributes {
          name
          description
          types {
            data {
              attributes {
                name
              }
            }
          }
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export { GET_ALL_CARDS, GET_ALL_SLUGS, GET_INDIVIDAL_CARD };
