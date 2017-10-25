import sass from './styles/app.sass';

import {defaultData} from "./defs";
import Comments from './components/comments';




const commentBlock = document.querySelector('#comments');
const addComment = document.querySelector('#addComment');
const clearStorage = document.querySelector('#clearStorage');

const commentsController = new Comments(commentBlock, defaultData);

// addComment.addEventListener('click', commentsController.addCommentToEnd);

clearStorage.addEventListener('click', ()=>{
    window.localStorage.clear();
    console.log('localStorage cleaned! ➥');
    location.reload();
});




