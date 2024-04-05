import SearchbarComponent from '../components/Searchbar.jsx';

export default function SearchPage() {
    return (
        <>
            {/* container for page */}
            <div id="searchPage-container">
                {/*
                1. div for search bar
                2. div for filter: bird, fish, in between
                3. div for results
                */}
                <SearchbarComponent />
                <div id="filter-container">
                    <h2>Filter your search</h2>
                    <input type="checkbox" />
                    <input type="checkbox" />
                    <input type="checkbox" />
                </div>
                <div id="search-result-container"></div>
            </div>
        </>
    );
}
