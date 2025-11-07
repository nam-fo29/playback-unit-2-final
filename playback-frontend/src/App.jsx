import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import './App.css'
import "./pages/pages-css/media-queries.css"

import Home from "./pages/Home";
import About from "./pages/About";
import Rewind from "./pages/Rewind";
import UpNext from "./pages/UpNext";
import { useState } from "react";
import TopMenu from "./components/media-organization/TopMenu";
import Footer from "./components/media-organization/Footer";

//App.jsx is where everything comes together. The lists begin as empty arrays and fill up as titles are added.

const App = () => {
  const [lists, setLists] = useState({
    rewind: {
      movie: [],
      tv: [],
      game: [],
      book: []
    },
    upNext: {
      movie: [],
      tv: [],
      game: [],
      book: []
    }
  });

//Below are the event handlers that adds titles to each chosen list and deletes items from lists. State is being set with setLists starting by getting the previous state with prevLists. The spread operator (...) preserves existing entries and the specific list is then updated. It is either added to the existing array or adds to an empty array if one does not already exist.

  const handleAddToList = (media, listType) => {
    const { type } = media;

    setLists(prevLists => ({
      ...prevLists,
      [listType]: {
        ...prevLists[listType],
        [type]: [...(prevLists[listType][type] || []), media]
      }
    }));
  };

  const handleDeleteFromList = (media, listType) => {
    const { type, title } = media;

    setLists(prevLists => ({
      ...prevLists,
      [listType]: {
        ...prevLists[listType],
        [type]: prevLists[listType][type].filter(
          (item) => item.title !== title
        )
      }
    }))
  }
  return (
    <>
      <Router>
        <TopMenu />
        <main>
          <Routes>
            <Route path="/" element={<Home onAddToList={handleAddToList} />} />
            <Route path="/About" element={<About />} />
            <Route path="/Rewind" element={<Rewind lists={lists} onDeleteFromList={(media) => handleDeleteFromList(media, "rewind")} />} />
            <Route path="/Up-Next" element={<UpNext lists={lists} onAddToList={handleAddToList} onDeleteFromList={(media) => handleDeleteFromList(media, "upNext")} />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </>
  );
};

export default App
