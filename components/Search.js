import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  RefinementList,
  Pagination,
  Configure,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import React, { useState } from "react";
import Link from "next/link";

const searchClient = algoliasearch(
  "6I10IUWO5Q",
  "1ac97da7e847a735199cd9085deb1625"
);

function Hit({ hit }) {
  return (
    <div className="hit">
      <Link href={`/card/` + `${hit.name}`}>
        <Highlight attribute="name" hit={hit} />
        <img src={hit.Image.formats.thumbnail.url} />
      </Link>
    </div>
  );
}

export default function Search() {
  const [showHits, setShowHits] = useState(false);

  return (
    <div className="ais-InstantSearch">
      <InstantSearch
        searchClient={searchClient}
        indexName="development_api::card.card"
      >
        <Configure hitsPerPage={40} /> 
        <SearchBox
          placeholder="Search for cards"
          onFocus={() => setShowHits(true)}
          onBlur={() => setShowHits(false)}
        />
        <EmptyQueryBoundary fallback={null}>
          <Hits hitComponent={Hit} />
        </EmptyQueryBoundary>
        {showHits ? <Pagination /> : null}
      </InstantSearch>
    </div>
  );
}

function EmptyQueryBoundary({ children, fallback }) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return fallback;
  }

  return children;
}
