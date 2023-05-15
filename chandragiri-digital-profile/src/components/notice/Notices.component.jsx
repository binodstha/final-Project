import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectLatestNotice } from "../../redux/municipality-info/municipality-info.selectors";

const Notices = ({ latestNotice }) => {
  return (
    <>
      {latestNotice.length > 0 ? (
        <>
          {latestNotice.map((notices, index) => {
            return (
              <div
                key={index}
                className="card-block d-flex justify-content-between"
              >
                <div className="card-block_body d-flex">
                  <div className="card-image">
                    <Image src={notices.thumbnail} />
                  </div>
                  <div>
                    <Link to={`/notices/detail/${notices.slug}`}>
                      <h5> {notices.title}</h5>
                    </Link>
                    <div className="details">{notices.detail}</div>
                  </div>
                </div>
                <div className="card-block_time">
                  <p>
                    <i className="fa-regular fa-clock"></i>{" "}
                    {notices.publish_date}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>Don't have any notices</>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  latestNotice: selectLatestNotice,
});

export default connect(mapStateToProps)(Notices);
