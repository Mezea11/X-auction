//reviewed

import SearchbarComponent from '../components/Searchbar.jsx';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function SearchPage() {
    return (
        <>
            {/* container for page */}
            <div id="searchPage-container">
                <SearchbarComponent />
            </div>
            <Footer position="fixed-bottom" />
            <ScrollToTopButton />
        </>
    );
}
