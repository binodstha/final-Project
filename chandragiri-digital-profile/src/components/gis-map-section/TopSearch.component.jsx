import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import { createStructuredSelector } from "reselect";
import {
  selectCategoryList,
  selectActiveCategory,
} from "../../redux/gis-data/gis-data.selectors";
import {
  setAutoSuggestion,
  updateActiveCategory,
  updateSearchResult,
} from "../../redux/gis-data/gis-data.actions";
import { setCenter, setZoom } from "../../redux/about-app/about-app.actions";

import { Dropdown, Button } from "react-bootstrap";
import agent from "../../agent";

const TopSearch = ({
  categoryList,
  activeCategory,
  setAutoSuggestion,
  handleCategory,
  setSearchList,
  setCenter,
  setZoom,
}) => {
  useEffect(() => {
    const fetchAutoSuggest = async () => {
      const autoSuggestion = await agent.gisDigitalData.getAutoSuggestion();
      autoSuggestion.map((suggest) => (suggest.isChecked = false));
      autoSuggestion.unshift({ term: "Building", item: [], isChecked: true });
      setAutoSuggestion(autoSuggestion);
    };
    fetchAutoSuggest();
  }, []);

  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");

  const handleCategoryChange = (category) => {
    if (activeCategory.term !== category) {
      setSuggestions([]);
      setValue("");
      handleCategory(category);
    }
  };

  const searchHandler = async () => {
    setSearchList([]);
    const searchData = await agent.gisDigitalData.getSearchData(
      activeCategory.term,
      value
    );
    if (searchData.centroid) {
      setCenter([searchData.centroid.lat, searchData.centroid.lng]);
      setZoom(18);
    }
    if (searchData.items !== undefined) setSearchList(searchData.items);
  };
  const clearHandler = () => {
    setSuggestions([]);
    setValue("");
    setSearchList([]);
    handleCategory("Building");
  };

  const onSuggestionsFetchRequested = (value) => {
    if (!value) {
      setSuggestions([]);
    } else {
      const filtered = activeCategory.item.sort().filter(
        function (item) {
          if (
            item.toLowerCase().includes(value.toLowerCase()) &&
            this.count < 7
          ) {
            this.count++;
            return true;
          }
          return false;
        },
        { count: 0 }
      );
      setSuggestions(filtered);
    }
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <div className="top-search">
      {activeCategory && categoryList && (
        <>
          <div className="search-bar">
            <Dropdown className="select_block">
              <Dropdown.Toggle id="dropdown-basic" className="selected_text">
                <span>{activeCategory.term}</span>
                <i className="fa-solid fa-angle-down"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categoryList.map((category) => (
                  <Dropdown.Item
                    key={`category-${category}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
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
        </>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categoryList: selectCategoryList,
  activeCategory: selectActiveCategory,
});

const mapDispatchToProps = (dispatch) => ({
  setAutoSuggestion: (gisData) => dispatch(setAutoSuggestion(gisData)),
  handleCategory: (gisData) => dispatch(updateActiveCategory(gisData)),
  setSearchList: (gisData) => dispatch(updateSearchResult(gisData)),
  setCenter: (aboutApp) => dispatch(setCenter(aboutApp)),
  setZoom: (aboutApp) => dispatch(setZoom(aboutApp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopSearch);
