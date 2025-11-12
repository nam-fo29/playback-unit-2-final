import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import "./pages/pages-css/media-queries.css"

import Home from "./pages/Home";
import About from "./pages/About";
import Rewind from "./pages/Rewind";
import UpNext from "./pages/UpNext";
import { useState, useEffect, useContext } from "react";
import TopMenu from "./components/media-organization/TopMenu";
import Footer from "./components/media-organization/Footer";
import AuthProvider, { AuthContext } from "./Context/AuthContext";
//import LoginForm from "./pages/LoginForm";
//import PrivateRoute from "./Auth/PrivateRoute";
//import Login from "./Auth/Login";
//import RegistrationForm from "./pages/RegistrationForm";
//import Register from "./Auth/Register";
import Account from "./Auth/Account";
import { removeMediaFromList, getMediaForList, addMediaToList } from "./api";


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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadLists = async () => {
      if (!user) {
        setLists({
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
        setLoading(false);
        return;
      }

      try {
        const rewindMedia = await getMediaForList("rewind");
        const upNextMedia = await getMediaForList("upNext");
        if (user){
        setLists({
          rewind: rewindMedia,
          upNext: upNextMedia
        })};
      } catch {
        setError("Failed to load lists");
      } finally {
        setLoading(false);
      }

    };

    loadLists();
  }, [user]);

  const handleAddToList = async (media, listName) => {
    try {
      const createdMedia = await addMediaToList(listName, {title: media.title, type: media.type});
      
      setLists(prev => ({
        ...prev,
        [listName]: {
          ...prev[listName],
          [createdMedia.type]: [...(prev[listName][createdMedia.type] || []), createdMedia]
        }
      }));
    } catch {
      //silent
    }
  }

    /*setLists(prev => ({
      ...prev,
      [listType]: {
        ...prev[listType],
        [media.type]: [...(prev[listType][media.type] || []), media]
      }
    }));
    } catch {
      setError("Failed to add media to list. Please try again.");
    }
  };*/

  const handleDeleteFromList = async (media, listName) => {
    try {
      const mediaId = media.id;
      if (!mediaId) throw new Error("Media ID not found");
      

      await removeMediaFromList(listName, mediaId);

      setLists(prev => ({
        ...prev,
        [listName]: prev[listName].filter(item => item.id !== mediaId)
      }));
    } catch {
      setError("Failed to remove media from list. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <Router>
        <TopMenu />
        <main>
          <Routes>
            <Route path="/" element={<Home onAddToList={handleAddToList} />} />
            <Route path="/About" element={<About />} />
            <Route path="/Rewind" element={ <Rewind lists={lists} onDeleteFromList={(media) => handleDeleteFromList(media, "rewind")} /> } />
            <Route path="/Up-Next" element={<UpNext lists={lists} onAddToList={handleAddToList} onDeleteFromList={(media) => handleDeleteFromList(media, "upNext")} /> } />
            <Route path ="/account" element={<Account setLists={setLists} />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </>
  );
};

export default App
