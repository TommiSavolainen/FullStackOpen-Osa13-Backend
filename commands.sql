-- Taulun luominen
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

-- Blogien lisääminen
INSERT INTO blogs (author, url, title, likes) VALUES
('Author 1', 'http://example.com/1', 'Title 1', 10),
('Author 2', 'http://example.com/2', 'Title 2', 20);