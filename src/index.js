import sass from './styles/app.sass';

import {defaultData} from "./defs";
import Comments from './components/comments';




const commentBlock = document.querySelector('#comments');

const commentsController = new Comments(commentBlock, defaultData);




