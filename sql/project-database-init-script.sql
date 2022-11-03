-- drop table if exists;
drop table if exists articles;
drop table if exists users;


-- create user table
create table users (
    id integer not null primary key,
-- username is unique
    username varchar(64) unique not null,
    password varchar(64) not null,
    fname varchar(64),
	lname varchar(64),
	dateOfBirth DATE,
	description varchar(500),
    authToken varchar(128)
);


-- create articles table
create table articles (
	id INTEGER not null primary key AUTOINCREMENT,
	title varchar(64) not null,
	content text not null,
	timestamp timestamp default CURRENT_TIMESTAMP,
	userId INTEGER not null,
	foreign key (userId) REFERENCES users (id)
    ON UPDATE CASCADE -- to ensure articles delete when parent foreign key gets deleted
    ON DELETE CASCADE
);