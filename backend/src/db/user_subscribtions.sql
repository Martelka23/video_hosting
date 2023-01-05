create table user_subscribtions (
  id serial primary key,
  channel_id integer not null,
  user_id integer not null,
  foreign key (channel_id) references channels (id),
  foreign key (user_id) references users (id)
);