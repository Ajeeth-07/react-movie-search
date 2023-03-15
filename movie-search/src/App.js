import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import MovieComponents from './components/MovieComponents';
import MovieInfoComponent from './components/MovieInfoComponent';


export const API_KEY = "29f31877";

const Container = styled.div`
  display:flex;
  flex-direction:column;
`;
const Header = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 26px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
  width: 52px;
  height: 52px;
  margin: 12px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 40%;
  height: 30%;
  background-color: white;
  align-items: center;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 70%;
`;

function App() {

  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  
  
  const fetchData = async (searchString) =>{
   const response = await axios.get(
    `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovieList(response.data.Search);
  };

  

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(()=>fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };
  return <Container>
      <Header>
        <AppName>
          <MovieImage src="/icon.png"/>
          Movieseacrh
        </AppName>
        
        <SearchBox>
          <SearchIcon src='/searching.png'/>
          <SearchInput placeholder='Search Movie Name'
            value={searchQuery} 
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/> }
      <MovieListContainer>
        {
          movieList?.length
          ? movieList.map((movie, index) => (
          <MovieComponents 
            key={index} 
            movie={movie} 
            onMovieSelect={onMovieSelect}
            
          />
          ))
        :( <Placeholder src="/icon.png"/>
        )}
      </MovieListContainer>
    </Container>;
  
}

export default App;
