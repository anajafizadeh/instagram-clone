import Image from "next/image";
import LabelBottomNavigation from "./ui/bottom-nav";
import ButtonAppBar from "./ui/header";
import PostsList from "./ui/posts-list";
import Divider from '@mui/material/Divider';
import { getPosts } from "./lib/queries/posts";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen pb-17.5 pt-13">
      <ButtonAppBar />
      <PostsList
        posts={posts}
      />
      <Divider />
      <LabelBottomNavigation />
    </div>
  );
}
