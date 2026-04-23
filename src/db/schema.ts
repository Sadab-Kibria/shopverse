import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  json,
  timestamp,
} from "drizzle-orm/pg-core";

/* ================= PRODUCTS (EXISTING) ================= */
export const items = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  price: integer("price").notNull(),
  stock: integer("stock").notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(),
  specs: json("specs").$type<Record<string, any>>(),
  thumbnailUrl: text("thumbnail_url"),
});

/* ================= USERS ================= */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique(),
  password: text("password"), // for admin login
  role: varchar("role", { length: 50 }).default("user"), // 'user' or 'admin'
  created_at: timestamp("created_at").defaultNow(),
});

/* ================= PURCHASES ================= */
export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  product_id: integer("product_id").references(() => items.id),
  quantity: integer("quantity").default(1),
  total_price: integer("total_price").notNull(), // could use numeric() if you prefer decimals
  purchased_at: timestamp("purchased_at").defaultNow(),
});
