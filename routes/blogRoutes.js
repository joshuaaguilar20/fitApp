

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Blog = mongoose.model('Blog');
const util = require('util');
//makes redis return promise instead of callback function
client.get = util.promisify(client.get);




module.exports = app => {
    app.get('/api/blogs/:id', requireLogin, async (req, res) => {
        const blog = await Blog.findOne({
            _user: req.user.id,
            _id: req.params.id
        });

        res.send(blog);
    });

    app.get('/api/blogs', requireLogin, async (req, res) => {
        //Caching Data for Faster Lookup times* 
        const redis = require('redis');
        const redisUrl = 'redis://127.0.0.1:6379';
        const client = redis.createClient(redis)
        //using utils to return promises
        const cachedBlogs = await client.get(req.user.id)

        //Do we have any Cached Data, if yes respond right away* 
        //if no respond to the request right away. 
        if (cachedBlogs) {
            console.log('Servering From Cached')
            return res.send(JSON.parse(cachedBlogs));
        };

        const blogs = await Blog.find({ _user: req.user.id });
        res.send(blogs);
        console.log('Servering From DB');
        //must make data string 
        client.set(req.user.id, JSON.stringify(blogs));
    });

    app.post('/api/blogs', requireLogin, async (req, res) => {
        const { title, content } = req.body;

        const blog = new Blog({
            title,
            content,
            _user: req.user.id
        });

        try {
            await blog.save();
            res.send(blog);
        } catch (err) {
            res.send(400, err);
        }
    });
};