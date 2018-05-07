CREATE TABLE IF NOT EXISTS track (
	id integer primary key autoincrement,
	name text unique,
	artist text,
	album text,
	title text,
	format text,
	picture blob,
	duration int
);

CREATE TABLE IF NOT EXISTS user (
	id integer primary key autoincrement,
	username text unique,
	password text
);

CREATE TABLE IF NOT EXISTS community(
	id integer primary key autoincrement,
	title text unique,
	controllerId integer null,
	ownerId integer not null REFERENCES user(id) on delete cascade
);
CREATE TABLE IF NOT EXISTS user_track ( 
	userId integer REFERENCES user (id) on delete cascade,
	trackId integer REFERENCES track (id) on delete cascade,
	primary key(trackId,userId)
);
CREATE TABLE IF NOT EXISTS user_user (
	userId integer REFERENCES user (id) on delete cascade,
	userId2 integer REFERENCES user (id) on delete cascade,
	primary key(userId,userId2)
);
CREATE TABLE IF NOT EXISTS community_user (
	communityId integer REFERENCES community (id) on delete cascade,
	userId integer REFERENCES user (id) on delete cascade,
	primary key(userId,communityId)
);
CREATE TABLE IF NOT EXISTS community_track (
	trackId integer REFERENCES track (id) on delete cascade,
	communityId integer REFERENCES community (id) on delete cascade,
	primary key(trackId ,communityId)
);

create table if not exists listen (
	userId integer primary key REFERENCES user (id) on delete cascade,
	trackId integer REFERENCES track (id) on delete cascade
);