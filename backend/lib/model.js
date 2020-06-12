import mongoose from 'mongoose';
let ArticleSchema = mongoose.Schema({
  title: String,
  author: String,
  pageRange: String,
  topic: String,
  DOI: String,
  year: Number,
  source: String
});


let ArticleModel = mongoose.model('articles', ArticleSchema);
export default ArticleModel;
