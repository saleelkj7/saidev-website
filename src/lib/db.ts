import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    const DB_PATH = path.join(process.cwd(), 'saidev.db');
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeSchema(db);
  }
  return db;
}

function initializeSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'CUSTOMER',
      email_verified INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS email_verification_tokens (
      id TEXT PRIMARY KEY,
      token TEXT UNIQUE NOT NULL,
      user_id TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id TEXT PRIMARY KEY,
      token TEXT UNIQUE NOT NULL,
      user_id TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS menu_categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      category_id TEXT NOT NULL,
      price INTEGER NOT NULL,
      image TEXT,
      is_available INTEGER NOT NULL DEFAULT 1,
      is_vegetarian INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES menu_categories(id)
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      customer_id TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      subtotal INTEGER NOT NULL,
      delivery_charge INTEGER NOT NULL DEFAULT 0,
      total_amount INTEGER NOT NULL,
      payment_method TEXT NOT NULL,
      payment_status TEXT NOT NULL DEFAULT 'PENDING',
      order_status TEXT NOT NULL DEFAULT 'PENDING',
      delivery_address TEXT NOT NULL,
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (customer_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      menu_item_id TEXT,
      item_name TEXT NOT NULL,
      unit_price INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      total_price INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS order_status_history (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      status TEXT NOT NULL,
      changed_by TEXT,
      note TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );
  `);
}

export default getDb;
