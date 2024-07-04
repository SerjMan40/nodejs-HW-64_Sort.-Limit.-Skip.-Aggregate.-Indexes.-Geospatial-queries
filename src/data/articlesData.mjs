import connectDB from '../config/db.mjs'
import { ObjectId } from 'mongodb'

const readArticlesFromDB = async (page = 1, pageSize = 10) => {
  const client = await connectDB();
  try {
    const db = client.db('your_database_name');
    let cursor;
    if (pageSize === 0) {
      cursor = db.collection('articles').find();
    } else {
      const skip = (page - 1) * pageSize;
      cursor = db.collection('articles').find().skip(skip).limit(pageSize);
    }
    const articles = [];
    await cursor.forEach(article => {
      articles.push(article);
    });
    return articles;
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
};

const addArticleToDB = async (article) => {
  const client = await connectDB()
  try {
    const db = client.db('your_database_name')
    let result
    if (Array.isArray(article)) {
     
      result = await db.collection('articles').insertMany(article)
      return result.insertedIds
        ? article.map((item, index) => ({ ...item, _id: result.insertedIds[index] }))
        : null
    } else {
      result = await db.collection('articles').insertOne(article)
      return result.insertedId ? { ...article, _id: result.insertedId } : null
    }
  } catch (error) {
    console.error('Error adding article:', error)
    return null
  }
}

const updateArticleInDB = async (articles) => {
  const client = await connectDB();
  try {
    const db = client.db('your_database_name');
    if (Array.isArray(articles)) {
      const operations = articles.map(article => ({
        updateOne: {
          filter: { _id: new ObjectId(article.articleId) },
          update: { $set: { title: article.title, framework: article.framework, year: article.year  } }
        }
      }));
      const result = await db.collection('articles').bulkWrite(operations);
      return result.modifiedCount === articles.length;
    } else {
      const { articleId, title, framework, year } = articles;
      const result = await db.collection('articles').updateOne(
        { _id: new ObjectId(articleId) },
        { $set: { title, framework, year } }
      );
      return result.modifiedCount > 0;
    }
  } catch (error) {
    console.error('Error updating articles:', error.message);
    return false;
  } 
};

const replaceArticleInDB = async (articleId, newArticle) => {
  const client = await connectDB()
  try {
    const db = client.db('your_database_name')
    const result = await db.collection('articles').replaceOne({ _id: new ObjectId(articleId) }, newArticle)
    return result.matchedCount > 0
  } catch (error) {
    console.error('Error replacing article:', error)
    return false
  }
}

const findArticleById = async (id) => {
  const client = await connectDB()
  try {
    const db = client.db('your_database_name')
    let article
    if (Array.isArray(id)) {
      article = await db
        .collection('articles')
        .find({ _id: { $in: id.map((item) => new ObjectId(item)) } })
        .toArray()
    } else {
      article = await db.collection('articles').findOne({ _id: new ObjectId(id) })
    }
    console.log('Article(s) from DB:', article)
    return article
  } catch (error) {
    console.error('Error finding article by ID:', error)
    return null
  }
}

const deleteArticleFromDB = async (articleIds) => {
  const client = await connectDB()
  try {
    const db = client.db('your_database_name')
    let result
    if (Array.isArray(articleIds)) {
      result = await db.collection('articles').deleteMany({ _id: { $in: articleIds.map((id) => new ObjectId(id)) } })
    } else {
      result = await db.collection('articles').deleteOne({ _id: new ObjectId(articleIds) })
    }
    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting article:', error)
    return false
  }
}

const getArticleStatistics = async () => {
  const client = await connectDB();
  try {
    const db = client.db('your_database_name');
    const stats = await db.collection('articles').aggregate([
      {
        $group: {
          _id: "$framework", 
          totalArticles: { $sum: 1 }, 
          titlesWithYears: { $push: { title: "$title", year: "$year" } }, 
          minYear: { $min: "$year" }, 
          maxYear: { $max: "$year" } 
        }
      }
    ]).toArray();
    return stats;
  } catch (error) {
    console.error('Error performing aggregation:', error);
    return [];
  }
};

export {
  getArticleStatistics,
  readArticlesFromDB,
  addArticleToDB,
  updateArticleInDB,
  deleteArticleFromDB,
  findArticleById,
  replaceArticleInDB
}
