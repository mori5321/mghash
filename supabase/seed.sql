INSERT INTO authors (tw_author_id) VALUES
('author1'),
('author2');

-- Insert into mangas
INSERT INTO mangas (tw_conversation_id, tw_author_id, posted_at) VALUES
('manga1', 'author1', '2024-01-01 00:00:00'),
('manga2', 'author2', '2024-01-02 00:00:00');

-- Insert into pages
INSERT INTO pages (tw_conversation_id, tw_tweet_id, tw_author_id, page_number, text) VALUES
('manga1', 'tweet1', 'author1', 1, 'Page 1 of Manga 1'),
('manga1', 'tweet2', 'author1', 2, 'Page 2 of Manga 1'),
('manga2', 'tweet3', 'author2', 1, 'Page 1 of Manga 2'),
('manga2', 'tweet4', 'author2', 2, 'Page 2 of Manga 2');

-- Insert into images
INSERT INTO images (tw_tweet_id, url, image_number) VALUES
('tweet1', 'https://pbs.twimg.com/media/GHjRnwgaQAAWRZ7?format=jpg&name=4096x4096', 1),
('tweet2', 'https://pbs.twimg.com/media/GHjRsNdbgAAwjCS?format=jpg&name=4096x4096', 1),
('tweet2', 'https://pbs.twimg.com/media/GHjRsN_aEAA8VZ-?format=jpg&name=4096x4096', 2),
('tweet2', 'https://pbs.twimg.com/media/GHjRsOSaMAEf8p-?format=jpg&name=4096x4096', 3),
('tweet3', 'http://example.com/image3.jpg', 1),
('tweet4', 'http://example.com/image4.jpg', 2);

