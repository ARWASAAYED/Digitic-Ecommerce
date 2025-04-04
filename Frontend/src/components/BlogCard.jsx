import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
   
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">1 Dec, 2024</p>
        <h3 className="title">Beautiful Sunday Morning Renaissance</h3>
        <p className="desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quaerat accusamus officia.
        </p>
        <Link to="/blog/:id" className="button">
          Read More
        </Link>
      </div>
    </div>
  
  );
};

export default BlogCard;
