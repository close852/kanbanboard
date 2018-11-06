--create database
create database kanbanboard;

use kanbanboard;
/*
drop table t_board;
drop table t_user;
drop table t_group;
*/

create table t_board (
    boardid int(20) not null auto_increment primary key,
    workerid varchar(40) not null,
    contents mediumtext not null,
    directorid varchar(40),
    status varchar(20) not null,
    enddate datetime,
    reguserid varchar(40),
    regdate datetime default now(),
    chguserid varchar(40),
    chgdate datetime default now()
)
;
insert into t_board (workerid, contents, directorid, status, reguserid, chguserid) values('userid_jiwoo','design model','userid_jiwoo','todo','userid_jiwoo','userid_jiwoo');
insert into t_board (workerid, contents, directorid, status, reguserid, chguserid) values('userid_jiwoo','integration test','userid_jiwoo','todo','userid_jiwoo','userid_jiwoo');
insert into t_board (workerid, contents, directorid, status, reguserid, chguserid) values('userid_jiwoo','develop main page','userid_jiwoo','inProgress','userid_jiwoo','userid_jiwoo');
insert into t_board (workerid, contents, directorid, status, reguserid, chguserid) values('userid_jiwoo','design main page','userid_jiwoo','done','userid_jiwoo','userid_jiwoo');

create table t_user (
userid varchar(40) not null primary key,
username varchar(40) not null,
groupid int(20)
)
;
insert into t_user values ('userid_jiwoo','jiwoo',1);
insert into t_user values ('userid_mira','mira',1);

create table t_group (
groupid int(20) not null auto_increment primary key,
groupname varchar(40) not null,
useyn char(1)
);

insert into t_group(groupname,useyn) values ('A','Y');
insert into t_group(groupname,useyn) values ('B','Y');

