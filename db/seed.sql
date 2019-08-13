DROP TABLE IF EXISTS authorization;
DROP TABLE IF EXISTS users2;
DROP TABLE IF EXISTS flix;


CREATE TABLE users2(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(150),
    password VARCHAR(150)
);

CREATE TABLE authorization2(
    user_id INT,
    hash TEXT
);

-- CREATE TABLE account(
--     account_id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES user_info(user_id),
-- );

CREATE TABLE flix(
  flix_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES user_info(user_id),
  flix_title VARCHAR(80),
  flix_info VARCHAR(200),
  flix_image TEXT,
  flix_priority INT
  --Not sure if i need the priority or not
);
