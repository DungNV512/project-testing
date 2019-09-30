/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { createStructuredSelector } from 'reselect';
import orderBy from 'lodash.orderby';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectFilteredHotels,
  makeSelectSortBy,
} from '../App/selectors';
import Hotel from './Hotel';

const ListHotels = ({ hotels, itemsPerPage, activePage, sortByName }) => {
  const [stateHotels, setStateHotels] = useState(hotels);
  const [stateActivePage, setActivePage] = useState(activePage);

  useEffect(() => {
    setStateHotels(hotels);
  }, [hotels]);
  useEffect(() => {
    setActivePage(activePage);
  }, [activePage]);

  const handleClickPageNumber = event => {
    setActivePage(Number(event.target.id));
  };

  let currentPageHotels = stateHotels;
  if (sortByName === 'true') {
    currentPageHotels = orderBy(currentPageHotels, ['name'], ['asc']);
  } else {
    currentPageHotels = orderBy(currentPageHotels, ['name'], ['desc']);
  }

  const indexOfLastItem = stateActivePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(currentPageHotels.length / itemsPerPage);
    i += 1
  ) {
    pageNumbers.push(i);
  }

  currentPageHotels =
    currentPageHotels &&
    currentPageHotels.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pageNumbers.map(number => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li key={number} className="page-numbers-li">
      <a
        href="#"
        className="page-numbers-a"
        id={number}
        onClick={handleClickPageNumber}
      >
        {number}
      </a>
    </li>
  ));
  // if (!currentPageHotels || currentPageHotels.length === 0) {
  //   return (
  //     <Paper
  //       style={{
  //         width: '100%',
  //         height: '600px',
  //       }}
  //     >
  //       Nothing to show
  //     </Paper>
  //   );
  // }

  return (
    <div>
      <div className="list-hotels">
        {currentPageHotels &&
          currentPageHotels.map(hotel => (
            <Hotel hotel={hotel} key={hotel.hotelId} />
          ))}
      </div>
      <div>
        <ul className="page-numbers-ul" id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    </div>
  );
};

ListHotels.propTypes = {
  hotels: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  itemsPerPage: PropTypes.number,
  activePage: PropTypes.number,
  sortByName: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  sortByName: makeSelectSortBy(),
  hotels: makeSelectFilteredHotels(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps() {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListHotels);
