//controller.js
import ArticleModel from './model'

function getAll(){
  return ArticleModel.find()
}


function post(article){
  let newArticle = new ArticleModel(article)
  console.log(newArticle);
  return newArticle.save()
}

function search(searchData){
  console.log(searchData);
  return ArticleModel.find({topic: searchData.topic})
}

function deleteMessage(id){
  return ArticleModel.deleteOne({_id: id})
}

function getSearch(topic){
  return ArticleModel.find({topic: topic})
}

function getSingleMessage(id){
  return ArticleModel.findOne({_id: id})
}

function updateMessage(id, update){
  return ArticleModel.findOneAndUpdate({_id: id}, {content: update}, {new: true})
}

module.exports = {
  getAll,
  getSingleMessage,
  post,
  search,
  deleteMessage,
  updateMessage,
  getSearch
}
