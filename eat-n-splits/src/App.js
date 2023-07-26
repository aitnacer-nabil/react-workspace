import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';





export default function App() {
  const [friends,setFriends] = useState([  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },])
    const [showAddFriend,setShowAddFriend] = useState(false)

    const [selectedFriend, setSelectedFriend]= useState(null)
  function handleAddFriendToList(friend){
    setFriends((friends)=> [...friends, friend])
    setShowAddFriend(false)
  }

  function handleShowAddFriend(){
    setShowAddFriend(showAddFriend => !showAddFriend)
  }
  function handleSlectedFriend(friend){
    setSelectedFriend(current => (current?.id === friend.id) ? null : friend             )
    setShowAddFriend(false)

  }

  return (
    <div className="app">
      <div className="sidebar">
        <FirendsList friends={friends} onSelection ={handleSlectedFriend} selectedFriend={selectedFriend} />
       {showAddFriend &&  <FormAddFriend  onAddFriend={handleAddFriendToList}/>}
        <Button onClick={handleShowAddFriend}> {showAddFriend ? "Close " : "Add Friend"}</Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend}  />}
    </div>
  );
}
function FirendsList({friends, onSelection , selectedFriend }) {
 
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend}  key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />
      ))}
      
    </ul>
    
  );
}
function Friend({ friend ,onSelection , selectedFriend}) {
  let isSelected = selectedFriend?.id === friend.id
  
  return <li className={isSelected ? "selected": ""}>
    <img src={friend.image} alt={friend.name} />
    {friend.balance === 0 && <p className="">You and {friend.name} are even</p>}
    {friend.balance >  0 && <p className="green"> {friend.name} owes you {friend.balance}$</p>}
    {friend.balance < 0 && <p className="red">you owe {friend.name} {friend.balance}$</p>}
    <h3>{friend.name}</h3>

    <Button onClick={()=> {onSelection(friend)}} >{isSelected ? "Close" :"Select"}</Button>
  </li>;
}

function FormAddFriend({onAddFriend}){
  const [name, setName]= useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48")
 
  
  function handlesubmit(e){
    e.preventDefault();
    if(!name || !image) return;
    const id = uuidv4()
    const newFriend = {
      name,
      image:`${image}?u=${id.toString()}`,
      balance:0,
      id
    }
  
   onAddFriend(newFriend)
    setName('')
    setImage('https://i.pravatar.cc/48')
  }
  
  return <form className="form-add-friend" onSubmit={handlesubmit}>
        <label>Friend name</label>
        <input type="text" value={name} onChange={e=>setName(e.target.value)} ></input>
        <label>Image URL</label>
        <input type="text" value={image} onChange={e=>setImage(e.target.value)}></input>
        
        <Button >Add</Button>
  </form>
}
function Button({children,onClick}){
 return <button className="button" onClick={onClick}>{children}</button>
  }
function FormSplitBill({selectedFriend}){
    return <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>Bill Value</label>
        <input type="text"></input>

        <label>Your expense</label>
        <input type="text"></input>

        <label>{selectedFriend.name}'s expense</label>
        <input type="text" disabled></input>
        <label>Who is paying the bill</label>
        <select>
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <Button>Split Bill</Button>
    </form>
  }