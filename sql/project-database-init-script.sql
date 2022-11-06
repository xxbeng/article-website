/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */


-- delete tables if exists in db
drop table if exists cToC;
drop table if exists comments;
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
    authToken varchar(128),
	icon varchar(128)
);

-- create articles table
create table articles (
	id INTEGER not null primary key AUTOINCREMENT,
	title varchar(64) not null,
	content text not null,
	timestamp timestamp default CURRENT_TIMESTAMP,
	userId INTEGER not null,
  	articleDescription VARCHAR(70),
	foreign key (userId) REFERENCES users (id)
	-- foreign key (username) REFERENCES users (username)
    ON UPDATE CASCADE -- to update articles when parent foreign key gets updated
    ON DELETE CASCADE -- to delete articles when parent foreign key gets deleted
);

-- create comments table
create table comments (
	id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	content varchar(200) not null,
	datenTime timestamp DEFAULT CURRENT_TIMESTAMP,
	articleId integer NOT NULL, 
	userId integer NOT NULL,
	username varchar(64) not null,
	foreign key(articleId) REFERENCES articles (id),
	foreign key(username) REFERENCES users (username),
	foreign key(userId) REFERENCES users (id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

-- create comment to comment table
create TABLE cToC (
	cReceiverId integer NOT NULL,
	cSenderId integer NOT NULL,
	FOREIGN KEY (cReceiverId) REFERENCES comments (id),
	FOREIGN KEY (cSenderId) REFERENCES comments (id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

-- see user-data.sql

-- inserting data for users
INSERT INTO users (id, username, password, fname, lname, dateOfBirth, description, authToken, icon) VALUES
	(1, 'user3', '$2b$10$niF1ZOeWTi17AsFf2mof2uiC/bOGSShKMm1/W4PpnFTPMUIxuLBUy', 'Georgia', 'User3', '1990-01-17', 'i am a photographer', 'b3548ec8-b185-4d44-9f84-8644b16c9f27', 'http://localhost:3000/avatar/avatar6.png'),
	(2, 'user1', '$2b$10$.FSzsEf2ePkoxlAZu1Dx9ucGWAFBEggM2Q1Vo2PajiLGE68YhOjp6', 'Tommy', 'User1', '1986-11-06', 'i am me, and me is me', 'ba62870e-74de-479d-a5ad-f5d8c56e6bc7', 'http://localhost:3000/avatar/avatar3.png'),
	(3, 'user2', '$2b$10$a8A5ZAVtn9BViqoM/uySNONHUPhX7EnooVk5tGX7a9jXDSoLlnPQ6', 'Angus', 'User2', '1990-07-08', 'this is my description and bio about myself', '57fffe46-00fa-44a1-b36b-7781941d35fd', 'http://localhost:3000/avatar/avatar1.png');

-- inserting data for articles	
INSERT INTO articles (id, title, articleDescription, content, timestamp, userId) VALUES
	(4, 'Lorem ipsum dolor sit amet', 'Aenean accumsan mi quis dolor placerat tempor', '<p><img src="images/articles/Halley''s Comet - RicoDZ.jpg" alt="" width="550" height="331"></p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor malesuada sem, ac mollis magna fringilla ac. Donec diam eros, euismod a accumsan eu, commodo et nunc. Praesent vitae purus urna. Aliquam a sapien faucibus lacus commodo pretium. Sed faucibus justo a venenatis semper. Donec quis lectus sapien. Nulla lacinia rhoncus elementum. Aenean ac eleifend orci. Praesent faucibus urna nunc, sit amet consectetur massa ornare et. Cras imperdiet erat nec lacus mattis tristique. Mauris ac egestas orci. Phasellus id interdum lectus. Nam ligula risus, blandit non libero nec, rutrum mattis lacus. Donec consequat urna magna, sed pharetra purus gravida nec. Proin ultrices, metus sit amet tempor pellentesque, ante magna posuere metus, ut pulvinar quam leo a neque. Maecenas hendrerit nisi sed mi laoreet, at ullamcorper leo hendrerit.</p>
<p>Etiam in urna hendrerit, porta nulla vel, fringilla arcu. Suspendisse facilisis blandit ex rhoncus condimentum. Fusce finibus turpis at auctor porttitor. Ut aliquam sit amet nulla a egestas. Mauris venenatis lorem lectus. Vestibulum tincidunt, diam a finibus rutrum, erat libero vestibulum enim, sagittis accumsan nibh tortor non est. Vestibulum aliquam mauris vel nisl rutrum, eu euismod nisi interdum. In non risus suscipit, tempor est a, facilisis quam. Nam placerat suscipit arcu, eu fermentum turpis congue eu.</p>
<p>Etiam mattis diam malesuada, consequat velit sit amet, maximus erat. Vivamus ac tristique mauris, et bibendum ipsum. Morbi nec sem erat. Nulla ultricies nulla eu ex fringilla ultricies. Aliquam placerat massa ut purus tempus, nec consectetur nibh posuere. Nulla ac tortor orci. Suspendisse eu porta ex, et fermentum leo. Aliquam non viverra arcu.</p>
<p>Morbi non est laoreet, consectetur leo porta, volutpat lorem. Integer ornare maximus mi non tincidunt. Maecenas porttitor odio ac ipsum ultrices malesuada. Sed nec tempor nisi, nec fermentum quam. In consectetur erat et metus ornare feugiat. Mauris suscipit eleifend arcu, rhoncus maximus arcu finibus a. Sed eleifend orci tempus erat sodales, vitae egestas magna gravida. Suspendisse vel velit justo. Vivamus mattis porttitor nisl.</p>
<p>Ut et cursus ipsum. Integer malesuada augue augue, nec feugiat purus pulvinar vel. Donec in felis ac metus porttitor tempor eu sit amet sem. Integer purus nisi, elementum in justo eget, porta tempus felis. Nulla facilisi. Mauris vitae malesuada massa, nec malesuada sem. Integer sed augue aliquet, dictum augue in, commodo est.</p>', '2022-11-06 01:21:56', 1),
	(5, 'Pellentesque pretium lectus in sem posuere', 'Donec efficitur blandit vestibulum', '<p>Phasellus erat ipsum, commodo non bibendum vel, dapibus sed urna. Proin bibendum velit risus, vel lobortis velit egestas venenatis. Nulla suscipit sodales maximus. Ut ullamcorper aliquam diam, ut finibus risus. Sed eu imperdiet ex. Suspendisse blandit ante a ante sollicitudin ornare. Aliquam luctus tellus eleifend, dignissim ante id, tempus odio. Aliquam ut pharetra sem, et consectetur lorem. Nulla mi leo, egestas pretium viverra sed, bibendum a mauris. Nam elit ipsum, eleifend ac volutpat id, tristique at lectus. Quisque ut odio mattis nisl auctor congue.</p>
<p>Curabitur non risus mauris. Vestibulum dictum nisi eget lectus scelerisque condimentum. Vivamus rhoncus, ligula non dapibus efficitur, elit orci efficitur dui, eget congue lacus diam et ipsum. Aenean nec velit vel justo dapibus luctus ac eu lorem. Maecenas vel fermentum sapien. Praesent nisi lectus, tincidunt facilisis aliquet sed, viverra vitae purus. Nulla purus tellus, vulputate eget justo faucibus, placerat faucibus nisi. Cras quam ante, vehicula non lectus quis, semper finibus turpis. Donec ac aliquet sapien, non consectetur sapien. Quisque nec tincidunt odio. Donec ornare urna ac lacus dictum accumsan. Nulla elementum est metus, et lobortis velit ornare mollis.</p>
<p><img src="images/articles/Spirits - RicoDZ.jpg" alt="" width="550" height="389"></p>
<p>Quisque consectetur augue quis ultrices rutrum. Pellentesque sem dolor, euismod in luctus nec, blandit id ante. Cras blandit purus non felis consequat bibendum. Cras at nisi eu est venenatis iaculis. Sed condimentum leo eu ultrices euismod. Cras facilisis dui quis tellus viverra, eu pretium justo ultrices. Donec ac tellus non dui bibendum gravida eu in nulla. Fusce id fermentum dolor, nec faucibus risus. Integer tempor metus justo, quis vestibulum nunc vehicula sed. Etiam id magna metus. Donec interdum ullamcorper risus, eget accumsan leo sagittis elementum. Donec venenatis auctor orci quis suscipit. Quisque malesuada lorem consequat ex aliquet, ac commodo ipsum vestibulum. Donec consequat urna sit amet magna eleifend, at pellentesque ante dapibus.</p>', '2022-11-06 01:22:55', 1),
	(6, 'Fusce pharetra leo nulla', 'Vivamus luctus nisl ac consequat sollicitudin', '<p><img src="images/articles/magenta_explorer_by_mickbkk_de88jjj-fullview.jpg" alt="" width="550" height="309"></p>
<p>&nbsp;</p>
<p>Vestibulum vel dolor ut mi blandit finibus. Maecenas risus mauris, rutrum a tempor quis, rutrum quis ipsum. Fusce at nisi pulvinar, blandit urna ac, facilisis tellus. Proin in maximus justo. In aliquet nisi sed enim molestie volutpat. Pellentesque et suscipit augue. Aenean sed urna ligula. In scelerisque condimentum mattis. Pellentesque cursus pharetra nibh at dapibus. Donec a purus in tellus dignissim vulputate. Duis accumsan odio odio, eu semper libero elementum nec. Ut non hendrerit lectus. Maecenas vitae erat suscipit, venenatis lectus vitae, vehicula quam. Vestibulum cursus nulla posuere sem pulvinar, ut fringilla lectus tincidunt.</p>
<p>Proin porttitor eget metus a porttitor. In in rutrum magna. Suspendisse posuere interdum fringilla. Aliquam placerat ipsum ac sem porta ultricies. Praesent dui risus, bibendum a condimentum a, elementum vitae massa. Mauris tincidunt augue sem, ac eleifend velit rutrum non. Cras vel nunc porttitor, hendrerit ante at, efficitur metus. Pellentesque ullamcorper sem augue, ut molestie sapien molestie non. Nullam at tristique nibh, semper mattis mauris. Maecenas auctor vitae ante id vehicula. Morbi imperdiet a orci eu fringilla. Ut eu lorem aliquet, rhoncus purus sit amet, facilisis velit. Etiam non tincidunt nibh. Fusce vel luctus ante.</p>
<p>Integer non volutpat neque, non sodales nisl. Nulla non convallis mauris. Fusce in sem non tortor feugiat molestie ut at risus. Nullam interdum justo lacinia mattis condimentum. Etiam vel lectus justo. Quisque eget massa in tortor gravida laoreet tincidunt eu nulla. Cras sodales ac ante hendrerit ullamcorper. Vivamus blandit auctor massa non vulputate. Quisque molestie et odio et consectetur.</p>', '2022-11-06 01:24:44', 1),
	(7, 'Quisque consectetur augue quis ultrices rutrum', 'Proin a dapibus lorem', '<p><img src="images/articles/Tree Of Life - kristyglas.jpg" alt="" width="550" height="278"></p>
<p>Integer ultricies magna ante, id malesuada lorem laoreet eget. Pellentesque feugiat vel nisl sit amet placerat. Ut facilisis, felis id pretium dignissim, justo lacus pharetra arcu, id iaculis tellus nisl a nisi. Curabitur justo ligula, vestibulum ut magna vitae, aliquet sodales eros. Praesent feugiat sodales urna et finibus. Duis eu maximus felis. Mauris consequat lectus id tortor bibendum iaculis. Nulla ornare tortor sit amet ante commodo vestibulum. Mauris bibendum magna at lacus venenatis tincidunt. Aliquam porta malesuada ipsum, eu hendrerit nunc. Ut urna ipsum, auctor at risus ac, condimentum sagittis velit. Mauris euismod sed nisl vel suscipit. Nullam at lectus eget dui venenatis aliquet lacinia sit amet libero. In hac habitasse platea dictumst. Nulla tempus eleifend egestas.</p>
<p>Phasellus erat ipsum, commodo non bibendum vel, dapibus sed urna. Proin bibendum velit risus, vel lobortis velit egestas venenatis. Nulla suscipit sodales maximus. Ut ullamcorper aliquam diam, ut finibus risus. Sed eu imperdiet ex. Suspendisse blandit ante a ante sollicitudin ornare. Aliquam luctus tellus eleifend, dignissim ante id, tempus odio. Aliquam ut pharetra sem, et consectetur lorem. Nulla mi leo, egestas pretium viverra sed, bibendum a mauris. Nam elit ipsum, eleifend ac volutpat id, tristique at lectus. Quisque ut odio mattis nisl auctor congue.</p>
<p>Curabitur non risus mauris. Vestibulum dictum nisi eget lectus scelerisque condimentum. Vivamus rhoncus, ligula non dapibus efficitur, elit orci efficitur dui, eget congue lacus diam et ipsum. Aenean nec velit vel justo dapibus luctus ac eu lorem. Maecenas vel fermentum sapien. Praesent nisi lectus, tincidunt facilisis aliquet sed, viverra vitae purus. Nulla purus tellus, vulputate eget justo faucibus, placerat faucibus nisi. Cras quam ante, vehicula non lectus quis, semper finibus turpis. Donec ac aliquet sapien, non consectetur sapien. Quisque nec tincidunt odio. Donec ornare urna ac lacus dictum accumsan. Nulla elementum est metus, et lobortis velit ornare mollis.</p>', '2022-11-06 01:43:08', 2),
	(8, 'Quisque malesuada lorem consequat', 'Etiam non commodo ex, quis congue sapien', '<p><img src="images/articles/magenta_explorer_by_mickbkk_de88jjj-fullview.jpg" alt="" width="550" height="309"></p>
<p>Donec et ornare sem. Fusce quis ultrices dolor, ac dignissim sapien. Suspendisse cursus, augue in mollis faucibus, sapien nisi molestie est, a pulvinar metus augue quis arcu. Morbi ut cursus ligula, vel molestie enim. Nam dignissim lectus sit amet metus euismod pulvinar. Duis in sodales ligula. Sed pellentesque sapien et feugiat efficitur. Maecenas et orci eu augue feugiat dapibus.</p>
<p>Proin sollicitudin dolor vitae sem cursus, a luctus dui placerat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam imperdiet est neque, id congue tellus scelerisque vel. Aenean bibendum pulvinar purus, nec efficitur leo ultrices ac. Etiam blandit nisi in sodales feugiat. Suspendisse eget erat et massa malesuada imperdiet at in orci. Nam sed condimentum felis.</p>
<p>Nulla facilisi. Praesent bibendum gravida sapien et suscipit. Ut malesuada elementum pellentesque. Pellentesque fringilla gravida odio ut gravida. Quisque turpis sem, faucibus vitae tincidunt a, pretium sed neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur varius leo at massa faucibus, vitae laoreet enim rutrum. Donec non vehicula tellus. Duis eu congue sem. In vulputate dignissim quam, nec lobortis leo sollicitudin in. Cras scelerisque facilisis tortor, nec viverra lectus maximus at.</p>', '2022-11-06 01:45:38', 3),
	(9, 'Mauris bibendum', 'Etiam commodo ante nec velit cursus mattis. Praesent mattis congue porta. Nam convallis metus in justo sagittis pellentesque', '<p>Curabitur non risus mauris. Vestibulum dictum nisi eget lectus scelerisque condimentum. Vivamus rhoncus, ligula non dapibus efficitur, elit orci efficitur dui, eget congue lacus diam et ipsum. Aenean nec velit vel justo dapibus luctus ac eu lorem. Maecenas vel fermentum sapien. Praesent nisi lectus, tincidunt facilisis aliquet sed, viverra vitae purus. Nulla purus tellus, vulputate eget justo faucibus, placerat faucibus nisi. Cras quam ante, vehicula non lectus quis, semper finibus turpis. Donec ac aliquet sapien, non consectetur sapien. Quisque nec tincidunt odio. Donec ornare urna ac lacus dictum accumsan. Nulla elementum est metus, et lobortis velit ornare mollis.</p>
<p>Quisque consectetur augue quis ultrices rutrum. Pellentesque sem dolor, euismod in luctus nec, blandit id ante. Cras blandit purus non felis consequat bibendum. Cras at nisi eu est venenatis iaculis. Sed condimentum leo eu ultrices euismod. Cras facilisis dui quis tellus viverra, eu pretium justo ultrices. Donec ac tellus non dui bibendum gravida eu in nulla. Fusce id fermentum dolor, nec faucibus risus. Integer tempor metus justo, quis vestibulum nunc vehicula sed. Etiam id magna metus. Donec interdum ullamcorper risus, eget accumsan leo sagittis elementum. Donec venenatis auctor orci quis suscipit. Quisque malesuada lorem consequat ex aliquet, ac commodo ipsum vestibulum. Donec consequat urna sit amet magna eleifend, at pellentesque ante dapibus.</p>
<p>Pellentesque pretium lectus in sem posuere, quis tempus arcu laoreet. Phasellus in euismod massa. Aenean at fermentum nisl. Curabitur id dictum ligula, sed maximus ligula. Duis pellentesque enim massa, a pretium dui lacinia ut. Ut id luctus orci. Nunc nunc ante, euismod in augue vel, pharetra sagittis odio. Donec accumsan diam eget metus elementum varius. Integer id nisi eget leo rutrum tempus. Proin gravida vulputate purus, eget consequat massa tempus id. Duis dictum pulvinar dolor, at placerat leo posuere ut. Morbi ac velit nec dolor sagittis rhoncus a eu nisl. Aliquam eget nisl odio. In ornare sem sem, at venenatis urna ultrices quis.</p>
<p><img src="images/articles/Happy Place - RicoDZ.jpg" alt="" width="550" height="312"></p>', '2022-11-06 01:47:48', 3),
	(10, 'Neque porro quisquam', 'Fusce ut odio a dolor tincidunt pretium sed at lectus', '<p>Ut nec imperdiet massa, ut aliquet ligula. Nunc eu interdum dui. Vestibulum non malesuada orci. Fusce imperdiet justo eu tristique elementum. Donec interdum, purus et congue laoreet, velit ex lacinia nisl, sed varius felis odio ac nisl. Curabitur dui lorem, pellentesque vel blandit et, pulvinar sit amet purus. Nunc varius pellentesque porttitor. Proin aliquet vehicula lectus, non aliquet magna consequat sed. Donec elementum eleifend ligula in maximus. Duis scelerisque id nisi eu accumsan. Etiam eget sem blandit, dictum dolor at, commodo nulla. Praesent molestie mollis est sit amet mattis.</p>
<p><img src="images/articles/Away - RicoDZ.jpg" alt="" width="550" height="326"></p>
<p>Aliquam faucibus, nisi in venenatis maximus, lectus tellus vestibulum nisi, et tempus quam lectus non nisi. Etiam molestie fermentum massa. Donec quis interdum metus, sit amet rhoncus purus. Aliquam erat volutpat. Sed in metus ut elit iaculis mollis. Nunc ex est, tincidunt sed ultricies non, tristique quis dui. Etiam tempor sem dui, ac gravida tellus rutrum eu. Nullam sed tellus orci. Phasellus auctor orci in est interdum, in dictum lectus hendrerit.</p>', '2022-11-06 01:55:34', 2),
	(11, 'Vestibulum dignissim', 'Praesent egestas tincidunt ex, vel molestie neque elementum id. Praesent ac felis nibh. Maecenas lectus nisl, eleifend ut neque quis, luctus suscipit eros. Curabitur bibendum risus nisl, ac laoreet urna mattis scelerisque', '<p><img src="images/articles/Lonely Night - RicoDZ.jpg" alt="" width="550" height="366"></p>
<p>Nunc vitae viverra elit, id ultricies est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ut rutrum leo, vitae scelerisque elit. Maecenas interdum diam nec velit dapibus cursus. Nunc imperdiet, enim et aliquam viverra, nibh tellus convallis mauris, vel consectetur tellus ipsum eget dolor. Maecenas ac mattis orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus luctus nec nisi vel maximus. Donec nec urna felis. Morbi aliquet imperdiet lacus, eu imperdiet ligula aliquam vel. Suspendisse gravida consectetur ex, vitae consectetur ex.</p>
<p>Duis lobortis pretium tempor. Nam libero tortor, luctus nec maximus sed, viverra id orci. Etiam pretium convallis libero, vel fermentum nisi venenatis ac. Nam dui diam, laoreet quis consequat et, scelerisque vitae magna. Proin dignissim non quam id eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent vitae velit nunc. Phasellus eget dui diam. Praesent odio mi, malesuada et condimentum id, condimentum ac leo. Nullam ac orci suscipit, ullamcorper lorem eu, efficitur odio. Quisque ullamcorper vel ex nec rutrum. Duis ut nunc efficitur, fringilla sem eget, vulputate velit. Nulla semper felis risus, iaculis commodo massa commodo a. Pellentesque ac nunc eu arcu consequat vehicula eu ut erat. Integer malesuada id erat eu accumsan.</p>
<p>Suspendisse rhoncus sem ut sem interdum venenatis. Quisque vestibulum quam id interdum auctor. Duis eu nisl velit. Quisque vel commodo orci, sit amet dapibus erat. Etiam ultrices tellus sed felis vulputate, id faucibus felis sollicitudin. Donec nec nibh congue, porta nunc porttitor, feugiat dui. Vestibulum sit amet lorem non mauris pellentesque varius quis sit amet arcu. Proin et neque sed purus rutrum elementum. Donec eu pharetra magna, sed accumsan ante. In commodo molestie mi quis suscipit.</p>', '2022-11-06 02:10:25', 2);

INSERT INTO comments (id, content, datenTime, articleId, userId, username) VALUES
	(1, '<p>very informative!</p>', '2022-11-06 05:42:59', 10, 3, 'user2'),
	(2, 'ikr!!', '2022-11-06 05:46:31', 10, 1, 'user3'),
	(3, 'very cool', '2022-11-06 05:46:56', 10, 1,'user3'),
	(4, '<p>this is so cool!</p>', '2022-11-06 06:27:59', 11, 2, 'user1'),
	(5, '<p>i love the picture!</p>', '2022-11-06 06:28:08', 11, 1, 'user3'),
	(6, 'so AWESOME ay!', '2022-11-06 06:29:17', 11, 3, 'user2'),
	(7, '<p>that''s great to know!</p>', '2022-11-06 06:41:35', 5, 1, 'user3'),
	(8, '<p>no way that''s awesome</p>', '2022-11-06 06:41:49', 4, 1, 'user3'),
	(9, '<p>bump</p>', '2022-11-06 06:41:56', 6, 1, 'user3'),
	(10, 'that''s cool as a bean', '2022-11-06 06:42:33', 11, 3, 'user2'),
	(11, 'it''s actually super!', '2022-11-06 06:43:00', 5, 3, 'user2'),
	(12, 'I''m about to fight you', '2022-11-06 06:43:28', 4, 3, 'user2'),
	(13, '<p>neato-retoooo</p>', '2022-11-06 06:44:30', 5, 1, 'user3'),
	(14, 'fight me!!', '2022-11-06 06:44:53', 4, 2, 'user1'),
	(15, 'i hope you twist your ankle', '2022-11-06 06:45:20', 4, 3, 'user2');

INSERT INTO cToC (cReceiverId, cSenderId) VALUES
	(1, 2),
	(1, 3),
	(5, 6),
	(6, 10),
	(7, 11),
	(8, 12),
	(12, 14),
	(14, 15);