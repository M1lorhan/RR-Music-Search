import './App.css';
import { useState, useEffect, Fragment, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataContext } from "./context/DataContext";
import Gallery from "./components/Gallery";
import SearchBar from "./components/Searchbar";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";
import { createResource } from './helper';
import Spinner from './Spinner';


function App() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('Search for Music!');

    useEffect(() => {
		if (search) {
			const resource = createResource(search);
			resource.read().then((responseData) => {
				setData(responseData);
			});
		}
	}, [search]);
	

    const handleSearch = (e, term) => {
        e.preventDefault();
        setSearch(term);
    }

	const renderGallery = () => {
		if (data) {
			return(
				<Suspense fallback={<Spinner />}>
				<Gallery data={data} />
				</Suspense>
			)
		}
	}
	
	
    return (
		<div>
            {message}
            <Router>
                <Routes>
                    <Route path="/" element={
						<Fragment>
                            <SearchBar handleSearch={handleSearch} />
                            {message}
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <DataContext.Provider value={data}>
									{renderGallery()}
                                </DataContext.Provider>
                            </Suspense>
                        </Fragment>
                    } />
                    <Route path="/album/:id" element={<AlbumView />} />
                    <Route path="/artist/:id" element={<ArtistView />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;