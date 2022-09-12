create table channels (
  id serial primary key,
  name varchar(255) not null,
  description text default '',
  img varchar(255) default '',
  subscribers integer default 0,
  user_id integer not null,
  foreign key (user_id) references users (id)
);