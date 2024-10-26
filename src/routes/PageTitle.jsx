import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// PageTitle component to set the document's title based on location and title prop
const PageTitle = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    // Update the document's title with the provided title and a default value
    document.title = `${title} | Vottamean App` || 'Vottamean App';
  }, [location, title]); 

  return null; 
};

export default PageTitle; 
