// src/components/ClubDashboard.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function ClubDashboard() {
  const [clubs, setClubs] = useState([]);
  const [membersMap, setMembersMap] = useState({});

  useEffect(() => {
    const fetchClubsAndMembers = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "clubs"),
        where("createdBy", "==", auth.currentUser.uid)
      );
      const clubSnapshot = await getDocs(q);
      const clubsData = clubSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClubs(clubsData);

      const newMembersMap = {};
      for (const club of clubsData) {
        const memberQuery = query(
          collection(db, "club_members"),
          where("clubId", "==", club.id)
        );
        const memberSnapshot = await getDocs(memberQuery);
        const members = memberSnapshot.docs.map((doc) => doc.data());
        newMembersMap[club.id] = members;
      }

      setMembersMap(newMembersMap);
    };

    fetchClubsAndMembers();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Club Dashboard</h2>
      {clubs.length === 0 ? (
        <p style={styles.noClubText}>You haven't created any clubs yet.</p>
      ) : (
        clubs.map((club) => (
          <div key={club.id} style={styles.card}>
            <h3 style={styles.clubName}>{club.name}</h3>
            <p style={styles.clubDesc}>{club.description}</p>
            <h4 style={styles.memberHeading}>👥 Joined Students:</h4>
            {membersMap[club.id]?.length > 0 ? (
              <ul style={styles.memberList}>
                {membersMap[club.id].map((member, idx) => (
                  <li key={idx} style={styles.memberItem}>
                    <span style={styles.email}>{member.userEmail}</span>
                    <br />
                    <span style={styles.date}>
                      Joined on {member.joinedAt?.toDate().toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={styles.noMembers}>No students have joined yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f7f9fb",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
  },
  noClubText: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#777",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  clubName: {
    marginBottom: "5px",
    color: "#2c3e50",
  },
  clubDesc: {
    color: "#555",
    fontSize: "14px",
    marginBottom: "15px",
  },
  memberHeading: {
    marginTop: "15px",
    color: "#2980b9",
  },
  memberList: {
    listStyle: "none",
    paddingLeft: "0",
  },
  memberItem: {
    background: "#f0f6ff",
    borderRadius: "6px",
    padding: "10px",
    marginBottom: "10px",
  },
  email: {
    fontWeight: "bold",
    color: "#34495e",
  },
  date: {
    fontSize: "12px",
    color: "#7f8c8d",
  },
  noMembers: {
    color: "#888",
    fontStyle: "italic",
  },
};
