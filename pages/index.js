import { useState } from 'react';

export default function UsernameForm() {
  const [username, setUsername] = useState('');
  const [availability, setAvailability] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        setAvailability(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  return (
    <main className="font-inter h-screen w-screen flex flex-col items-center justify-center">
      <header className = "flex flex-row bg-black text-white font-2xl h-[5%] w-screen px-4">
        <form className = "flex flex-row items-center text-xl space-x-3 text-white transition-all ease-in-out cursor-pointer rounded rounded-full" onSubmit={handleSubmit}>
          <h1 className = "font-breeSerif text-3xl">NameCheck</h1>
          <input
            className="rounded text-black text-lg px-1.5"
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button className = "text-base" type="submit">Search</button>         
        </form>
        <a className = "flex ml-auto mr-0 text-center items-center justify-center sm:hidden" href = "https://github.com/lorenz-f/username-checker">GitHub</a> 
      </header>
       <div className="h-full flex flex-col w-full text-2xl">
        <div
          className={`instagram-gradient h-1/4 space-y-3 w-full items-center justify-center flex flex-col `}
        >
          <img className = "w-16 h-16 flex flex-col" src="/icons/instagram-icon.png" />
          <p className = {`${availability == null ? "loader" : ""} text-white`}>{availability == null ? "Awaiting search" : availability.instagram ? "Available" : "Taken"} </p>
        </div>
        <div
          className={`h-1/4 w-full bg-[#1DA1F2] space-y-3 items-center justify-center flex flex-col`}
        >
          <img className = "w-16 h-16 flex flex-col" src="/icons/twitter-icon.png" />
          <p className = {`${availability == null ? "loader" : ""} text-white`}>{availability == null ? "Awaiting search" : availability.twitter ? "Available" : "Taken"} </p>
        </div> 
        <div
          className={`h-1/4 w-full bg-white space-y-3 items-center justify-center flex flex-col`}
        >
          <img className={`w-16 h-16 flex flex-col`} src="/icons/tiktok-icon.png" />
          <p className = {`${availability == null ? "loader" : ""}`}>{availability == null ? "Awaiting search" : availability.tiktok ? "Available" : "Taken"} </p>
        </div>    
        <div
          className={`h-1/4 w-full bg-[#FF5700] space-y-3 items-center justify-center flex flex-col `}
        >
          <img className={`w-16 h-16 flex flex-col`} src="/icons/reddit-icon.png" />
          <p className = {`${availability == null ? "loader" : ""} text-white`}>{availability == null ? "Awaiting search" : availability.reddit ? "Available" : "Taken"} </p>
        </div> 
       </div> 
    </main> 
  );
}
