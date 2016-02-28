import Recipe from '../models/recipe'
import status from 'http-status'

export function index(req, res) {
  Recipe.find().sort('-createdAd').exec((err, recipes) => {
    if (err) {
      return res.status(status.INTERNAL_SERVER_ERROR).send(err)
    }

    return res.json(recipes)
  })
}

export function create(req, res) {
  console.log('ZHHOOOPA', req.body)
  if (!req.body.name) {
    return res.status(403).end()
  }

  const recipe = new Recipe(req.body)

  recipe.save((err) => {
    if (err) {
      return res.status(status.INTERNAL_SERVER_ERROR).send(err)
    }

    return res.json(recipe)
  })
}

// export function getPost(req, res) {
//   const newSlug = req.query.slug.split('-')
//   const newCuid = newSlug[newSlug.length - 1]
//   Post.findOne({ cuid: newCuid }).exec((err, post) => {
//     if (err) {
//       return res.status(status.INTERNAL_SERVER_ERROR).send(err)
//     }
//     res.json({ post })
//   })
// }

// export function deletePost(req, res) {
//   const postId = req.body.postId
//   Post.findById(postId).exec((err, post) => {
//     if (err) {
//       return res.status(status.INTERNAL_SERVER_ERROR).send(err)
//     }

//     post.remove(() => {
//       res.status(200).end()
//     })
//   })
// }
