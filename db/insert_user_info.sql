INSERT INTO users2(username, email)
VALUES(${username}, ${email})
RETURNING *;