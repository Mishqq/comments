export const defaultData = [
    {id: 0, parentId: null, author: 'Nick', text: 'Nick first comment', rating: 3},
    {id: 1, parentId: null, author: 'Rick', text: 'Rick first comment', rating: 22},
    {id: 2, parentId: 0, author: 'Jane', text: 'Jane comment', rating: 12},
    {id: 3, parentId: 2, author: 'Nick', text: 'Nick comment', rating: -3},
    {id: 4, parentId: 0, author: 'Tom', text: 'Tom comment', rating: 1},
    {id: 5, parentId: 1, author: 'Jane', text: 'Jane comment', rating: 0}
];