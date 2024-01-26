import React from "react";
import "./loadingComponent.css";

function LoadingSkeleton(props) {
  // console.log("hello feom skeleton");

  return (
    <>
      <div className="skeletonWrapper">
      
        <div className="skeletonHeading">
          <div className="skeletonText"></div>

          <div className="skeletonText"></div>
        </div>

        <div className="skeletonProduct">
          <div className="skeletonCard">
            <div className="skeletonImage"></div>

            <div className="skeletonDetails">
              <div className="skeletonDetailsText"></div>

              <div className="skeletonDetailsText"></div>
            </div>
          </div>

          <div className="skeletonCard">
            <div className="skeletonImage"></div>

            <div className="skeletonDetails">
              <div className="skeletonDetailsText"></div>

              <div className="skeletonDetailsText"></div>
            </div>
          </div>

          <div className="skeletonCard">
            <div className="skeletonImage"></div>

            <div className="skeletonDetails">
              <div className="skeletonDetailsText"></div>

              <div className="skeletonDetailsText"></div>
            </div>
          </div>

          <div className="skeletonCard">
            <div className="skeletonImage"></div>

            <div className="skeletonDetails">
              <div className="skeletonDetailsText"></div>

              <div className="skeletonDetailsText"></div>
            </div>
          </div>

          <div className="skeletonCard">
            <div className="skeletonImage"></div>

            <div className="skeletonDetails">
              <div className="skeletonDetailsText"></div>

              <div className="skeletonDetailsText"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoadingSkeleton;
