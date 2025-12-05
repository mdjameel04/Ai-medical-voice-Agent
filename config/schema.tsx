
import { integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";




export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer()
});


export const SessionChartTable= pgTable('sessionChartTable',{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  SessionId: varchar().notNull(),
  notes:text(),
  selectedDoctor:json(),
  Conversation:json(),
  report:json(),
  createdBy:varchar().references(()=>usersTable.email),
createdOn:varchar()
})