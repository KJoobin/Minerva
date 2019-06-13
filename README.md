#Minerva

- 회원목록 -

create table identity ( id INT(11) unsigned AUTO_INCREMENT NOT NULL, email VARCHAR(40) NOT NULL, password VARCHAR(40) NOT NULL, nickname VARCHAR(40) NOT NULL, subscribe INT(11) NOT NULL, subscriber TEXT, picture TEXT, PRIMARY KEY(id) );

-글 목록 -

CREATE TABLE post ( id INT(11) unsigned AUTO_INCREMENT NOT NULL, UID INT(11) unsigned NOT NULL, category CHAR(8), subject CHAR(50) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP, content TEXT, response VARCHAR(2), source CHAR(20), picture TEXT, comment TEXT, hit INT(11) NOT NULL, emotion TEXT, PRIMARY KEY(id) );



           // if(rows[0].picture !== null) {
           //   var picture = path.basename(rows[0].picture)
           //   var params = {
           //       Bucket: 'nearbyfriends/profile_img',
           //       Key: picture
           //   };
           //   s3.deleteObject(params, function(err, data) {
           //     if (err) console.log(err, err.stack);  // error
           //     else     console.log();                 // deleted
           //   });
           // }
