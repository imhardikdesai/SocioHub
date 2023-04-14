import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { shuffleArray } from "../../utility/functions";
import { GetAllExploreList } from "../../utility/utils";
import PostCard from "../post/PostCard";

const Explore = () => {
  const [explore, setExplore] = useState(null);
  useEffect(() => {
    GetAllExploreList().then((item) =>
      setExplore(shuffleArray(Object.values(item)))
    );
  }, []);
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {explore ? (
          explore.map((item) => {
            return (
              <PostCard
                key={item.postId}
                item={item}
                isProfileView={false}
                isPublic={true}
              />
            );
          })
        ) : (
          <InfinitySpin width="200" color="#3182CE" />
        )}
      </div>
    </div>
  );
};

export default Explore;
