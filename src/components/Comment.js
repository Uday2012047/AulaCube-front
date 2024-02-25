import React, { useState, useRef, useEffect } from "react";
import Action from "./Action";
import { FaStar } from 'react-icons/fa';

const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
  onStar
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const [starred, setStarred] = useState(comment.starred);
  const [sortByDate, setSortByDate] = useState('newest'); // Default sorting by newest
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  const handleStarClick = () => {
    const newStarred = !starred;
    setStarred(newStarred);
    onStar(comment.id, newStarred);
  };

  const handleSortByDate = (e) => {
    const selectedOption = e.target.value;
    setSortByDate(selectedOption);
  };

  const sortCommentsByDate = (comments) => {
    // Sorting function based on the chosen order
    return comments.slice().sort((a, b) => {
      if (sortByDate === 'Oldest to Newest') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  };
  const selectStyle = {
    padding: '8px',

    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: '14px',
    cursor: 'pointer',
  };

  const sortedComments = sortCommentsByDate(comment.items || []);

  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer "}>
        {comment.id === 1 ? (
          <>
            <textarea
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your Comment..."
            />
            <Action
              className="reply comment"
              type="COMMENT"
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                contentEditable={editMode}
                suppressContentEditableWarning={editMode}
                ref={inputRef}
                style={{ wordWrap: "break-word" }}
              >
                {comment.name}
              </span>
              <div>
                <FaStar
                  className={`text-lg ${starred ? 'starred' : 'unstarred'} cursor-pointer `}
                  onClick={handleStarClick}
                />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "30px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type="REPLY"
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="Delete"
                    type="DELETE"
                    handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Sort by Date button */}
      {comment.id === 1 && (
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="sortDropdown" style={{ marginRight: '10px', fontWeight: 'bold' }}>Sort by Date:</label>
          <select id="sortDropdown" name="sortDropdown" onChange={handleSortByDate} value={sortByDate} style={selectStyle}>
            <option value="Newest to Oldest">Newest to Oldest</option>
            <option value="Oldest to Newest">Oldest to Newest</option>
          </select>
        </div>
      )}

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className="reply" type="REPLY" handleClick={onAddComment} />
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}
        {sortedComments.map((cmnt) => (
          <Comment
            key={cmnt.id}
            handleInsertNode={handleInsertNode}
            handleEditNode={handleEditNode}
            handleDeleteNode={handleDeleteNode}
            comment={cmnt}
            onStar={onStar}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;









































// import { useState, useRef, useEffect } from "react";
// import Action from "./Action";
// // import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
// // import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";
// import { FaStar } from 'react-icons/fa';

// const Comment = ({
//   handleInsertNode,
//   handleEditNode,
//   handleDeleteNode,
//   comment, onStar
// }) => {
//   const [input, setInput] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [showInput, setShowInput] = useState(false);
//   const [expand, setExpand] = useState(false);
//   const inputRef = useRef(null);
//   const [starred, setStarred] = useState(comment.starred);


//   useEffect(() => {
//     inputRef?.current?.focus();
//   }, [editMode]);

//   const handleNewComment = () => {
//     setExpand(!expand);
//     setShowInput(true);
//   };

//   const onAddComment = () => {
//     if (editMode) {
//       handleEditNode(comment.id, inputRef?.current?.innerText);
//     } else {
//       setExpand(true);
//       handleInsertNode(comment.id, input);
//       setShowInput(false);
//       setInput("");
//     }

//     if (editMode) setEditMode(false);
//   };

//   const handleDelete = () => {
//     handleDeleteNode(comment.id);
//   };
//   const handleStarClick = () => {
//     const newStarred = !starred;
//     setStarred(newStarred);
//     onStar(comment.id, newStarred);
//   };

//   return (
//     <div>
//       <div className={comment.id === 1 ? "inputContainer" : "commentContainer "}>
//         {comment.id === 1 ? (
//           <>
//             <textarea
//               type="text"
//               className="inputContainer__input first_input"
//               autoFocus
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Write your Comment..."
//             />


//             <Action
//               className="reply comment"
//               type="COMMENT"
//               handleClick={onAddComment}
//             />



//           </>


//         ) : (
//           <>
//             <span
//               contentEditable={editMode}
//               suppressContentEditableWarning={editMode}
//               ref={inputRef}
//               style={{ wordWrap: "break-word" }}
//             >
//               {comment.name}
//             </span>

//             <FaStar
//               className={`text-lg ${starred ? 'starred' : 'unstarred'} cursor-pointer `}
//               onClick={handleStarClick}
//             />



//             <div style={{ display: "flex", marginTop: "30px" }}>
//               {editMode ? (
//                 <>
//                   <Action
//                     className="reply"
//                     type="SAVE"
//                     handleClick={onAddComment}
//                   />
//                   <Action
//                     className="reply"
//                     type="CANCEL"
//                     handleClick={() => {
//                       if (inputRef.current)
//                         inputRef.current.innerText = comment.name;
//                       setEditMode(false);
//                     }}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <Action
//                     className="reply"


//                     type={
//                       <>

//                         REPLY
//                       </>
//                     }

//                     handleClick={handleNewComment}
//                   />

//                   <Action
//                     className="Delete"
//                     type="DELETE"
//                     handleClick={handleDelete}
//                   />
//                 </>
//               )}
//             </div>
//           </>
//         )}

//       </div>

//       <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
//         {showInput && (
//           <div className="inputContainer">
//             <input
//               type="text"
//               className="inputContainer__input"
//               autoFocus
//               onChange={(e) => setInput(e.target.value)}
//             />
//             <Action className="reply" type="REPLY" handleClick={onAddComment} />
//             <Action
//               className="reply"
//               type="CANCEL"
//               handleClick={() => {
//                 setShowInput(false);
//                 if (!comment?.items?.length) setExpand(false);
//               }}
//             />
//           </div>
//         )}

//         {comment?.items?.map((cmnt) => {
//           return (
//             <Comment
//               key={cmnt.id}
//               handleInsertNode={handleInsertNode}
//               handleEditNode={handleEditNode}
//               handleDeleteNode={handleDeleteNode}
//               comment={cmnt}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Comment;
