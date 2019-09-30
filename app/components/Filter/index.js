import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { changeFilter } from 'containers/HomePage/actions';
import styles from './styles.css';

const filterList = {
  all: 'all',
  score: 'score',
  star: 'star',
};

const FILTER_LABELS = {
  [filterList.all]: 'all',
  [filterList.score]: 'score > 4',
  [filterList.star]: 'star > 3',
};

const Filter = ({ onChangeFilter }) => {
  const [anchorEl, setAnchorEl] = useState(undefined);
  const [filter, setFilterGroups] = useState([]);

  const handleFilter = value => () => {
    setFilterGroups(value);
    onChangeFilter(value);
    handleClose();
  };

  useEffect(() => {
    setFilterGroups([filterList.filter]);
  }, [filterList.filter]);

  const handleShowMenuFilter = e => setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(undefined);
  return (
    <div
      className="d-flex justify-content-end align-items-center"
      style={{ minHeight: 48, color: '#999' }}
    >
      <span>Filter by: </span>
      <Button
        color="secondary"
        aria-owns={anchorEl && 'simple-menu'}
        aria-haspopup="true"
        onClick={handleShowMenuFilter}
      >
        {FILTER_LABELS[filter]} <ArrowDropDown />
      </Button>
      <Popover
        id="simple-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        className={styles.filterUl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem className={styles.filterItem}>
          <Popover
            id="simple-menu"
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
            className={styles.filterUl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem
              onClick={handleFilter(filterList.all)}
              className={styles.filterItem}
            >
              {filterList.all}
            </MenuItem>
            <MenuItem
              onClick={handleFilter(filterList.score)}
              className={styles.filterItem}
            >
              {filterList.score}
            </MenuItem>
            <MenuItem
              onClick={handleFilter(filterList.star)}
              className={styles.filterItem}
            >
              {filterList.star}
            </MenuItem>
          </Popover>
        </MenuItem>
      </Popover>
    </div>
  );
};

Filter.propTypes = {
  onChangeFilter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeFilter: evt => dispatch(changeFilter(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Filter);
