import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [q, setq] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data => setq(data))
  },[])

  function handleDelete(del) {



    fetch(`http://localhost:4000/questions/${del.id}`, 
    {method: 'DELETE'})

    const upd = q.filter((i) => i.id !== del.id)
    setq(upd)

  }

  function handlePatch(e,cha) {
    fetch(`http://localhost:4000/questions/${cha.id}`, 
    {method: "PATCH",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      correctIndex: e
    })
  })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */
        q.map(u => {return <QuestionItem patc={handlePatch} key={u.id} dell={handleDelete} question={u}/>})}
        </ul>
    </section>
  );
}

export default QuestionList;
