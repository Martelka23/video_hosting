create table users (
  id serial primary key,
  username varchar(64) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  created_at date not null,
  is_banned boolean default false,
  ban_reason varchar(255) default '',
  is_activated boolean default false,
  role varchar(64) default 'user'
);