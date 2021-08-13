const router = require("express").Router();
const post = require("../model/post");

//Create new post
router.post("/newPost", async(req, res) => {
    const title = req.body.title;
    const description = req.body.description
    const newPost = new post({
        title: title,
        description: description
    });
    const savedPost = await newPost.save(); //Wait for the async to finish and then save the new post
    //Request = get from backend, response = what you send to frontend
    res.json(savedPost);
});

//Get all posts
router.get("/getPosts", async(req, res) => {
    const posts = await post.find({}); //no params -> get back all the posts 
    res.json(posts) //respond w the posts
});

//Update post
router.patch("/editPost/:postId", async(req, res) => { //Use the post id to find the post to edit
    //Colon -> use a dynamic route 
    const _id = req.params.postId //postId is a param
    const update = await post.findByIdAndUpdate(_id, { //updates description to the req.body.description
        $set: {description: req.body.description}
    });
    //res.json(update) -> gives old data
    res.json({
        "Status" : "Updated",
        "Description": req.body.description
    });
});

//Get single post
router.get("/getPost/:postId", async(req, res) => {
    const _id = req.params.postId
    const onePost = await post.findById(_id);
    res.json(onePost);
});

//Delete post
router.delete("/deletePost/:postId", async(req, res) => {
    const _id = req.params.postId
    const p = await post.deleteOne({_id: _id});
    res.json({"Status" :"Completed delete post of " + _id})
});

module.exports = router;