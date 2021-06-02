import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';

const App = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (search.length > 2) {
      setLoading(true)
      axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&limit=5&origin=*`)
        .then((response) => {
          console.log(response)
          setResults(response.data[1]);
          setLinks(response.data[3]);
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false);
          console.log('Error: ', error);
        })
    } else {
      setResults([]);
      setLinks([]);
    }
  }, [search]);

  const ResultsList = () => {
    let searchResults = results.map((result, index) => (
      <li onClick={() => window.open(links[index])} className='ListElement' key={result}>
        {result}
      </li>
    ));

    return <ul className='List'>{searchResults}</ul>;
  }

  return (
    <div className='App'>
      <input
        placeholder={'Search...'}
        className='SearchBar' type='text'
        value={search}
        onInput={(event) => {
          setSearch(event.target.value);
        }} />
      {loading ? (
        <Lottie
          height={600}
          width={600}
          options={{
            loop: true,
            autoplay: true,
            animationData: require('./animations/empty-data-loading.json'),
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }} />
      ) : (
        <ResultsList />
      )}
    </div>
  );
}

export default App;
