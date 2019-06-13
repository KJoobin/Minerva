#Minerva

- 회원목록 -

create table identity ( id INT(11) unsigned AUTO_INCREMENT NOT NULL, email VARCHAR(40) NOT NULL, password VARCHAR(40) NOT NULL, nickname VARCHAR(40) NOT NULL, subscribe INT(11) NOT NULL, subscriber TEXT, picture TEXT, PRIMARY KEY(id) );

-글 목록 -

CREATE TABLE post ( id INT(11) unsigned AUTO_INCREMENT NOT NULL, UID ITN(11) unsigned NOT NULL, category VARCHAR(2), subject VARCHAR(2) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP,  content TEXT, picture TEXT, comment TEXT, hit INT(11) NOT NULL,
