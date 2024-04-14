// These components will be making separate API calls from the app
// component to serve specific data about a given album
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])
    const navigate = useNavigate()

    useEffect(() =>{
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const resData = await response.json();
                setAlbumData(resData.results);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error, e.g., show an error message to the user
            }
        };
        fetchData()
    }, [id])

    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={song.trackName}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    const navButtons = () => {
        return(
            <div>
                <button onClick={() =>navigate('/')}>Home</button>
                |
                <button onClick={() =>navigate(-1)}>Back</button>
            </div>
        )
    }

    return (
        <div>
            {navButtons()}
            {renderSongs}
        </div>
    )
}

export default AlbumView
