import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import { createStructuredSelector } from "reselect";

import {
  setAutoSuggestion,
  updateSearchResult,
} from "../../redux/gis-data/gis-data.actions";
import { setCenter, setZoom } from "../../redux/about-app/about-app.actions";

import { Dropdown, Button } from "react-bootstrap";

import axios from "axios";

const DEFAULT_ACTIVE_CATE = { title: "Select Category", id: null };
const TopSearch = ({
  setSearchList,
  setCenter,
  setZoom,
}) => {
  // useEffect(() => {
  //   const fetchAutoSuggest = async () => {
  //     const autoSuggestion = await agent.gisDigitalData.getAutoSuggestion();
  //     autoSuggestion.map((suggest) => (suggest.isChecked = false));
  //     autoSuggestion.unshift({ term: "Building", item: [], isChecked: true });
  //     setAutoSuggestion(autoSuggestion);
  //   };
  //   fetchAutoSuggest();
  // }, []);

  const [suggestions, setSuggestions] = useState(["aaa", "bbb", "ccc"]);
  const [value, setValue] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(DEFAULT_ACTIVE_CATE);

  const handleCategoryChange = (category) => {
    if (activeCategory.id !== category.id) {
      setSuggestions([]);
      setValue("");
      setActiveCategory(category);
    }
  };

  const searchHandler = async () => {
    setSearchList([]);
    if (!value) {
      setSuggestions([]);
    } else {
      const apiUrl = "http://localhost:8800/admin/geodata-search"; // Replace with your API URL
      axios
        .get(apiUrl, {
          params: {
            category_id: activeCategory.id,
            search: value,
          },
        })
        .then((response) => {

          setSearchList(response.data.results)
          if (response.data.results.length) {
            setCenter([response.data.results[0].lat, response.data.results[0].lng])
            setZoom(14);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const clearHandler = () => {
    setSuggestions([]);
    setValue("");
    setSearchList([]);
    setActiveCategory(DEFAULT_ACTIVE_CATE);
  };

  useEffect(() => {
    const apiUrl = "http://localhost:8800/admin/categories"; // Replace with your API URL
    axios
      .get(apiUrl)
      .then((response) => {
        setCategoryList(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const onSuggestionsFetchRequested = (value) => {
    if (!value) {
      setSuggestions([]);
    } else {
      const apiUrl = "http://localhost:8800/admin/geodata-search-suggestion"; // Replace with your API URL
      axios
        .get(apiUrl, {
          params: {
            category_id: activeCategory.id,
            search: value,
          },
        })
        .then((response) => {
          setSuggestions(response.data.suggestions);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <div className="top-search">
      <div className="search-bar">
        <Dropdown className="select_block">
          <Dropdown.Toggle id="dropdown-basic" className="selected_text">
            <span>{activeCategory?.title}</span>
            <i className="fa-solid fa-angle-down"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {categoryList.map((category) => (
              <Dropdown.Item
                key={`category-search-${category.id}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Autosuggest
          inputProps={{
            className: "form-control auto-suggest-input",
            placeholder: "Search...",
            value: value,
            onChange: (_event, { newValue }) => {
              setValue(newValue);
            },
            onKeyDown: (event) => {
              if (event.key === "Enter") {
                searchHandler();
              }
            },
          }}
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => {
            onSuggestionsFetchRequested(value);
          }}
          onSuggestionsClearRequested={() => onSuggestionsClearRequested()}
          onSuggestionSelected={(value) => {
            console.log(value.target.textContent);
          }}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => (
            <div className="" key={`suggestion-${suggestion}`}>
              {console.log(suggestion)}
              {suggestion}
            </div>
          )}
        />
        <Button className="search-btn" onClick={() => searchHandler()}>
          <i class="fa fa-search" aria-hidden="true"></i>
        </Button>
      </div>
      <div className="search-clear" onClick={() => clearHandler()}>
        Clear
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAutoSuggestion: (gisData) => dispatch(setAutoSuggestion(gisData)),
  setSearchList: (gisData) => dispatch(updateSearchResult(gisData)),
  setCenter: (aboutApp) => dispatch(setCenter(aboutApp)),
  setZoom: (aboutApp) => dispatch(setZoom(aboutApp)),
});

export default connect(null, mapDispatchToProps)(TopSearch);
