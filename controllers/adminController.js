const Blog = require("../models/Blog");

exports.getDashboard = async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id });

        res.render("private/blogs", {
            pageTitle: "بخش مدیریت | داشبورد",
            path: "/dashboard",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            blogs,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAddPost = (req, res) => {
    res.render("private/addPost", {
        pageTitle: "بخش مدیریت | ساخت پست جدید",
        path: "/dashboard/add-post",
        layout: "./layouts/dashLayout",
        fullname: req.user.fullname,
    });
};

exports.createPost = async (req, res) => {
    try {
        await Blog.create({ ...req.body, user: req.user.id });
        res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
    }
};
