import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [allToDos, setAllToDos] = useState([]);
  const [title, setNewTitle] = useState("");
  const [desc, setNewDesc] = useState("");
  const [completed, setCompleted] = useState([]);
  const handleAdd = () => {
    let newToDo = {
      title: title,
      desc: desc,
    }
    let updateToDo = [...allToDos];
    updateToDo.push(newToDo);
    setAllToDos(updateToDo);
    localStorage.setItem('to-dos', JSON.stringify(updateToDo));
    setNewTitle("");
    setNewDesc("");
  }
  const handleDel = (index) => {
    let delToDo = [...allToDos];
    delToDo.splice(index, 1);
    localStorage.setItem('to-dos', JSON.stringify(delToDo));
    setAllToDos(delToDo);
  }
  const handleDelCmplt = (index) => {
    let delToDo = [...completed];
    delToDo.splice(index, 1);
    localStorage.setItem('completedToDos', JSON.stringify(delToDo));
    setCompleted(delToDo);
  }
  const handleSave = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let cmpltdOn = dd + '-' + mm + '-' + yyyy + '-' + h + '-' + m + '-' + s;
    let filteredItem = {
      ...allToDos[index],
      cmpltdOn: cmpltdOn
    }
    let updateCmpltd = [...completed];
    updateCmpltd.push(filteredItem);
    setCompleted(updateCmpltd);
    handleDel(index);
    localStorage.setItem('completedToDos', JSON.stringify(updateCmpltd));
  }
  useEffect(() => {
    let savedToDo = JSON.parse(localStorage.getItem('to-dos'));
    let savedCmpltdToDo = JSON.parse(localStorage.getItem('completedToDos'));
    if (savedToDo) {
      setAllToDos(savedToDo);
    }
    if (savedCmpltdToDo) {
      setCompleted(savedCmpltdToDo);
    }
  }, [])
  return (
    <div className="App">
      <h3 className="main-head">My ToDos</h3>
      <div className="todo-whole">
        <div className="input">
          <div className="input-title">
            <input type="text" name="title" id="title" placeholder="Enter task title" value={title} onChange={(e) => setNewTitle(e.target.value)} />
          </div>
          <div className="input-desc">
            <input type="text" name="desc" id="desc" placeholder="Enter task description" value={desc} onChange={(e) => setNewDesc(e.target.value)} />
          </div>
          <div className="input-add">
            <input type="submit" value="Add" onClick={handleAdd} />
          </div>
        </div>
        <div className="to-do">
          <h3 className="head">To Do</h3>
          <div className="another-div">
            {allToDos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div className="small-head">
                    <h3>{item.title}</h3>
                    <div className="icons">
                      <span className="material-symbols-outlined right" onClick={() => { handleSave(index) }}>
                        check_circle
                      </span>
                      <span className="material-symbols-outlined del" onClick={() => { handleDel(index) }}>
                        delete
                      </span>
                    </div>
                  </div>
                  <p>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="complete">
          <h3 className="head">Completed</h3>
          <div className="another-div">
            {completed.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div className="small-head">
                    <h3>{item.title}</h3>
                    <span className="material-symbols-outlined del" onClick={() => { handleDelCmplt(index) }}>
                      delete
                    </span>
                  </div>
                  <p>{item.desc}</p>
                  <small className='cmpltd'>Completed on: {item.cmpltdOn}</small>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
