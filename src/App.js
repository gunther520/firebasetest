import logo from './logo.svg';
import './App.css';
import Auth from './components/auth';
import { db, auth } from './config/firebase';
import { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, 'movies');

  //new movie states
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newReleaseDate, setReleaseData] = useState(0);
  const [newOscar, setOscar] = useState(true);
  const [updateTitle, setUpdateTitle] = useState('');

  const getMovieList = async () => {
    //read data from database
    //set the moview list
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, 'movies', id);
      await deleteDoc(movieDoc);
      //getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, 'movies', id);
      await updateDoc(movieDoc, { title: updateTitle });
      //getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, [deleteMovie, updateMovieTitle]);

  const onSubmitMovie = async () => {
    try {
      console.log(auth?.currentUser?.uid);
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedOscar: newOscar,
        userID: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="title.."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="releaseDate"
          type="number"
          onChange={(e) => setReleaseData(Number(e.target.value))}
        />

        <input
          type="checkbox"
          checked={newOscar}
          onChange={(e) => setOscar(e.target.checked)}
        />
        <label> Received Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedOscar ? 'green' : 'red' }}>
              {movie.title}
            </h1>
            <p>Date : {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder="new title"
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
