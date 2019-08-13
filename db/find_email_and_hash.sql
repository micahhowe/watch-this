SELECT * FROM users2 u
JOIN authorization2 a ON a.user_id = u.user_id
WHERE email = $1;