import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Select from "react-select";

import searchData from "./data/search.json";

import selectedTheme, { setTheme } from "./themeManager";
import {
  handleResponse,
  Button,
  ErrorMessage,
  Headline as hl,
} from "./elements";

import Modal from "./modal";

const Headline = styled(hl)`
  padding: 0.5rem 0;
`;

const SelectContainer = styled.div`
  padding-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const Table = styled.table`
  font-weight: 400;
  background: none;
  color: ${selectedTheme.mainColor};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${selectedTheme.mainColor};
`;

const TableCell = styled.td`
  background: none;
  padding-top: 0.5rem;
`;

const HeadCell = styled.th`
  font-weight: 700;
  background: none;
`;

const SelectorStyle = {
  control: (provided: any) => ({
    ...provided,
    fontWeight: "500",
    color: selectedTheme.mainColor,
    textTransform: "uppercase",
    width: "12rem",
    background: "none",
    borderRadius: "0px",
    border: "1px solid " + selectedTheme.mainColor,
    boxShadow: 0,
    "&:hover": {
      border: "1px solid " + selectedTheme.mainColor,
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: selectedTheme.backgroundColor,
    border: "1px solid " + selectedTheme.mainColor,
    borderRadius: 0,
    boxShadow: 0,
  }),
  option: (provided: any) => ({
    ...provided,
    fontWeight: "500",
    color: selectedTheme.mainColor,
    textTransform: "uppercase",
    borderRadius: 0,
    boxShadow: 0,
    backgroundColor: selectedTheme.backgroundColor,
    "&:hover": {
      backgroundColor: selectedTheme.mainColor,
      color: selectedTheme.backgroundColor,
    },
  }),
  singleValue: (provided: any) => {
    return {
      ...provided,
      color: selectedTheme.mainColor,
    };
  },
};

const useThemeData = () => {
  const [themeData, setThemeData] = useState({ themes: [], error: false });

  const fetchThemeData = useCallback(() => {
    (process.env.NODE_ENV === "production"
      ? fetch("/data/themes.json").then(handleResponse)
      : import("./data/themes.json")
    )
      .then((jsonResponse) => {
        setThemeData({ ...jsonResponse, error: false });
      })
      .catch((error) => {
        setThemeData({ themes: [], error: error.message });
      });
  }, []);

  useEffect(() => {
    fetchThemeData();
  }, [fetchThemeData]);
  return { themeData, fetchThemeData };
};

const Settings = () => {
  const [newTheme, setNewTheme] = useState();

  const {
    themeData: { themes, error },
  } = useThemeData();

  useEffect(() => {
    console.log(newTheme);
  }, [newTheme]);

  return (
    <Modal element="icon" icon="settings">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SelectContainer>
        <Headline>Theme:</Headline>
        <FormContainer>
          <Select
            options={themes}
            defaultValue={selectedTheme}
            onChange={(e: any) => {
              setNewTheme(e);
            }}
            styles={SelectorStyle}
          />

          <Button onClick={() => setTheme(JSON.stringify(newTheme))}>
            Apply
          </Button>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </FormContainer>
      </SelectContainer>
      <Table>
        <tbody>
          <TableRow>
            <HeadCell>Search Provider</HeadCell>
            <HeadCell>Prefix</HeadCell>
          </TableRow>
          {searchData.providers.map((provider, index) => (
            <TableRow key={provider.name + index}>
              <TableCell>{provider.name}</TableCell>
              <TableCell>{provider.prefix}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Modal>
  );
};

export default Settings;
