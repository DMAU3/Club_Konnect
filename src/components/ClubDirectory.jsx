import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import "./Directory.css"; // We'll create this CSS too

export default function ClubDirectory() {
  const [clubs, setClubs] = useState([]);
  const [joined, setJoined] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const snapshot = await getDocs(collection(db, "clubs"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClubs(data);
    };

    const fetchJoinedClubs = async () => {
      if (!auth.currentUser) return;
      const docRef = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(docRef);
      const user = snap.data();
      setJoined(user?.joinedClubs || []);
    };

    fetchClubs();
    fetchJoinedClubs();
  }, []);

  const joinClub = async (clubId) => {
    if (!auth.currentUser) return alert("Please log in.");

    const userRef = doc(db, "users", auth.currentUser.uid);
    const newJoined = [...joined, clubId];

    await updateDoc(userRef, {
      joinedClubs: newJoined,
    });

    await addDoc(collection(db, "club_members"), {
      clubId,
      userId: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
      joinedAt: Timestamp.now(),
    });

    setJoined(newJoined);
  };

  return (
    <div className="directory-container">
      <h2>Available Clubs</h2>
      <div className="club-list">
        {clubs.map((club) => (
          <div key={club.id} className="club-card">
            <h3>{club.name}</h3>
            <p>{club.description}</p>
            {!joined.includes(club.id) ? (
              <button onClick={() => joinClub(club.id)}>Join Club</button>
            ) : (
              <span className="joined-tag">✔ Already Joined</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
