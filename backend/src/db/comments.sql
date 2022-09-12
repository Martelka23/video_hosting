create table comments (
  id serial primary key,
  text text not null,
  likes integer default 0,
  dislikes integer default 0,
  video_id integer default 0,
  user_id integer not null,
  foreign key (video_id) references videos (id),
  foreign key (user_id) references users (id)
);