import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage=()=>{
  let list=localStorage.getItem('list');
  if(list)
  {
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, seteditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // setAlert({show:true,msg:'Please enter values',type:'danger'});
      showAlert(true,'danger','Please enter values');

    } else if (name && isEditing) {
      setList(list.map((item)=>{
        if(item.id===editID)
        {
           return{...item,title:name}
        }
        return item;
      }))
      setName('');
      seteditID(null);
      setIsEditing(false);
      showAlert(true,'success','Value Change');
    } else {
      showAlert(true,'success','Added To The List');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const showAlert=(show=false,type="",msg="")=>{
    setAlert({show,type,msg});
  }

  const clearList=()=>{
     showAlert(true,'danger','emptylist');
     setList([]);
  };

  const removeItem=(id)=>{
   showAlert(true,'danger','ItemRemoved');
   setList(list.filter((item)=>id!==item.id));
  };

  const editItem=(id)=>{
    const specificItem=list.find((item)=>item.id===id);
    setIsEditing(true);
    seteditID(id);
    setName(specificItem.title);
  };

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list));
  },[list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert  {...alert}  removeAlert={showAlert} list={list}/>}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g:eggs"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
       {list.length >0 &&
        <div className="grocery-container">
          <List items={list}  removeList={removeItem} editItem={editItem}/>
          <button className="clear-btn" onClick={clearList}> clear Items</button>
        </div>
}
      
    </section>
  );
}

export default App;
