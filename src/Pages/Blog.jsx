import React from "react";
import "../assets/Blog.css";

const Blog = () => {
  const dentalArticles = [
     {
      id: 1,
      title: "The Importance of Regular Health Check-ups",
      excerpt: "Preventive care can help detect health issues early and maintain overall wellbeing.",
      category: "Preventive Care",
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      id: 2,
      title: "How to Overcome Medical Anxiety",
      excerpt: "Many people feel nervous about medical visits. Discover techniques to manage healthcare anxiety.",
      category: "Mental Health",
      imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Understanding Common Surgical Procedures",
      excerpt: "A guide to what happens before, during, and after common surgeries.",
      category: "Surgery",
      imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      title: "The Foundation of Good Health: Nutrition",
      excerpt: "How proper nutrition forms the basis for physical and mental wellbeing.",
      category: "Nutrition",
      imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      title: "Exercise as Medicine: The Right Dose",
      excerpt: "Scientific recommendations for physical activity to prevent chronic diseases.",
      category: "Fitness",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      title: "Sleep: The Underrated Health Factor",
      excerpt: "Why quality sleep is crucial for immune function and mental health.",
      category: "Wellness",
      imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <section className="dental-blog-section">
      <div className="dental-blog-container">
        <header className="dental-blog-header">
          <div>
            <h1 className="dental-blog-title">Tips and Insights</h1>
          </div>
          <button className="see-more-blogs-btn">See More Blogs</button>
        </header>

        <div className="dental-blog-grid">
          {dentalArticles.map(article => (
            <article key={article.id} className="dental-blog-card">
              <div className="card-image-wrapper">
                <img src={article.imageUrl} alt={article.title} />
              </div>
              <div className="card-content">
                <h3 className="card-title">{article.title}</h3>
                <p className="card-excerpt">{article.excerpt}</p>
                <a href="#" className="read-more-link">Read More →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;