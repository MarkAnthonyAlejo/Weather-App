import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function SearchBar({searchCity}) {
  const [search,setSearch] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if(search.trim()){
      searchCity(search.trim());
      setSearch('')
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='search-bar-section'>
        <input 
          className='search-bar-input' 
          type="search" 
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
           />
        <button className='search-bar-button' type='submit'> 
        <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
        </button>
      </form>  
    </>
  )
}

export default SearchBar
