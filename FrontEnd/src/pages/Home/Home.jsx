import React from 'react';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import BookingInfo from '../../components/BookingInfo/BookingInfo';
import LocationDisplay from '../../components/LocationDisplay/LocationDisplay';

const Home = () => {
  return (
    <div>
      <Header />
      <BookingInfo />
      <SearchBar />
      <LocationDisplay />
    </div>
  );
};

export default Home;
