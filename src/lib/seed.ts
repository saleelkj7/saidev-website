import getDb from './db';
import { menuCategories, menuItems } from './menuData';
import { generateId, hashPassword } from './auth';

export async function seedDatabase() {
  const db = getDb();
  
  // Check if already seeded
  const existing = db.prepare('SELECT COUNT(*) as count FROM menu_categories').get() as any;
  if (existing.count > 0) return;

  console.log('Seeding database...');

  // Seed categories
  const insertCategory = db.prepare(
    'INSERT OR IGNORE INTO menu_categories (id, name, sort_order) VALUES (?, ?, ?)'
  );
  const insertItem = db.prepare(
    'INSERT OR IGNORE INTO menu_items (id, name, description, category_id, price, is_available, is_vegetarian, sort_order) VALUES (?, ?, ?, ?, ?, 1, 1, ?)'
  );

  const seedAll = db.transaction(() => {
    for (const cat of menuCategories) {
      insertCategory.run(cat.id, cat.name, cat.sortOrder);
    }
    for (const item of menuItems) {
      insertItem.run(
        item.id,
        item.name,
        (item as any).description || null,
        item.categoryId,
        item.price,
        item.sortOrder
      );
    }
  });

  seedAll();

  // Create default admin
  const adminExists = db.prepare("SELECT id FROM users WHERE email = 'skannanj7@gmail.com'").get();
  if (!adminExists) {
    const hash = await hashPassword('Admin@123');
    db.prepare(
      "INSERT INTO users (id, name, email, phone, password_hash, role, email_verified) VALUES (?, ?, ?, ?, ?, 'ADMIN', 1)"
    ).run(generateId(), 'SAIDEV Admin', 'skannanj7@gmail.com', '02228257979', hash);
    console.log('Admin created: skannanj7@gmail.com / Admin@123');
  }

  console.log('Seeding complete!');
}
