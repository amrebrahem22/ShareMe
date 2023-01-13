import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import Spinner from './Spinner';
import {searchQuery, feedQuery} from '../utils/data';
import {MasonryLayout} from './';


const Feed = () => {
  const [pins, setPins] = useState()
  const [loading, setLoading] = useState(false)
  const {categoryId} = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
        console.log('data:', data);

      });
    }
  }, [categoryId]);

  if (loading) {
    return (
      <Spinner message={`We are adding new ideas to your feed!`} />
    );
  }

  return (
    <div>
      {pins && (<MasonryLayout pins={pins} />)}
    </div>
  )
}

export default Feed