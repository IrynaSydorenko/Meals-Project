import fs from 'node:fs'; // this allows us to work with the file system

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all(); // all is used if we are fetching data, run would be used if we are changing data
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop(); // last element will be the file extension
  const fileName = `${meal.slug}.${extension}`; // So now with that we got the file name. Now we need to write that to a file in that public folder.

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving Image Failed!');
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES ( @title, @summary, @instructions, @creator, @creator_email, @image, @slug)`
  ).run(meal);
}
