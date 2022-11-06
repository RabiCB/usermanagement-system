import { data } from "./Data";
import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import saveAs from "file-saver";


function App() {
  const [user, setUser] = useState(data);
  const [search, setSearch] = useState("");
  
  const [adduser, setAdduser] = useState({
    name: "",
    contact: "",
  });
 
  const handleDelete = (contactid) => {
    const newcontacts = [...user];
    const index = user.findIndex((people) => people.id === contactid);
    newcontacts.splice(index, 1);
    setUser(newcontacts);
    setDeleteon(true);
  };
  const handleAdd = (e, people) => {
    e.preventDefault();
    const newpeople = e.target.getAttribute("name");
    const Allpeople = e.target.value;
    const Alllnewpeople = { ...adduser };
    Alllnewpeople[newpeople] = [Allpeople];
    setAdduser(Alllnewpeople);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const newcontact = {
      id: nanoid(),
      name: adduser.name,
      contact: adduser.contact,
    };
    const newpeoples = [...user, newcontact];
    setUser(newpeoples);
    setAdduser("");
    setAddons(true);
    
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const handleCancel = () => {
    setAddons(false);
  };
  const handleCanceldelete = () => {
    setDeleteon(false);
  };

  const [addons, setAddons] = useState(false);
  const [Deleteon, setDeleteon] = useState(false);
  const [zoomimage, setImagesize] = useState(false);
 

  const [imagefirst, setImagefirst] = useState(
    localStorage.getItem("imagefirst")
  );
  useEffect(() => {
    localStorage.setItem("imagefirst", imagefirst);
  });
  const handleImagechange = (e) => {
    e.preventDefault();
    setImagefirst(URL.createObjectURL(e.target.files[0]));
  };
  const [hovering, setHovering] = useState(false);
  const handlemousehover = () => {
    setHovering(true);
  };
  const handlemouseOut = () => {
    setHovering(false);
  };
  const [copying, setCopying] = useState(false);
  const handlecopymouseover = () => {
    setCopying(true);
  };
  const handleCopymouseout = () => {
    setCopying(false);
  };

  const handlezoomin = () => {
    setImagesize(true);
  };

  const handlezoomout = () => {
    setImagesize(false);
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggletheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`darkmode ${theme}`}>
      <div className="imageupload">
        <div className="uploadtag">
          <label htmlFor="imgs" className="upload">
            upload
          </label>
          <input
            id="imgs"
            type="file"
            onChange={handleImagechange}
          />
        </div>
        <div onMouseOver={handlezoomin} onMouseOut={handlezoomout}>
          <img className="picture" src={imagefirst} alt="jpeg" />
        </div>
      </div>
      <button className="togglebtn" onClick={toggletheme}>Changetheme</button>
      {zoomimage ? (
        <img className="zoomimage" src={imagefirst} alt="zoomdimage"></img>
      ) : (
        ""
      )}
      <div className="App">
        {addons ? (
          <div className="Addons">
            <div>user has been added</div>
            <button onClick={handleCancel}>cancel</button>
          </div>
        ) : (
          ""
        )}
        {Deleteon ? (
          <div className="Addons">
            <div>user has been delete</div>
            <button onClick={handleCanceldelete}>cancel</button>
          </div>
        ) : (
          ""
        )}
        <div className="Addform">
          <div className="search">
            <input
              type="text"
              className="search-btn"
              placeholder="search..."
              onChange={handleSearch}
            />
          </div>

          <div className="items">
            <input
              type="text"
              placeholder="name..."
              className="input-box"
              onChange={handleAdd}
              name="name"
            />
            <input
              type="text"
              placeholder="contact"
              className="input-box"
              onChange={handleAdd}
              name="contact"
            />
            <button type="submit" className="btn" onClick={handlesubmit}>
              Add
            </button>
          </div>
        </div>

        {user
          .filter((people) => {
            if (search === "") {
              return people;
            } else if (
              people.name
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            ) {
              return people;
            }
          })
          .map((people) => {
            return (
              <>
                <div className="user-tag" key={people.id}>
                  <img src={people.img} alt="profiles"></img>
                  <h3>{people.name}</h3>
                  <p>{people.contact}</p>
                  <button
                    id="btn"
                    className="user-btn"
                    onMouseOver={handlemousehover}
                    onMouseOut={handlemouseOut}
                    style={{ cursor: "pointer" }}
                    onClick={() => saveAs(people.img, "image.jpg")}
                  >
                    downloadimage
                  </button>
                  {hovering ? (
                    <div className="hovereffect">downloadimage</div>
                  ) : (
                    ""
                  )}
                  <button
                    className="user-btn"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigator.clipboard.writeText(people.contact)
                    }
                    onMouseOver={handlecopymouseover}
                    onMouseOut={handleCopymouseout}
                  >
                    copycontact
                  </button>
                  {copying ? <div className="copyhover">copy</div> : ""}
                </div>
                <button className="btn-delete" onClick={handleDelete}>
                  remove
                </button>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default App;
