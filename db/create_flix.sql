INSERT INTO posts (user_id, flix_info, flix_image, flix_title)
VALUES ( $1, $2, $3, $4);
SELECT * FROM posts;