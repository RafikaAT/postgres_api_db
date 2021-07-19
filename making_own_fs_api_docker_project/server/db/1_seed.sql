DROP table Users if exists;

Create table Users (
    id serial int primary key not null,
    username varchar(200) NOT NULL UNIQUE,
    email varchar(200) NOT NULL UNIQUE,
    citizenship varchar(150) not null,
    password_digest varchar(500) NOT NULL);

drop table Countries if exists;

Create table Countries (
    id serial int primary key not null,
    country varchar(200) NOT NULL UNIQUE,
    gdp_per_capita float(8, 2),
    population_count int not null);

drop table countries-users if exists;

create table countries-users (
    foreign key (user_id) references Users(id);
    foreign key (country_id) references Countries(id);
)