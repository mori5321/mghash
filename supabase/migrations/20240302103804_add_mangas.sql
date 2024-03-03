-- authors
CREATE TABLE IF NOT EXISTS authors (
    tw_author_id VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE POLICY "authors are viewable by everyone"
ON authors FOR SELECT
TO authenticated, anon
USING (true);

-- mangas
CREATE TABLE IF NOT EXISTS mangas (
    tw_conversation_id VARCHAR(255) NOT NULL,
    tw_author_id VARCHAR(255) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    posted_at TIMESTAMP NOT NULL,

    PRIMARY KEY (tw_conversation_id),
    FOREIGN KEY (tw_author_id) REFERENCES authors(tw_author_id)
);

CREATE INDEX IF NOT EXISTS mangas_author_id_created_at_idx ON mangas (tw_author_id, posted_at DESC);

CREATE POLICY "mangas are viewable by everyone"
ON mangas FOR SELECT
TO authenticated, anon
USING (true);

-- pages
CREATE TABLE IF NOT EXISTS pages (
    tw_conversation_id VARCHAR(255) NOT NULL,
    tw_tweet_id VARCHAR(255) NOT NULL,
    tw_author_id VARCHAR(255) NOT NULL,

    page_number INT NOT NULL,
    text TEXT NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (tw_tweet_id),
    FOREIGN KEY (tw_conversation_id) REFERENCES mangas(tw_conversation_id)
);

CREATE INDEX IF NOT EXISTS pages_conversation_id_page_number_idx ON pages (tw_conversation_id, page_number ASC);

CREATE POLICY "pages are viewable by everyone"
ON pages FOR SELECT
TO authenticated, anon
USING (true);


-- images
CREATE TABLE IF NOT EXISTS images (
    id UUID DEFAULT gen_random_uuid(),
    tw_tweet_id VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    image_number INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (tw_tweet_id) REFERENCES pages(tw_tweet_id)
);

CREATE INDEX IF NOT EXISTS images_tweet_id_image_number_idx ON images (tw_tweet_id, image_number ASC);
