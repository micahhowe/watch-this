SELECT flix.user_id, flix_content, username, flix_image, flix_title FROM flix
JOIN users2
ON flix.user_id = users2.user_id
WHERE flix_title LIKE $1;

-- SELECT * FROM flix
-- JOIN users2
-- ON flix.user_id = users2.user_id
-- WHERE user2.user_id LIKE $1;


