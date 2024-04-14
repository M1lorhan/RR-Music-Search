import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import GalleryItem from './GalleryItem';

const Gallery = (props) => {
    const data = useContext(DataContext);

    // Check if data or data.result is null or undefined
    if (!data || !data.result) {
        return null; // Return null or loading indicator
    }

    // Access the resolved value using the read method
    const result = data.result.read();

    // Ensure that the result is an array before mapping over it
    const display = Array.isArray(result) ? result.map((item, index) => (
        <GalleryItem item={item} key={index} />
    )) : null;

    return (
        <div>
            {display}
        </div>
    );
}

export default Gallery;
