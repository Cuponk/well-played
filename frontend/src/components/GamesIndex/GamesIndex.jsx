import { useEffect, useState } from "react";
import "./GamesIndex.css";
import GameIndexItem from "../GameIndexItem/GameIndexItem";
import jwtFetch from "../../store/jwt";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../store/wishlist";
import { fetchOwnedGames } from "../../store/ownedGames";

function GamesIndex() {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [pageButton, setPageButton] = useState(false);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [wishlist, setWishlist] = useState(false);
  const [library, setLibrary] = useState(false);
  const userWishlist = useSelector(state => state.wishlist);
  const userOwnedGames = useSelector(state => state.ownedGames); 
  const currentUser = useSelector(state => state.user);
  const friends = useSelector(state => Object.values(state.friends));
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      search: search,
      genre: genre,
      year: parseYear(year),
    }
    const res = await jwtFetch(`/api/igdb/search/advanced/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    const fin = await res.json();
    let finalGames = fin;

    if(wishlist) {
      finalGames = await parseWishFriends(finalGames);
    }

    if(library) {
      finalGames = await parseLibraryFriends(finalGames);
    }
    
    setGames(finalGames);
    setPageButton(true);
    console.log(finalGames);
  }

  //igdb has offset option for pagination :D
  const handlePaginate = (e) => {
    e.preventDefault();
    setPage(page + 1);
    const payload = {
      search: search,
      genre: genre,
      year: parseYear(year),
    }
    jwtFetch(`/api/igdb/search/advanced/page/${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((fin) => {
        setGames([...games, ...fin]);
      })
  }

  const parseYear = (year) => {
    if (!year) {
      return ['', ''];
    }
    const start = new Date(year, 0, 1).getTime(); 
    const end = new Date(year, 11, 31).getTime(); 

    return [start, end];
  }

  const fetchFriendWishlist = async (friend) => {
    const res = await jwtFetch(`/api/users/${friend._id}/wishlistGames`);
    const fin = await res.json();
    return fin;
  };
  
  const parseWishFriends = async (games) => {
    const friendWishlistPromises = friends.map((friend) => fetchFriendWishlist(friend));
    const friendWishlistArray = await Promise.all(friendWishlistPromises);
  
    let friendWishlist = [];
    friendWishlistArray.forEach((list) => {
      friendWishlist.push(...list);
    });
  
    const filteredGames = games.filter((game) => {
      return friendWishlist.some((wish) => wish.gameId === game.id);
    });
  
    return filteredGames;
  };

  const fetchFriendLibrary = async (friend) => {
    const res = await jwtFetch(`/api/users/${friend._id}/ownedGames`);
    const fin = await res.json();
    return fin;
  };

  const parseLibraryFriends = async (games) => {
    const friendLibraryPromises = friends.map((friend) => fetchFriendLibrary(friend));
    const friendLibraryArray = await Promise.all(friendLibraryPromises);

    let friendLibrary = [];
    friendLibraryArray.forEach((list) => {
      friendLibrary.push(...list);
    });

    const filteredGames = games.filter((game) => {
      return friendLibrary.some((owned) => owned.gameId === game.id);
    });

    return filteredGames;
  };

  useEffect(() => {
    const payload = {
      search: '',
      genre: '',
      year: parseYear('2023'),
    }
    jwtFetch(`/api/igdb/search/advanced/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((fin) => {
        setGames(fin);
        setPageButton(true);
      })
  }, [])
  

  return (
    <>
      <div className="games-index-container">
          <h2>Search for a game</h2>
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-form-top">
            <button onClick={handleSubmit} className="submit-button"><i className="fa-solid fa-search"/></button>
            <input
              className="search-input"
              type="text"
              placeholder="Search for a game"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="advanced-settings">
            <label className="genre">
              <select className="genre-select" onChange={(e) => setGenre(e.target.value)} value={genre}>
                <option value="">Genre</option>
                <option value="4">Fighting</option>
                <option value="5">Shooter</option>
                <option value="7">Music</option>
                <option value="8">Platform</option>
                <option value="9">Puzzle</option>
                <option value="10">Racing</option>
                <option value="12">Role-playing (RPG)</option>
                <option value="14">Sports</option>
                <option value="15">Strategy</option>
                <option value="25">Hack and slash/Beat 'em up</option>
                <option value="31">Adventure</option>
                <option value="32">Indie</option>
                <option value="34">Visual Novel</option>
                <option value="33">Arcade</option>
                <option value="36">MOBA</option>
              </select>
            </label>
            <label className="year">
              <input type="Number" className="year-input" placeholder="Year" onChange={(e) => setYear(e.target.value)} value={year}/>
            </label>
            <label className="wishlist">
              <input type="checkbox" className="wishlist-checkbox" onClick={() => setWishlist(!wishlist)}/>
              <span className="wishlist-span">Wishlisted by Friends</span>
            </label>
            <label className="library">
              <input type="checkbox" className="library-checkbox" onClick={() => setLibrary(!library)}/>
              <span className="library-span">Owned by friends</span>
            </label>
          </div>
        </form>
        <ul className="games-index">
            {games.map((game) => 
              <>
                <GameIndexItem game={game} key={game.id} wishlist={userWishlist} ownedGames={userOwnedGames}/>
              </>
            )}
        </ul>
        <button onClick={handlePaginate} className={"load-more " + (pageButton ? "" : "hidden")}>Load More Results</button>
      </div>
    </>
  )
}

export default GamesIndex;
