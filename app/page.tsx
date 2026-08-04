import Image from "next/image";
import LabelBottomNavigation from "./ui/bottom-nav";
import ButtonAppBar from "./ui/header";
import PostsList from "./ui/posts-list";
import Divider from '@mui/material/Divider';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen pb-17.5 pt-13">
      <ButtonAppBar />
      <PostsList
        posts={[
          {
            id: 1,
            username: "john_doe",
            title: "Post 1",
            description: "This is the first post.",
            likes: ["john_doe", "jane_smith"],
            comments: [
              { username: "jane_smith", comment: "Great post!" },
            ],
            image: "https://images.unsplash.com/photo-1549366021-9f761d450615",
          },
          {
            id: 2,
            username: "jane_smith",
            title: "Post 2",
            description: "This is the second post.",
            likes: ["jane_smith"],
            comments: [
              { username: "john_doe", comment: "I agree!" },
            ],
            image: "https://images.unsplash.com/photo-1549366021-9f761d450615",
          },
          {
            id: 3,
            username: "AmirAli",
            title: "Post 3",
            description: "This is the third post.",
            likes: ["AmirAli"],
            comments: [
              { username: "jane_smith", comment: "Looking good!" },
            ],
            image: "https://images.unsplash.com/photo-1549366021-9f761d450615",
          },
        ]}
      />
      <Divider />
      <LabelBottomNavigation />
    </div>
  );
}
