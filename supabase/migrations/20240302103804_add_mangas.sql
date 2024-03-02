-- authors
CREATE TABLE IF NOT EXISTS authors (
    author_id VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE POLICY "authors are viewable by everyone"
ON authors FOR SELECT
TO authenticated, anon
USING (true);

-- mangas
CREATE TABLE IF NOT EXISTS mangas (
    tweet_id VARCHAR(255) NOT NULL,
    author_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (tweet_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

CREATE INDEX IF NOT EXISTS mangas_author_id_created_at_idx ON mangas (author_id, created_at DESC);

CREATE POLICY "mangas are viewable by everyone"
ON mangas FOR SELECT
TO authenticated, anon
USING (true);

-- pages
CREATE TABLE IF NOT EXISTS pages (
    tweet_id VARCHAR(255) NOT NULL,
    page_number INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (tweet_id, page_number),
    FOREIGN KEY (tweet_id) REFERENCES mangas(tweet_id)
);

CREATE INDEX IF NOT EXISTS pages_tweet_id_page_number_idx ON pages (tweet_id, page_number ASC);

CREATE POLICY "pages are viewable by everyone"
ON pages FOR SELECT
TO authenticated, anon
USING (true);
