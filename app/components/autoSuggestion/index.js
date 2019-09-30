import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import deburr from 'lodash/deburr';

import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash.get';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSuggestions,
} from '../../containers/App/selectors';
import { changeFindingLocations } from '../../containers/HomePage/actions';
import { loadHotels } from '../../containers/App/actions';

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.display_name, query);
  const parts = parse(suggestion.display_name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span
            key={part.text}
            style={{ fontWeight: part.highlight ? 500 : 400 }}
          >
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value, suggestions) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.display_name.slice(0, inputLength).toLowerCase() ===
            inputValue;

        if (keep) count += 1;

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.display_name;
}

const useStyles = makeStyles(theme => ({
  root: {
    // height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
}));

const IntegrationAutosuggest = ({
  onFetchingFindingLocation,
  onFetchingHotels,
  suggestions,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({
    single: '',
    popper: '',
  });
  const [stateSuggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(suggestions);
  }, [suggestions]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, suggestions));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    onFetchingFindingLocation(newValue);
    setState({
      ...state,
      [name]: newValue,
    });
  };
  const handleSuggestionSelected = (event, data) => {
    const query = encodeURIComponent(get(data, 'suggestionValue', '').trim());
    onFetchingHotels(query);
  };
  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    onSuggestionSelected: handleSuggestionSelected,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-popper',
          label: 'Location',
          placeholder: 'Enter location',
          value: state.popper,
          onChange: handleChange('popper'),
          inputRef: node => {
            setAnchorEl(node);
          },
          InputLabelProps: {
            shrink: true,
          },
        }}
        theme={{
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Popper anchorEl={anchorEl} open={Boolean(options.children)}>
            <Paper
              square
              {...options.containerProps}
              style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
            >
              {options.children}
            </Paper>
          </Popper>
        )}
      />
    </div>
  );
};

IntegrationAutosuggest.propTypes = {
  onFetchingFindingLocation: PropTypes.func,
  onFetchingHotels: PropTypes.func,
  suggestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  suggestions: makeSelectSuggestions(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const mapDispatchToProps = dispatch => ({
  onFetchingFindingLocation: evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(changeFindingLocations(evt));
  },
  onFetchingHotels: evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadHotels(evt));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(IntegrationAutosuggest);
