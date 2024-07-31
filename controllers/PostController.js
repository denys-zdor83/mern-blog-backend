import PostModel from "../models/Post.js";

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(',').map(tag => tag.trim()),
            imageUrl: req.body.imageUrl,
            user: req.userId,
        })

        const post = await doc.save();
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create a post' });
    }
}

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts
            .map(obj => obj.tags)
            .flat()
            .slice(0, 5);
    
        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get last tags' });
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
    
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get all posts' });
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        let doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true }
        ).populate('user');
        
        res.json(doc);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get post' });
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const result = await PostModel.findOneAndDelete(
            { _id: postId }
        )

        if (!result) {
            return res.status(404).json({ message: 'The article was not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete post' });
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            { _id: postId },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags.split(',').map(tag => tag.trim()),
                imageUrl: req.body.imageUrl,
                user: req.userId,
            }
        )

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update post' });
    }
}