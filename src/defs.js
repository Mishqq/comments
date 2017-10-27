export const defaultData = [
    {id: 0, parentId: null, author: 'Nick', text: 'Nick first comment', rating: 3,
        date: 'Thu Oct 26 2017 00:35:31 GMT+0300 (RTZ 2 (зима))'},
    {id: 1, parentId: null, author: 'Rick', text: 'Rick first comment', rating: 22,
        date: 'Thu Oct 12 2017 00:35:31 GMT+0300 (RTZ 2 (зима))'},
    {id: 2, parentId: 0, author: 'Jane', text: 'Jane comment', rating: 12,
        date: 'Thu Oct 26 2017 00:12:31 GMT+0300 (RTZ 2 (зима))'},
    {id: 3, parentId: 2, author: 'Nick', text: 'Nick comment', rating: -3,
        date: 'Thu Oct 24 2017 00:35:31 GMT+0300 (RTZ 2 (зима))'},
    {id: 4, parentId: 0, author: 'Tom', text: 'Tom comment', rating: 1,
        date: 'Thu Oct 26 2017 00:35:32 GMT+0300 (RTZ 2 (зима))'},
    {id: 5, parentId: 1, author: 'Jane', text: 'Jane comment', rating: 0,
        date: 'Thu Oct 25 2017 00:35:31 GMT+0300 (RTZ 2 (зима))'}
];

export const MIN_INPUT_LENGTH = 3;
export const MAX_INPUT_LENGTH = 20;
export const MIN_TEXTAREA_LENGTH = 10;
export const MAX_TEXTAREA_LENGTH = 150;
export const ADD_COMMENT_ERROR_TIME = 3;


export const ERRORS = {
    SHORT_NAME: 'минимальная длина имени: ' + MIN_INPUT_LENGTH + ' символа',
    LONG_NAME: 'максимальная длина имени: ' + MAX_INPUT_LENGTH + ' символов',
    SHORT_TEXT: 'минимальная длина текста: ' + MIN_TEXTAREA_LENGTH + ' символов',
    LONG_TEXT: 'максимальная длина текста: ' + MAX_TEXTAREA_LENGTH + ' символов',
    BAD_NAME: 'недопустимые символы в имени'
};


export const VIEW_MODS = {
    DATE: 'date',
    RATING: 'rating',
    TREE: 'tree'
};


export const AUTHOR_REGEX = /[^a-zA-Zа-яА-Я]+/g;

export const TEXTAREA_REGEX = /\n/g;

export const COMMENT_REGEX = /<br>/g;

export const INTERACTIVE = {
    ADD_COMMENT: 'i-add-comment',
    SORT_DATE: 'i-sort-date',
    SORT_RATE: 'i-sort-rate',
    SORT_TREE: 'i-sort-tree',
    COMMENT_REPLY: 'i-comment-reply',
    COMMENT_EDIT: 'i-comment-edit',
    COMMENT_REMOVE: 'i-comment-remove',
    COMMENT_DOWN: 'i-comment-down',
    COMMENT_UP: 'i-comment-up'
};

