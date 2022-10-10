create table video_likes (
  id serial primary key,
  video_id integer not null,
  user_id integer not null,
  foreign key (video_id) references videos (id),
  foreign key (user_id) references users (id)
);