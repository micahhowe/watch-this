UPDATE flix
SET flix_priority = flix_priority - 1
WHERE flix_id = $1;