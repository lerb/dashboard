import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { handleResponse, ErrorMessage } from "./elements";

import selectedTheme from "./themeManager";

const SearchInput = styled.input`
  width: 100%;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${selectedTheme.accentColor};
  background: none;
  border-radius: 0;
  color: ${selectedTheme.mainColor};
`;

const useSearchProviders = () => {
  const [searchProviders, setSearchProviders] = useState({
    providers: [{ prefix: "", url: "" }],
    error: false,
  });

  const fetchSearchProviders = useCallback(() => {
    (process.env.NODE_ENV === "production"
      ? fetch("/data/search.json").then(handleResponse)
      : import("./data/search.json")
    )
      .then((jsonResponse) => {
        setSearchProviders({ ...jsonResponse, error: false });
      })
      .catch((error) => {
        setSearchProviders({ providers: [], error: error.message });
      });
  }, []);

  useEffect(() => {
    fetchSearchProviders();
  }, [fetchSearchProviders]);
  return { searchProviders, fetchSearchProviders };
};

const SearchBar = () => {
  const {
    searchProviders: { providers, error },
  } = useSearchProviders();

  let [input, setInput] = useState("");

  const handleSearchQuery = (e: React.FormEvent) => {
    var query = input || "";

    if (query.split(" ")[0].includes("/")) {
      handleQueryWithProvider(query);
    } else {
      window.location.href = "https://google.com/search?q=" + query;
    }

    e.preventDefault();
  };

  const handleQueryWithProvider = (query: string) => {
    let queryArray = query.split(" ");
    let prefix = queryArray[0];
    queryArray.shift();

    let searchQuery = queryArray.join(" ");

    let providerFound = false;
    providers.forEach((provider) => {
      if (provider.prefix === prefix) {
        providerFound = true;
        window.location.href = provider.url + searchQuery;
      }
    });

    if (!providerFound)
      window.location.href = "https://google.com/search?q=" + query;
  };

  return (
    <form onSubmit={(e) => handleSearchQuery(e)}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SearchInput
        type="text"
        onChange={(e) => setInput(e.target.value)}
      ></SearchInput>
      <button type="submit" hidden />
    </form>
  );
};

export default SearchBar;
