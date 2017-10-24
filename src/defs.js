export const defaultData = [
    {id: 0, parentId: null, author: 'Nick', text: 'Nick first comment', rating: 3},
    {id: 1, parentId: null, author: 'Rick', text: 'Rick first comment', rating: 22},
    {id: 2, parentId: 0, author: 'Jane', text: 'Jane comment', rating: 12},
    {id: 3, parentId: 2, author: 'Nick', text: 'Nick comment', rating: -3},
    {id: 4, parentId: 0, author: 'Tom', text: 'Tom comment', rating: 1},
    {id: 5, parentId: 1, author: 'Jane', text: 'Jane comment', rating: 0}
];

export const MIN_INPUT_LENGTH = 3;
export const MAX_INPUT_LENGTH = 20;
export const MIN_TEXTAREA_LENGTH = 10;
export const MAX_TEXTAREA_LENGTH = 150;
export const ADD_COMMENT_ERROR_TIME = 3;