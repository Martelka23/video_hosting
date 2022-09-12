create table videos (
  id serial primary key,
  name varchar(255) not null,
  description text default '',
  preview varchar(255) not null,
  filepath varchar(255) not null,
  likes integer default 0,
  dislikes integer default 0,
  views integer default 0,
  channel_id integer not null,
  foreign key (channel_id) references channels (id)
);