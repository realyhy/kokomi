import { gql } from "@apollo/client";

const GET_ALL_SLUGS = gql`
  query {
    cards {
      data {
        attributes {
          slug
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
          primary_type {
            data {
              attributes {
                name
              }
            }
          }
          secondary_type {
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
          get
          faction
          element
          weapons
          energy
          hp
          primary_type {
            data {
              attributes {
                name
              }
            }
          }
          secondary_type {
            data {
              attributes {
                name
              }
            }
          }
          diceCost
          get
          tag {
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

const GET_ALL_DECKS = gql`
  query {
    decks {
      data {
        attributes {
          deckName
          cards {
            data {
              attributes {
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
      }
    }
  }
`;

export { GET_ALL_CARDS, GET_ALL_SLUGS, GET_INDIVIDAL_CARD, GET_ALL_DECKS };
