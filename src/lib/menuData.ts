export const menuCategories = [
  { id: 'cat-1', name: 'South Indian Dishes', sortOrder: 1 },
  { id: 'cat-2', name: 'Pav Bhaji', sortOrder: 2 },
  { id: 'cat-3', name: 'Indian Starter', sortOrder: 3 },
  { id: 'cat-4', name: 'Dal Speciality', sortOrder: 4 },
  { id: 'cat-5', name: 'Punjabi Bhendi Dishes', sortOrder: 5 },
  { id: 'cat-6', name: 'Punjabi Palak / Methi Dishes', sortOrder: 6 },
  { id: 'cat-7', name: 'Kofta', sortOrder: 7 },
  { id: 'cat-8', name: 'Roti Variety', sortOrder: 8 },
  { id: 'cat-9', name: 'Soups Speciality', sortOrder: 9 },
  { id: 'cat-10', name: 'Chinese Starters', sortOrder: 10 },
  { id: 'cat-11', name: 'Fruit Juices', sortOrder: 11 },
  { id: 'cat-12', name: 'Snacks', sortOrder: 12 },
  { id: 'cat-13', name: 'Hot Drinks', sortOrder: 13 },
  { id: 'cat-14', name: 'Punjabi Dishes', sortOrder: 14 },
  { id: 'cat-15', name: 'Special Veg', sortOrder: 15 },
  { id: 'cat-16', name: 'Stuffed Paratha', sortOrder: 16 },
  { id: 'cat-17', name: 'Chinese Rice Speciality', sortOrder: 17 },
  { id: 'cat-18', name: 'Milk Shakes', sortOrder: 18 },
  { id: 'cat-19', name: 'Fruit Salad Jelly', sortOrder: 19 },
  { id: 'cat-20', name: 'Sandwich', sortOrder: 20 },
  { id: 'cat-21', name: 'Pizza', sortOrder: 21 },
  { id: 'cat-22', name: 'Punjabi Mushroom Dishes', sortOrder: 22 },
  { id: 'cat-23', name: 'Punjabi Paneer Dishes', sortOrder: 23 },
  { id: 'cat-24', name: 'Kadai / Handi / Tawa Special', sortOrder: 24 },
  { id: 'cat-25', name: 'Basmati Special', sortOrder: 25 },
  { id: 'cat-26', name: 'Chinese Vegetables', sortOrder: 26 },
  { id: 'cat-27', name: 'Salad & Raita', sortOrder: 27 },
  { id: 'cat-28', name: 'Falooda', sortOrder: 28 },
];

export const menuItems = [
  // South Indian Dishes (9am-11am, 4pm-10pm)
  { id: 'mi-1', name: 'Idli Sambar', categoryId: 'cat-1', price: 50, sortOrder: 1 },
  { id: 'mi-2', name: 'Medu Vada Sambar', categoryId: 'cat-1', price: 60, sortOrder: 2 },
  { id: 'mi-3', name: 'Sada Dosa', categoryId: 'cat-1', price: 60, sortOrder: 3 },
  { id: 'mi-4', name: 'Masala Dosa', categoryId: 'cat-1', price: 75, sortOrder: 4 },
  { id: 'mi-5', name: 'Butter Paper Sada', categoryId: 'cat-1', price: 100, sortOrder: 5 },
  { id: 'mi-6', name: 'Butter Paper Masala', categoryId: 'cat-1', price: 120, sortOrder: 6 },
  { id: 'mi-7', name: 'Rava Sada', categoryId: 'cat-1', price: 60, sortOrder: 7 },
  { id: 'mi-8', name: 'Rava Masala', categoryId: 'cat-1', price: 75, sortOrder: 8 },
  { id: 'mi-9', name: 'Plain Uttappam', categoryId: 'cat-1', price: 60, sortOrder: 9 },
  { id: 'mi-10', name: 'Onion / Tomato Uttappam', categoryId: 'cat-1', price: 75, sortOrder: 10 },

  // Pav Bhaji (11am-3pm, 7pm-12pm)
  { id: 'mi-11', name: 'Pav Bhaji', categoryId: 'cat-2', price: 110, sortOrder: 1, description: 'Made in Amul Butter only' },
  { id: 'mi-12', name: 'Cheese Pav Bhaji', categoryId: 'cat-2', price: 140, sortOrder: 2 },
  { id: 'mi-13', name: 'Butter Pav (Single)', categoryId: 'cat-2', price: 15, sortOrder: 3 },
  { id: 'mi-14', name: 'Masala Pav (2 Pc)', categoryId: 'cat-2', price: 90, sortOrder: 4 },
  { id: 'mi-15', name: 'Tava Pulav', categoryId: 'cat-2', price: 130, sortOrder: 5 },
  { id: 'mi-16', name: 'Paneer Tava Pulav', categoryId: 'cat-2', price: 150, sortOrder: 6 },
  { id: 'mi-17', name: 'Pav (Single)', categoryId: 'cat-2', price: 10, sortOrder: 7 },

  // Indian Starter (300ml)
  { id: 'mi-18', name: 'Paneer Tikka Kabab', categoryId: 'cat-3', price: 200, sortOrder: 1 },
  { id: 'mi-19', name: 'Harabhara Kabab', categoryId: 'cat-3', price: 200, sortOrder: 2 },
  { id: 'mi-20', name: 'Bhendi Rajasthani', categoryId: 'cat-3', price: 140, sortOrder: 3 },
  { id: 'mi-21', name: 'Aloo Tikki', categoryId: 'cat-3', price: 140, sortOrder: 4 },

  // Dal Speciality (300ml)
  { id: 'mi-22', name: 'Dal Fry', categoryId: 'cat-4', price: 85, sortOrder: 1 },
  { id: 'mi-23', name: 'Dal Tadka', categoryId: 'cat-4', price: 100, sortOrder: 2 },

  // Punjabi Bhendi Dishes (300ml)
  { id: 'mi-24', name: 'Bhendi Fry / Masala', categoryId: 'cat-5', price: 100, sortOrder: 1 },

  // Punjabi Palak / Methi Dishes (300ml)
  { id: 'mi-25', name: 'Alu Methi', categoryId: 'cat-6', price: 90, sortOrder: 1 },
  { id: 'mi-26', name: 'Mutter Malai Methi', categoryId: 'cat-6', price: 150, sortOrder: 2 },
  { id: 'mi-27', name: 'Alu Palak', categoryId: 'cat-6', price: 80, sortOrder: 3 },

  // Kofta (300ml)
  { id: 'mi-28', name: 'Veg Kofta', categoryId: 'cat-7', price: 150, sortOrder: 1 },
  { id: 'mi-29', name: 'Malai Kofta', categoryId: 'cat-7', price: 150, sortOrder: 2 },
  { id: 'mi-30', name: 'Paneer Kofta', categoryId: 'cat-7', price: 150, sortOrder: 3 },

  // Roti Variety (Butter Extra)
  { id: 'mi-31', name: 'Chapati', categoryId: 'cat-8', price: 10, sortOrder: 1 },
  { id: 'mi-32', name: 'Roti', categoryId: 'cat-8', price: 10, sortOrder: 2 },
  { id: 'mi-33', name: 'Bhakri', categoryId: 'cat-8', price: 10, sortOrder: 3 },
  { id: 'mi-34', name: 'Naan / Paratha / Kulcha', categoryId: 'cat-8', price: 30, sortOrder: 4 },
  { id: 'mi-35', name: 'Balura', categoryId: 'cat-8', price: 35, sortOrder: 5 },
  { id: 'mi-36', name: 'Butter Garlic Naan', categoryId: 'cat-8', price: 65, sortOrder: 6 },

  // Soups Speciality
  { id: 'mi-37', name: 'Sweetcorn Veg Soup', categoryId: 'cat-9', price: 90, sortOrder: 1 },
  { id: 'mi-38', name: 'Hot & Sour Soup', categoryId: 'cat-9', price: 90, sortOrder: 2 },
  { id: 'mi-39', name: 'Manchow Soup', categoryId: 'cat-9', price: 90, sortOrder: 3 },

  // Chinese Starters
  { id: 'mi-40', name: 'Veg Crispy', categoryId: 'cat-10', price: 150, sortOrder: 1 },
  { id: 'mi-41', name: 'Paneer Crispy', categoryId: 'cat-10', price: 180, sortOrder: 2 },
  { id: 'mi-42', name: 'Paneer Salt & Pepper', categoryId: 'cat-10', price: 180, sortOrder: 3 },
  { id: 'mi-43', name: 'Veg Spring Roll', categoryId: 'cat-10', price: 120, sortOrder: 4 },
  { id: 'mi-44', name: 'Paneer China Town', categoryId: 'cat-10', price: 160, sortOrder: 5 },
  { id: 'mi-45', name: 'Potato Chatpata', categoryId: 'cat-10', price: 100, sortOrder: 6 },
  { id: 'mi-46', name: 'Coriander Paneer', categoryId: 'cat-10', price: 140, sortOrder: 7 },

  // Fruit Juices
  { id: 'mi-47', name: 'Mosambi', categoryId: 'cat-11', price: 95, sortOrder: 1 },
  { id: 'mi-48', name: 'Orange', categoryId: 'cat-11', price: 95, sortOrder: 2 },
  { id: 'mi-49', name: 'Pineapple', categoryId: 'cat-11', price: 100, sortOrder: 3 },
  { id: 'mi-50', name: 'Apple', categoryId: 'cat-11', price: 130, sortOrder: 4 },
  { id: 'mi-51', name: 'Grapes', categoryId: 'cat-11', price: 110, sortOrder: 5 },
  { id: 'mi-52', name: 'Cocktail', categoryId: 'cat-11', price: 120, sortOrder: 6 },
  { id: 'mi-53', name: 'Watermelon', categoryId: 'cat-11', price: 95, sortOrder: 7 },
  { id: 'mi-54', name: 'Anwar', categoryId: 'cat-11', price: 130, sortOrder: 8 },
  { id: 'mi-55', name: 'Fresh Lime Soda / Water', categoryId: 'cat-11', price: 50, sortOrder: 9 },
  { id: 'mi-56', name: 'Sweet Lassi / Salted Lassi', categoryId: 'cat-11', price: 75, sortOrder: 10 },
  { id: 'mi-57', name: 'Chass', categoryId: 'cat-11', price: 20, sortOrder: 11 },

  // Snacks (9am-11am, 4pm-10pm)
  { id: 'mi-58', name: 'Usal Pav', categoryId: 'cat-12', price: 50, sortOrder: 1 },
  { id: 'mi-59', name: 'Misal Pav', categoryId: 'cat-12', price: 60, sortOrder: 2 },
  { id: 'mi-60', name: 'Paneer Pokoda', categoryId: 'cat-12', price: 120, sortOrder: 3 },
  { id: 'mi-61', name: 'Puri Bhaji', categoryId: 'cat-12', price: 80, sortOrder: 4 },
  { id: 'mi-62', name: 'Sheera Wada', categoryId: 'cat-12', price: 40, sortOrder: 5 },
  { id: 'mi-63', name: 'Upma', categoryId: 'cat-12', price: 40, sortOrder: 6 },
  { id: 'mi-64', name: 'Samosa', categoryId: 'cat-12', price: 40, sortOrder: 7 },
  { id: 'mi-65', name: 'Sheera', categoryId: 'cat-12', price: 40, sortOrder: 8 },
  { id: 'mi-66', name: 'Onion Bhajia', categoryId: 'cat-12', price: 40, sortOrder: 9 },
  { id: 'mi-67', name: 'Potato Bhajia', categoryId: 'cat-12', price: 40, sortOrder: 10 },
  { id: 'mi-68', name: 'Aloo Pakoda', categoryId: 'cat-12', price: 40, sortOrder: 11 },
  { id: 'mi-69', name: 'Dahi Vada', categoryId: 'cat-12', price: 60, sortOrder: 12 },

  // Hot Drinks
  { id: 'mi-70', name: 'Tea', categoryId: 'cat-13', price: 25, sortOrder: 1 },
  { id: 'mi-71', name: 'Nescafe', categoryId: 'cat-13', price: 30, sortOrder: 2 },
  { id: 'mi-72', name: 'Filter Coffee', categoryId: 'cat-13', price: 30, sortOrder: 3 },

  // Punjabi Dishes (300ml)
  { id: 'mi-73', name: 'Aloo Gobi / Mutter / Jeera', categoryId: 'cat-14', price: 100, sortOrder: 1 },
  { id: 'mi-74', name: 'Chana Masala', categoryId: 'cat-14', price: 100, sortOrder: 2 },
  { id: 'mi-75', name: 'Veg Jalfrezi', categoryId: 'cat-14', price: 120, sortOrder: 3 },
  { id: 'mi-76', name: 'Veg Kurma', categoryId: 'cat-14', price: 100, sortOrder: 4 },
  { id: 'mi-77', name: 'Chhole Masala', categoryId: 'cat-14', price: 100, sortOrder: 5 },
  { id: 'mi-78', name: 'Baingan Masala', categoryId: 'cat-14', price: 100, sortOrder: 6 },
  { id: 'mi-79', name: 'Veg Kolhapuri', categoryId: 'cat-14', price: 100, sortOrder: 7 },
  { id: 'mi-80', name: 'Green Peas Masala', categoryId: 'cat-14', price: 100, sortOrder: 8 },
  { id: 'mi-81', name: 'Veg Makhanwala', categoryId: 'cat-14', price: 120, sortOrder: 9 },

  // Special Veg (300ml)
  { id: 'mi-82', name: 'Veg Patiala', categoryId: 'cat-15', price: 200, sortOrder: 1 },
  { id: 'mi-83', name: 'Veg Maharaja', categoryId: 'cat-15', price: 200, sortOrder: 2 },
  { id: 'mi-84', name: 'Veg Peshwari', categoryId: 'cat-15', price: 200, sortOrder: 3 },
  { id: 'mi-85', name: 'Veg Tiranga', categoryId: 'cat-15', price: 200, sortOrder: 4 },
  { id: 'mi-86', name: 'Veg Lax - Jikab', categoryId: 'cat-15', price: 175, sortOrder: 5 },
  { id: 'mi-87', name: 'Veg Lazenz', categoryId: 'cat-15', price: 200, sortOrder: 6 },
  { id: 'mi-88', name: 'Kaju Masala', categoryId: 'cat-15', price: 200, sortOrder: 7 },
  { id: 'mi-89', name: 'Sabji Chilly Milly', categoryId: 'cat-15', price: 175, sortOrder: 8 },
  { id: 'mi-90', name: 'Dahi Kadi Pakoda', categoryId: 'cat-15', price: 175, sortOrder: 9 },
  { id: 'mi-91', name: 'Paneer Toofani', categoryId: 'cat-15', price: 175, sortOrder: 10 },
  { id: 'mi-92', name: 'Paneer Lajavar', categoryId: 'cat-15', price: 175, sortOrder: 11 },
  { id: 'mi-93', name: 'Paneer Pasanda', categoryId: 'cat-15', price: 175, sortOrder: 12 },

  // Stuffed Paratha (with Gravy, Dahi)
  { id: 'mi-94', name: 'Stuffed Paratha', categoryId: 'cat-16', price: 80, sortOrder: 1 },
  { id: 'mi-95', name: 'Alu Paratha', categoryId: 'cat-16', price: 100, sortOrder: 2 },
  { id: 'mi-96', name: 'Paneer Alu Paratha', categoryId: 'cat-16', price: 120, sortOrder: 3 },

  // Chinese Rice Speciality (500ml)
  { id: 'mi-97', name: 'Veg Fried Rice', categoryId: 'cat-17', price: 120, sortOrder: 1 },
  { id: 'mi-98', name: 'Schezwan Fried Rice', categoryId: 'cat-17', price: 120, sortOrder: 2 },
  { id: 'mi-99', name: 'Burnt Garlic Rice', categoryId: 'cat-17', price: 140, sortOrder: 3 },
  { id: 'mi-100', name: 'Triple Schezwan Fried Rice', categoryId: 'cat-17', price: 170, sortOrder: 4 },
  { id: 'mi-101', name: 'Manchurian Fried Rice', categoryId: 'cat-17', price: 170, sortOrder: 5 },
  { id: 'mi-102', name: 'Paneer Chilly Fried Rice', categoryId: 'cat-17', price: 190, sortOrder: 6 },
  { id: 'mi-103', name: 'Hakka Noodles', categoryId: 'cat-17', price: 120, sortOrder: 7 },
  { id: 'mi-104', name: 'Schezwan Noodles', categoryId: 'cat-17', price: 180, sortOrder: 8 },

  // Milk Shakes (with Icecream Rs.20/- Extra)
  { id: 'mi-105', name: 'Chikoo Milk Shake', categoryId: 'cat-18', price: 120, sortOrder: 1 },
  { id: 'mi-106', name: 'Apple Milk Shake', categoryId: 'cat-18', price: 140, sortOrder: 2 },
  { id: 'mi-107', name: 'Coffee Milk Shake', categoryId: 'cat-18', price: 110, sortOrder: 3 },
  { id: 'mi-108', name: 'Banana Milk Shake', categoryId: 'cat-18', price: 110, sortOrder: 4 },
  { id: 'mi-109', name: 'Dry Fruit Milk Shake', categoryId: 'cat-18', price: 250, sortOrder: 5 },

  // Fruit Salad Jelly
  { id: 'mi-110', name: 'Fruit Salad', categoryId: 'cat-19', price: 130, sortOrder: 1 },
  { id: 'mi-111', name: 'Fruit Salad with Icecream', categoryId: 'cat-19', price: 150, sortOrder: 2 },
  { id: 'mi-112', name: 'Fruit Jelly with Icecream', categoryId: 'cat-19', price: 140, sortOrder: 3 },

  // Sandwich (Toast or Grill as per choice)
  { id: 'mi-113', name: 'Veg Sandwich', categoryId: 'cat-20', price: 70, sortOrder: 1 },
  { id: 'mi-114', name: 'Only Cheese Sandwich', categoryId: 'cat-20', price: 80, sortOrder: 2 },
  { id: 'mi-115', name: 'Veg Cheese Sandwich', categoryId: 'cat-20', price: 100, sortOrder: 3 },
  { id: 'mi-116', name: 'Toast Butter', categoryId: 'cat-20', price: 40, sortOrder: 4 },
  { id: 'mi-117', name: 'Club Sandwich', categoryId: 'cat-20', price: 125, sortOrder: 5 },
  { id: 'mi-118', name: 'Toast Jam Bread Butter', categoryId: 'cat-20', price: 40, sortOrder: 6 },
  { id: 'mi-119', name: 'Cheese Chilly Garlic Toast', categoryId: 'cat-20', price: 125, sortOrder: 7 },

  // Pizza (11am onwards)
  { id: 'mi-120', name: 'Veg Cheese Pizza', categoryId: 'cat-21', price: 200, sortOrder: 1 },
  { id: 'mi-121', name: 'Only Cheese Pizza', categoryId: 'cat-21', price: 180, sortOrder: 2 },
  { id: 'mi-122', name: 'Mushroom Pizza', categoryId: 'cat-21', price: 200, sortOrder: 3 },
  { id: 'mi-123', name: 'Veg Burger', categoryId: 'cat-21', price: 80, sortOrder: 4 },
  { id: 'mi-124', name: 'Veg Cheese Burger', categoryId: 'cat-21', price: 100, sortOrder: 5 },

  // Punjabi Mushroom Dishes (300ml)
  { id: 'mi-125', name: 'Mushroom Masala', categoryId: 'cat-22', price: 100, sortOrder: 1 },
  { id: 'mi-126', name: 'Mushroom Makhanwala', categoryId: 'cat-22', price: 120, sortOrder: 2 },
  { id: 'mi-127', name: 'Mushroom Kolhapuri', categoryId: 'cat-22', price: 120, sortOrder: 3 },

  // Punjabi Paneer Dishes (300ml)
  { id: 'mi-128', name: 'Paneer Butter Masala', categoryId: 'cat-23', price: 140, sortOrder: 1 },
  { id: 'mi-129', name: 'Paneer Burji', categoryId: 'cat-23', price: 130, sortOrder: 2 },
  { id: 'mi-130', name: 'Paneer Tikka Masala', categoryId: 'cat-23', price: 140, sortOrder: 3 },
  { id: 'mi-131', name: 'Paneer Palak', categoryId: 'cat-23', price: 130, sortOrder: 4 },
  { id: 'mi-132', name: 'Paneer Makhanwala', categoryId: 'cat-23', price: 140, sortOrder: 5 },
  { id: 'mi-133', name: 'Paneer Kolhapuri', categoryId: 'cat-23', price: 140, sortOrder: 6 },
  { id: 'mi-134', name: 'Paneer Mutter', categoryId: 'cat-23', price: 130, sortOrder: 7 },
  { id: 'mi-135', name: 'Paneer Masala', categoryId: 'cat-23', price: 130, sortOrder: 8 },

  // Kadai / Handi / Tawa Special (300ml)
  { id: 'mi-136', name: 'Veg Handi', categoryId: 'cat-24', price: 130, sortOrder: 1 },
  { id: 'mi-137', name: 'Kadai Mix Veg', categoryId: 'cat-24', price: 130, sortOrder: 2 },
  { id: 'mi-138', name: 'Kadai Paneer', categoryId: 'cat-24', price: 130, sortOrder: 3 },
  { id: 'mi-139', name: 'Kadai Mushroom', categoryId: 'cat-24', price: 130, sortOrder: 4 },
  { id: 'mi-140', name: 'Paneer Tawa Masala', categoryId: 'cat-24', price: 150, sortOrder: 5 },
  { id: 'mi-141', name: 'Veg Tawa Masala', categoryId: 'cat-24', price: 135, sortOrder: 6 },

  // Basmati Special (500ml)
  { id: 'mi-142', name: 'Plain Rice', categoryId: 'cat-25', price: 50, sortOrder: 1 },
  { id: 'mi-143', name: 'Steam Rice', categoryId: 'cat-25', price: 80, sortOrder: 2 },
  { id: 'mi-144', name: 'Veg Pulav', categoryId: 'cat-25', price: 110, sortOrder: 3 },
  { id: 'mi-145', name: 'Veg Biryani', categoryId: 'cat-25', price: 120, sortOrder: 4 },
  { id: 'mi-146', name: 'Dal Kichdi', categoryId: 'cat-25', price: 140, sortOrder: 5 },
  { id: 'mi-147', name: 'Jeera Rice', categoryId: 'cat-25', price: 100, sortOrder: 6 },
  { id: 'mi-148', name: 'Paneer Biryani', categoryId: 'cat-25', price: 160, sortOrder: 7 },
  { id: 'mi-149', name: 'Dahi Kichdi', categoryId: 'cat-25', price: 140, sortOrder: 8 },

  // Chinese Vegetables (300ml)
  { id: 'mi-150', name: 'Veg Manchurian', categoryId: 'cat-26', price: 120, sortOrder: 1 },
  { id: 'mi-151', name: 'Mushroom Chilly', categoryId: 'cat-26', price: 130, sortOrder: 2 },
  { id: 'mi-152', name: 'Paneer Chilly', categoryId: 'cat-26', price: 150, sortOrder: 3 },

  // Salad & Raita
  { id: 'mi-153', name: 'Green Salad', categoryId: 'cat-27', price: 80, sortOrder: 1 },
  { id: 'mi-154', name: 'Papad (Roasted)', categoryId: 'cat-27', price: 15, sortOrder: 2 },
  { id: 'mi-155', name: 'Papad (Fry)', categoryId: 'cat-27', price: 20, sortOrder: 3 },
  { id: 'mi-156', name: 'Masala Papad', categoryId: 'cat-27', price: 35, sortOrder: 4 },

  // Falooda
  { id: 'mi-157', name: 'Gadbad', categoryId: 'cat-28', price: 200, sortOrder: 1 },
  { id: 'mi-158', name: 'Saidev Falooda', categoryId: 'cat-28', price: 200, sortOrder: 2 },
  { id: 'mi-159', name: 'Kesar Falooda', categoryId: 'cat-28', price: 180, sortOrder: 3 },
  { id: 'mi-160', name: 'Royal Falooda', categoryId: 'cat-28', price: 160, sortOrder: 4 },
  { id: 'mi-161', name: 'Kulfi Falooda', categoryId: 'cat-28', price: 200, sortOrder: 5 },
];
