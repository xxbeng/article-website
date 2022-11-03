/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

-- drop table if exists test;
drop table if exists cToC;
drop table if exists comments;
drop table if exists articles;
drop table if exists users;

/* create table test (
    id integer not null primary key,
    stuff text  
);

insert into test (stuff) values
    ('Things'),
    ('More things');
*/

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

create table articles (
	id INTEGER not null primary key AUTOINCREMENT,
	title varchar(64) not null,
	content text not null,
	timestamp timestamp default CURRENT_TIMESTAMP,
	userId INTEGER not null,
	foreign key (userId) REFERENCES users (id)
);

create table comments (
	id integer NOT NULL,
	content varchar(200) not null,
	datenTime timestamp,
	articleId integer NOT NULL, 
	primary KEY(id),
	foreign key(articleId) REFERENCES articles (id)
);

create TABLE cToC (
	cReceiverId integer NOT NULL,
	cSenderId integer NOT NULL,
	FOREIGN KEY (cReceiverId) REFERENCES comments (id),
	FOREIGN KEY (cSenderId) REFERENCES comments (id)
);

