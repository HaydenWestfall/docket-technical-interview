import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import "./App.scss";
import Posts from "./components/posts/Posts";

const App: React.FC = () => {
  const [postCount, setPostCount] = useState<number>(0);

  return (
    <>
      <Navbar postCount={postCount} />
      <Posts onPostCountChange={setPostCount} />
    </>
  );
};

export default App;
