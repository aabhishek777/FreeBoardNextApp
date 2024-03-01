import {UserButton} from "@clerk/nextjs";

const page = () => {
  return (
    <>
      <div>page</div>

      <UserProfile />
    </>
  );
};

export default page;

const UserProfile=() => ( <UserButton />)
