import PropTypes from 'prop-types';
import ArrowDownWard from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import React from 'react';

const SortIcon = ({ sortBy: { column, direction }, type }) =>
  column === type ? (
    <div className="ml-1">
      {direction === 'desc' ? (
        <ArrowDownWard fontSize="small" />
      ) : (
        <ArrowUpward fontSize="small" />
      )}
    </div>
  ) : null;

SortIcon.propTypes = {
  sortBy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  type: PropTypes.string,
};

export default SortIcon;
