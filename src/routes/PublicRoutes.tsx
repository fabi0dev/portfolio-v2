import HomeBlog from "@/modules/blog/HomeBlog";
import PostBlog from "@/modules/blog/PostBlog";
import Home from "@/modules/public/Home";

export const PublicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blog",
    element: <HomeBlog />,
  },
  {
    path: "/blog/post/:slug",
    element: <PostBlog />,
  },
];
