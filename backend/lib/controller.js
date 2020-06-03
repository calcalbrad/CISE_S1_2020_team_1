//controller.js
import ArticleModel from './model'

function getAll() {
  return ArticleModel.find()
}


function post(article) {
  let newArticle = new ArticleModel(article)
  console.log(newArticle);
  return newArticle.save()
}


// search function
function search(searchData) {
  return ArticleModel.find({topic: new RegExp(searchData.topic, 'i'), title: new RegExp(searchData.title, 'i'), author: new RegExp(searchData.author, 'i'), source: new RegExp(searchData.source, 'i')})
}


function deleteMessage(id) {
  return ArticleModel.deleteOne({ _id: id })
}

function getSearch(topic) {
  return ArticleModel.find({ topic: topic })
}


function getTopics() {
  return ArticleModel.distinct("topic");
}


function getSingleMessage(id) {
  return ArticleModel.findOne({ _id: id })
}

function updateMessage(id, update) {
  return ArticleModel.findOneAndUpdate({ _id: id }, { content: update }, { new: true })
}

module.exports = {
  getAll,
  getSingleMessage,
  post,
  search,
  deleteMessage,
  updateMessage,
  getSearch,
  getTopics
}
