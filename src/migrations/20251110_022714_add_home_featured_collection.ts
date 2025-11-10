import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_featured_featured_blogs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"blog_id" integer NOT NULL,
  	"custom_title" varchar,
  	"custom_description" varchar
  );
  
  CREATE TABLE "home_featured" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Homepage Featured Blogs' NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "home_featured_id" integer;
  ALTER TABLE "home_featured_featured_blogs" ADD CONSTRAINT "home_featured_featured_blogs_blog_id_blog_posts_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_featured_featured_blogs" ADD CONSTRAINT "home_featured_featured_blogs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_featured"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_featured_featured_blogs_order_idx" ON "home_featured_featured_blogs" USING btree ("_order");
  CREATE INDEX "home_featured_featured_blogs_parent_id_idx" ON "home_featured_featured_blogs" USING btree ("_parent_id");
  CREATE INDEX "home_featured_featured_blogs_blog_idx" ON "home_featured_featured_blogs" USING btree ("blog_id");
  CREATE INDEX "home_featured_created_at_idx" ON "home_featured" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_home_featured_fk" FOREIGN KEY ("home_featured_id") REFERENCES "public"."home_featured"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_home_featured_id_idx" ON "payload_locked_documents_rels" USING btree ("home_featured_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_featured_featured_blogs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_featured" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_featured_featured_blogs" CASCADE;
  DROP TABLE "home_featured" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_home_featured_fk";
  
  DROP INDEX "payload_locked_documents_rels_home_featured_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "home_featured_id";`)
}
