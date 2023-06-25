import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Playlist } from "../../../backend/node_modules/@prisma/client";
import axiosInstance from "./axiosInstance";

function App() {
  const [apps, setApps] = useState<Playlist[]>([]);
  const [adding, setAdding] = useState(false);
  // const [selectedPlaylist, setSelectedPlaylist] = useState(0);
  // const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({
    name: "",
    timesPlayed: 0,
    ownerId: 0,
  });

  function handleDeleteApp(appId: number) {
    axiosInstance
      .delete(`/playlist/playlists/${appId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        },
      })
      .then((response) => {
        console.log(response);
        console.log(`Playlist with ID ${appId} deleted successfully`);
        setApps(apps.filter((app) => app.id !== appId));
      })
      .catch((error) => {
        console.error(`Error deleting playlist with ID ${appId}: ${error}`);
      });
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleAddApp() {
    console.log(values);
    axiosInstance
      .post<Playlist>(`/playlist/playlists`, {
        ...values,
        name: values.name,
        times_played: Number(values.timesPlayed),
        owner_id: Number(values.ownerId),
      })
      .then((response) => {
        console.log(response.data);
        setApps([...apps, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function handleUpdateApp(appId: Number) {
  //   axiosInstance
  //     .put(`/playlist/playlists/${appId}`, {
  //       ...values,
  //       name: values.name,
  //       times_played: Number(values.timesPlayed),
  //       owner_id: Number(values.ownerId),
  //     })
  //     .then((response) => {
  //       setApps(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  useEffect(() => {
    axiosInstance.get<Playlist[]>("/playlist/playlists").then((response) => {
      setApps(response.data);
    });
  }, []);

  return (
    <div className="bg-[#00296b] w-full h-full text-[#fdc500] m-0 font-mono">
      <div className="flex w-full justify-center">
        <ul>
          <li className="text-4xl p-3">
            Spotify
            <div
              className="text-3xl cursor-pointer"
              onClick={() => setAdding(true)}
            >
              Add new playlist
            </div>
          </li>
          <li>
            <Link to={"/"}></Link>
          </li>
          <li>
            <Link to={""}></Link>
          </li>
        </ul>
      </div>
      <div className="grid gap-4 grid-cols-3 place-items-center ">
        {apps.map((app) => (
          <div
            className="pt-2 list-none bg-[#003f88] w-128 h-64 flex place-items-center flex-col text-center align-middle rounded-xl"
            key={app.id}
          >
            <div className="cursor-pointer text-xl break-words w-60">
              {app.name}{" "}
            </div>
            <div>
              {app.times_played} Times Played{" "}
              <span
                onClick={() => {
                  handleDeleteApp(app.id);
                }}
                className="text-xs cursor-pointer text-[#d00000] border px-1 rounded-full border-solid border-[#d00000]"
              >
                ✕
              </span>
            </div>
            {/* <div
              onClick={() => (setEditing(true), setSelectedPlaylist(app.id))}
              className="w-36 text-center cursor-pointer border-solid border-2 border-lime-800"
            >
              Update
            </div> */}
          </div>
        ))}
      </div>
      {adding ? (
        <div className="absolute top-10 left-32 w-1/4 h-96 bg-[#03045e] p-5 text-justify ">
          <div className="flex justify-between ">
            ADDING
            <span className="cursor-pointer" onClick={() => setAdding(false)}>
              X
            </span>
          </div>
          <form className="h-full flex flex-col justify-around py-2">
            <label className="flex justify-between ">
              Name:
              <input
                name="name"
                onChange={handleInputChange}
                value={values.name}
                type="text"
                className="w-56 bg-[#0077b6] rounded-lg px-2"
              />
            </label>
            <label className="flex justify-between ">
              Times Played:
              <input
                name="timesPlayed"
                onChange={handleInputChange}
                value={values.timesPlayed}
                type="number"
                className="w-56 bg-[#0077b6] rounded-lg px-2"
              />
            </label>
            <label className="flex justify-between ">
              Owner Id:
              <input
                name="ownerId"
                onChange={handleInputChange}
                value={values.ownerId}
                type="number"
                className="w-56 bg-[#0077b6] rounded-lg px-2"
              />
            </label>
            <div
              onClick={() => handleAddApp()}
              className="bg-[#0077b6] cursor-pointer text-[#03045e] border px-1 border-solid border-[#0077b6] text-center"
            >
              Confirm
            </div>
          </form>
        </div>
      ) : null}
      {/* <div>
        {editing ? (
          <div className="absolute top-10 left-32 w-1/4 h-96 bg-[#03045e] p-5 text-justify ">
            <div className="flex justify-between ">
              EDITING
              <span
                className="cursor-pointer"
                onClick={() => setEditing(false)}
              >
                X
              </span>
            </div>
            <form className="h-full flex flex-col justify-around py-2">
              <label className="flex justify-between ">
                Name:
                <input
                  name="name"
                  onChange={handleInputChange}
                  value={values.name}
                  type="text"
                  className="w-56 bg-[#0077b6] rounded-lg px-2"
                />
              </label>
              <label className="flex justify-between ">
                Times Played:
                <input
                  name="timesPlayed"
                  onChange={handleInputChange}
                  value={values.timesPlayed}
                  type="number"
                  className="w-56 bg-[#0077b6] rounded-lg px-2"
                />
              </label>
              <label className="flex justify-between ">
                Owner Id:
                <input
                  name="ownerId"
                  onChange={handleInputChange}
                  value={values.ownerId}
                  type="number"
                  className="w-56 bg-[#0077b6] rounded-lg px-2"
                />
              </label>
              <div
                onClick={() => handleUpdateApp(selectedPlaylist)}
                className="bg-[#0077b6] cursor-pointer text-[#03045e] border px-1 border-solid border-[#0077b6] text-center"
              >
                Confirm
              </div>
            </form>
          </div>
        ) : null}
      </div> */}
    </div>
  );
}

export default App;

// import React from "react";

// function App() {
//   return (
//     <h1 className="text-3xl font-bold underline text-red-600">
//       Simple React Typescript Tailwind Sample
//     </h1>
//   );
// }

// export default App;
