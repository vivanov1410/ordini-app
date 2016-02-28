import Express from 'express'
import * as controller from '../controllers/recipes.controller'

const router = new Express.Router()

// get all recipes
router.route('/').get(controller.index)

// Get one post by title
// router.route('/getPost').get(PostController.getPost)

// create a new recipe
router.route('/').post(controller.create)

// Delete a Post
// router.route('/deletePost').post(PostController.deletePost)

export default router
