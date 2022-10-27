/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

-- drop table if exists test;
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