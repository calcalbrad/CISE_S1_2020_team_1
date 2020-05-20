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

function search(topic){
  console.log(topic);
  return ArticleModel.find({topic: topic})
}

function deleteMessage(id){
  return ArticleModel.deleteOne({_id: id})
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
  updateMessage
}
