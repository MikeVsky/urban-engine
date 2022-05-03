import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import NavbarMain from './NavbarMain'
import Note from './Note'
import app, { db } from '../firebase'
import AddNote from './AddNote'
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  where
} from "firebase/firestore"

export default function NotePage() {

  const [notes, setNotes] = useState([])
  document.title = "Notes"


  useEffect(() => {
    const noteRef = collection(db, "notes")
    const q = query(noteRef, where("uid", "==", app.auth().currentUser.uid))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let notesArray = [];


      querySnapshot.forEach((doc) => {
        notesArray.push({ ...doc.data(), id: doc.id });
      });
      setNotes(notesArray);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    <div>

      <NavbarMain />
      <Container className=" align-items-center "
       >
        <AddNote />
      <div className='notes-list'>
      {notes.map((note) => (
                  <Note
                    key={note.id}
                    note={note}
                    handleDelete={handleDelete}
                  />
                ))}
      </div>
      </Container>

    </div>
  )
}
