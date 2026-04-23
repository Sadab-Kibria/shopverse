CREATE TABLE "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"price" integer NOT NULL,
	"stock" integer NOT NULL,
	"description" text,
	"category" varchar(50) NOT NULL
);
