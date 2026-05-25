const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'moonshot_images');

const renames = [
  { old: 'Food & Restaurant Tech.jpg', new: 'food-restaurant-tech.jpg' },
  { old: 'Travel & Hospitality.png', new: 'travel-hospitality.png' },
  { old: 'Government & Public Sector.jpg', new: 'government-public-sector.jpg' }
];

renames.forEach(({ old, new: newName }) => {
  const oldPath = path.join(dir, old);
  const newPath = path.join(dir, newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Successfully renamed "${old}" to "${newName}"`);
  } else {
    console.log(`File "${old}" already renamed or not found.`);
  }
});
