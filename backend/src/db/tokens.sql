create table tokens (
  id serial primary key,
  refresh_token varchar(255) not null,
  activation_link varchar(255),
  user_id integer not null,
  foreign key (user_id) references users (id)
);