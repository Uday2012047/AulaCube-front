import React, { useState } from 'react';
import Comment from './Comment';

const ParentComponent = () => {
    const [sortByDate, setSortByDate] = useState('newest');
    const [comments, setComments] = useState([
        // Your comments data array goes here
        // Example:
        // { id: 1, name: "Comment 1", date: "2024-02-25", starred: false },
        // { id: 2, name: "Comment 2", date: "2024-02-24", starred: true },
        // { id: 3, name: "Comment 3", date: "2024-02-23", starred: false },
        // ...
    ]);

    const handleSortByDate = (e) => {
        const selectedSortOption = e.target.value;
        setSortByDate(selectedSortOption);

        // Sort comments based on the selected option
        const sortedComments = comments.slice().sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (selectedSortOption === 'oldest') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
        setComments(sortedComments);
    };

    const handleInsertNode = (id, text) => {
        // Generate a unique ID for the new comment
        const newId = Math.max(...comments.map(comment => comment.id)) + 1;
        // Create a new comment object
        const newComment = {
            id: newId,
            name: text,
            date: new Date().toISOString(),
            starred: false // Assuming the new comment is not starred by default
        };
        // Update the comments array with the new comment
        setComments([...comments, newComment]);
    };

    const handleEditNode = (id, text) => {
        // Find the index of the comment to edit
        const commentIndex = comments.findIndex(comment => comment.id === id);
        if (commentIndex !== -1) {
            // Create a copy of the comments array
            const updatedComments = [...comments];
            // Update the text of the comment at the specified index
            updatedComments[commentIndex].name = text;
            // Update the state with the modified comments array
            setComments(updatedComments);
        }
    };

    const handleDeleteNode = (id) => {
        // Filter out the comment with the specified ID
        const updatedComments = comments.filter(comment => comment.id !== id);
        // Update the state with the filtered comments array
        setComments(updatedComments);
    };

    const handleStar = (id, isStarred) => {
        // Find the index of the comment to update
        const commentIndex = comments.findIndex(comment => comment.id === id);
        if (commentIndex !== -1) {
            // Create a copy of the comments array
            const updatedComments = [...comments];
            // Update the starred status of the comment at the specified index
            updatedComments[commentIndex].starred = isStarred;
            // Update the state with the modified comments array
            setComments(updatedComments);
        }
    };

    return (
        <div>
            <label htmlFor="sortDropdown">Sort by Date:</label>
            <select id="sortDropdown" name="sortDropdown" onChange={handleSortByDate} value={sortByDate}>
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
            </select>

            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    handleInsertNode={handleInsertNode}
                    handleEditNode={handleEditNode}
                    handleDeleteNode={handleDeleteNode}
                    comment={comment}
                    onStar={handleStar}
                />
            ))}
        </div>
    );
};

export default ParentComponent;
