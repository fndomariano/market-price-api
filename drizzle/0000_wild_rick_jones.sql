CREATE TABLE IF NOT EXISTS "markets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL
);
