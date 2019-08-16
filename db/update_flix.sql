UPDATE flix
SET flix_title = $1, flix_info = $2, flix_image = $3
WHERE flix_id = $4;
SELECT * FROM flix;