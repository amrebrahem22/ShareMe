import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { useCallback } from "react";
import { useRef } from "react";
import { ThreeDots } from "react-loader-spinner";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(20);
  const [hasMore, sethasMore] = useState(false);
  const [dataLength, setDataLength] = useState(false);

  const { categoryId } = useParams();
  const pinsContainer = useRef();

  const fetchPins = useCallback(() => {
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data.slice(0, limit));
        setDataLength(data.length);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data.slice(0, limit));
        setDataLength(data.length);
      });
    }
  }, [categoryId, limit]);

  useEffect(() => {
    setLoading(true);
    fetchPins();
    setLoading(false);
  }, [categoryId, fetchPins]);

  const handleScroll = (e) => {
    if (pinsContainer.current) {
      const { clientHeight } = pinsContainer.current;
      if (
        Math.round(e.target.scrollTop + e.target.clientHeight) >=
        Math.round(clientHeight)
      ) {
        sethasMore(true);
        setTimeout(() => {
          let curr = limit + 20;
          setLimit(curr);
          sethasMore(false);
        }, 1000);
        return;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    // Remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  const ideaName = categoryId || "new";

  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }

  return (
    <>
      <div id="pinsContainer" ref={pinsContainer}>
        {pins && <MasonryLayout pins={pins} />}
      </div>
      <div className="flex items-center justify-center sticky bottom-[-20px] left-0 bg-white">
        {hasMore && limit < dataLength && (
          <ThreeDots
            height="120"
            width="80"
            radius="9"
            color="#ef4444"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
      </div>
      {limit >= dataLength && (
        <p className="text-center py-2 text-lg text-gray-700">No more pins.</p>
      )}
    </>
  );
};

export default Feed;
