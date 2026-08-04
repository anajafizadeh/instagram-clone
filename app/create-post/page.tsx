import LabelBottomNavigation from "../ui/bottom-nav";
import CreatePostForm from "../ui/create-post-form";

export default function CreatePostPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen pb-17.5 pt-13">
      <CreatePostForm />
      <LabelBottomNavigation />
    </div>
  );
}