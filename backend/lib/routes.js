import {Router} from "express"
import ArticleModel from "./model.js"
const messageApp = require('./controller.js')
const router = Router()

router.get('/getarticles', async (req, res) => {
  await messageApp.getAll()
  .then((messages) => res.json(messages))
  .catch((err) => res.status(404).json(err))
})


router.get('/gettopics', async (req, res) => {
  await messageApp.getTopics()
  .then((topics) => res.json(topics))
  .catch((err) => res.status(404).json(err))
})



/* submit article */
router.post('/submit', async (req, res) => {
  await messageApp.post(req.body.article)
  .then((articles) => res.json(articles))
  .catch((err) => console.log(err))
})


// search
router.post('/search', async (req, res) => {
  await messageApp.search(req.body.searchData)
  .then((articles) => res.json(articles))
  .catch((err) => res.status(404).json(err))
})

router.delete('/delete/:id', async (req, res) => {
  await messageApp.deleteMessage(req.params.id)
  .then((messages) => res.json(messages))
  .catch((err) => res.status(404).json(err))
})

router.put('/update/:id', async (req, res) => {
  await messageApp.updateMessage(req.params.id, req.body.content)
  .then((messages) => {
    res.json(messages)
  })
  .catch((err) => res.status(404).json(err))
})

export default router
