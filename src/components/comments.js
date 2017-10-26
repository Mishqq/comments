import {
    MIN_INPUT_LENGTH,
    MAX_INPUT_LENGTH,
    MIN_TEXTAREA_LENGTH,
    MAX_TEXTAREA_LENGTH,
    ADD_COMMENT_ERROR_TIME,
    VIEW_MODS,
    ERRORS,
    AUTHOR_REGEX,
    TEXTAREA_REGEX,
    COMMENT_REGEX
} from '../defs';

const localStorage = window.localStorage;

export default class Comments{
	constructor(dom, originData){
	    this._originData = JSON.parse(localStorage.getItem('data')) || originData;

	    if(!localStorage.getItem('data')){
            localStorage.setItem('data', JSON.stringify(this._originData));
        }

        this._dateReverse = false;
        this._ratingReverse = false;

		this._dom = dom;

        this.transformDOM();
        this.initTree();
	}

    /**
	 * Метод преобразовывает массив для построения вложенности
     * @param data
     * @returns {Array}
     */
	static transformToTreeData(data){
        return Comments.rollDownData( Comments.setLevels( Comments.rollUpData(data) ) );
	}

    /**
	 * Сворачиваем список для построения дерева
     * @param arr
     * @returns {*}
     */
    static rollUpData(arr){
		arr.forEach( item => {

            if(item.children) item.children = null;

			if(item.parentId !== null) {

				let parentItem = arr.filter( parentItem => parentItem.id === item.parentId )[0];

				if(!parentItem.children) parentItem.children = [];
                parentItem.children.push( item );

			}

		});

        arr = arr.filter( item => item.parentId === null );

        return arr;
	}

    /**
	 * Проставляем уровни смещения (вложенности)
     * @param arr
     * @returns {*}
     */
    static setLevels(arr){

    	let forEachRecur = (arr, idx) => {
            arr.forEach( item => {
            	item._level = idx;
            	if(item.children && item.children.length) forEachRecur(item.children, idx+1);
			})
		};
        forEachRecur(arr, 0);

        return arr;
	}

    /**
	 * Разваорачиваем дерево в одномерный массив
     * @param arr
     * @returns {Array}
     */
    static rollDownData(arr){

		let result = [];

        let forEachRecur = (arr) => {
            arr.forEach( item => {
                result.push(item);
                if(item.children && item.children.length) forEachRecur(item.children);
            })
        };
        forEachRecur(arr);

		return result;
	}

    /**
	 * Изменение рейтига
     * @param obj
     * @param flag
     */
    static removeRatingCtrl(obj, flag){
        let {ratingUp, ratingDown, rating} = obj.view;

        obj._raited = true;
        flag === 'up' ? obj.rating++ : obj.rating--;

        rating.innerHTML = obj.rating;
        ratingUp.remove();
        ratingDown.remove();
    }


    /**
     *
     */
    initTree(){
        if(!this._viewType) this._viewType = VIEW_MODS.TREE;

        this._data = [];
        this._originData.forEach( item => {
            let obj = {};
            for(let key in item) obj[key] = item[key];
            this._data.push( obj )
        } );
        this._replyCommentId = null;

    	let list = this._dom.querySelector('.comment-list');
        list.innerHTML = '';

        switch(this._viewType){
            case VIEW_MODS.TREE:
                this._data = Comments.transformToTreeData( this._data );
                break;
            case VIEW_MODS.RATING:
	            this._data = this._data.filter( item => item._status !== 'deleted');
                this._data.sort( (a, b) => this._ratingReverse ? a.rating < b.rating : a.rating > b.rating );
                break;
            case VIEW_MODS.DATE:
	            this._data = this._data.filter( item => item._status !== 'deleted');
                this._data.sort( (a, b) => this._dateReverse ?
                    new Date(a.date) < new Date(b.date) :
                    new Date(a.date) > new Date(b.date)
                );
                break;
        }

        this._data.forEach( comment => this.addComment( comment ) );
	}


    /**
     *
     */
    transformDOM(){
        let cList = document.createElement('div'),
            sort = document.createElement('ul'),
            addCForm = document.createElement('div'),
			form = document.createElement('div');
        cList.className = 'comment-list';
        sort.className = 'comment-sort';
        addCForm.className = 'comment-add-form';
        form.className = 'add-from';

        this._addCForm = {};
        this._sort = {};

        this._dom.appendChild( this._sort.view = sort );
        this._dom.appendChild( this._cList = cList );
        this._dom.appendChild( this._addCForm.view = addCForm );

        // Форма добавления комментария
        form.innerHTML =
            `<div class="add-from__author"><input type="text"></div>` +
            `<div class="add-from__text"><textarea></textarea></div>` +
            `<div class="add-from__error"></div>` +
            `<div class="add-from__add">Добавить</div>`;

        this._addCForm.view.appendChild( form );
        this._addCForm.addBtn = form.querySelector('.add-from__add');
        this._addCForm.error = form.querySelector('.add-from__error');
        this._addCForm.textarea = form.querySelector('.add-from__text textarea');
        this._addCForm.author = form.querySelector('.add-from__author input');

        this._addCForm.addBtn.addEventListener('click', (...args) => { this.addCommentToEnd(...args) });

        // Панель сортировки
        sort.innerHTML =
            `<li class="comment-sort__item">Сортировать: </li>`+
            `<li class="comment-sort__item"><a id="sortDate" href="#">по дате</a></li>`+
            `<li class="comment-sort__item"><a id="sortRating" href="#">по рейтингу</a></li>`+
            `<li class="comment-sort__item"><a id="treeMode" href="#">в виде дерева</a></li>`;

        this._sort.dateSort = sort.querySelector('#sortDate');
        this._sort.rateSort = sort.querySelector('#sortRating');
        this._sort.treeMode = sort.querySelector('#treeMode');

        this._sort.dateSort.addEventListener('click', (e) => { this.sortComments(e, VIEW_MODS.DATE) });
        this._sort.rateSort.addEventListener('click', (e) => { this.sortComments(e, VIEW_MODS.RATING) });
        this._sort.treeMode.addEventListener('click', (e) => { this.sortComments(e, VIEW_MODS.TREE) });
	}


    /**
	 * Добавление комментария в DOM-дерево
     * @param data
     */
	addComment( data ){
		let newDiv = document.createElement('div');
		newDiv.className = 'comment';
		newDiv.id = data.id;

		let date = new Date(data.date);
        date =
            '<b>' + (date.getDate()+1) + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + '</b>' + ' ' +
            '(' + date.getHours() + ':' + date.getMinutes() + ')';


	    newDiv.style.marginLeft = data._level * 50 + 'px';

        if(data._status === 'deleted'){
	        newDiv.innerHTML = 'Сообщение удалено';
	        data.view = {block: newDiv};
	        this._cList.appendChild(newDiv);
	        return false
        }

		newDiv.innerHTML =
			`<div class="comment__author">${data.author}:</div>` +
            `<div class="comment__date">${date}</div>` +
			`<div class="comment__text">${data.text}</div>` +
			`<div class="comment__controls">`+
            	`<div class="comment__reply">reply</div>`+
				`<div class="comment__edit">edit</div>`+
				`<div class="comment__remove">remove</div>`+
			`</div>`+
			`<div class="comment__info">`+
				`<div class="comment__down">-</div>`+
				`<div class="comment__rating">${data.rating}</div>`+
				`<div class="comment__up">+</div>`+
            `</div>`;

        data.view = {
            block: 			newDiv,
            editBtn: 		newDiv.querySelector('.comment__edit'),
            removeBtn: 		newDiv.querySelector('.comment__remove'),
            replyBtn: 		newDiv.querySelector('.comment__reply'),
            rating: 		newDiv.querySelector('.comment__rating'),
            ratingDown: 	newDiv.querySelector('.comment__down'),
            ratingUp: 		newDiv.querySelector('.comment__up'),
            text: 			newDiv.querySelector('.comment__text')
        };

		data.editListener = 		(...args) => this.editComment(...args);
		data.removeListener = 		(...args) => this.removeCommentHandler(...args);
		data.replyListener = 		(...args) => this.replyComment(...args);
        data.ratingDownListener = 	(...args) => this.ratingDown(...args);
        data.ratingUpListener = 	(...args) => this.ratingUp(...args);

        data.view.editBtn.addEventListener('click', data.editListener);
        data.view.removeBtn.addEventListener('click', data.removeListener);
        data.view.replyBtn.addEventListener('click', data.replyListener);
        data.view.ratingDown.addEventListener('click', data.ratingDownListener);
        data.view.ratingUp.addEventListener('click', data.ratingUpListener);

        this._cList.appendChild(newDiv);
	}


    /**
	 * Добавление комментария в конец дерева
     */
    addCommentToEnd(){
    	let {textarea, author} = this._addCForm;

        this.hideError();

        if(author.value.length < MIN_INPUT_LENGTH) this.viewError(ERRORS.SHORT_NAME);
        if(author.value.length > MAX_INPUT_LENGTH) this.viewError(ERRORS.LONG_NAME);
        if(textarea.value.length < MIN_TEXTAREA_LENGTH) this.viewError(ERRORS.SHORT_TEXT);
        if(textarea.value.length > MAX_TEXTAREA_LENGTH) this.viewError(ERRORS.LONG_TEXT);
        if(AUTHOR_REGEX.test(author.value)) this.viewError(ERRORS.BAD_NAME);

        if(!this._errorView){
            this.hideError();

            let idArr = this._originData.map( item => item.id ).sort( (a, b) => a > b );

            let lastId = idArr.length ? idArr[ idArr.length-1 ] : 1;

            console.log('lastId ➥', lastId);

            this._originData.push({
                id: lastId+1,
                parentId: this._replyCommentId || null,
                author: author.value,
                text: textarea.value = textarea.value.replace(TEXTAREA_REGEX, '<br/>'),
                rating: 0,
                date: new Date()
            });

            localStorage.setItem('data', JSON.stringify(this._originData));

            author.value = '';
            textarea.value = '';

            this.initTree();
        }
	}


    /**
     * @param text
     */
    viewError(text){
        let {error} = this._addCForm;

        this._errorView = true;

        if(!error.innerHTML) error.innerHTML = 'Ошибка: ';

        error.innerHTML += '<br />' + text;
    };

    /**
     */
    hideError(){
        let {error} = this._addCForm;

        this._errorView = false;

        error.innerHTML = '';
    }


    /**
	 * Меняем режим сохранить/редактировать
     * @param e
     */
	editComment(e){
		let commentData = this.findComment(e);

		commentData.editStatus = !commentData.editStatus;

		let {editBtn, block, text} = commentData.view,
            newTextBlock;

		// Меняем текст кнопки редактировать/сохранить
        editBtn.innerHTML = commentData.editStatus ? 'save' : 'edit';

		if(commentData.editStatus){
			// Создание <textarea> и установка значения из модели
			newTextBlock = document.createElement('textarea');
			newTextBlock.value = commentData.text.replace(COMMENT_REGEX, '\n');
		} else {

            if(text.value.length < MIN_TEXTAREA_LENGTH) {
                text.value = 'Ок. Это пустой комментарий';
            }

			// Замена <textarea> на <div> и сохраниене значения из <textarea>
			commentData.text = text.value.substr(0, MAX_TEXTAREA_LENGTH);
			newTextBlock = document.createElement('div');

			let string = commentData.text.replace(TEXTAREA_REGEX, '<br>');
            string = string.substr(0, MAX_TEXTAREA_LENGTH);

			newTextBlock.innerHTML = string;

            this._originData.forEach( item => {
                if(item.id === commentData.id) item.text = string;
            });
		}

		newTextBlock.className = 'comment__text';

		block.removeChild(commentData.view.text);
		block.insertBefore(newTextBlock, block.children[1]);

        commentData.view.text = newTextBlock;


        localStorage.setItem('data', JSON.stringify(this._originData));
	}


    /**
     *
     * @param e
     */
    removeCommentHandler(e){
		this.removeComment( this.findComment(e) );
	};


    /**
	 * Удалить комментарий
     * @param commentData
     */
	removeComment(commentData){
		let {editBtn, removeBtn, replyBtn, ratingDown, ratingUp, block} = commentData.view;

		// Ремувим хэндлеры, чтобы не висели в замыкании
        editBtn.removeEventListener('click', commentData.editListener);
        removeBtn.removeEventListener('click', commentData.removeListener);
        replyBtn.removeEventListener('click', commentData.replyListener);
        ratingDown.removeEventListener('click', commentData.ratingDownListener);
        ratingUp.removeEventListener('click', commentData.ratingUpListener);

        // Удаляем блок из DOM-дерева
        //this._cList.removeChild( block );

		// Удаляем данные из модели
		//this._data = this._data.filter( obj => obj !== commentData );
	    commentData._status = 'deleted';
	    commentData.view.block.innerHTML = 'Сообщение удалено';

		// this._originData = this._data.filter( obj => obj.id !== commentData.id );
		this._originData.forEach( obj => {
			if(obj.id === commentData.id) obj._status = 'deleted';
		});
        localStorage.setItem('data', JSON.stringify(this._originData));
	}


    /**
     *
     */
    removeComments(){
        this._data.forEach( item => this.removeComment( item ) );
	}


    /**
     * Добавить комментарий
     * @param e
     */
	replyComment(e){
        let replyComment = this.findComment(e);

        this._replyCommentId = replyComment.id;
	}


    /**
	 * Поиск объекта в модели по DOM-элементу
     * @param e
     */
	findComment(e){
		let commentDiv = e.path.filter( node => node.className === 'comment' )[0];

		return this._data.filter( obj => obj.view.block === commentDiv )[0];
	}


    /**
	 * Увеличение рейтинг
     * @param e
     */
	ratingUp(e){
        let commentData = this.findComment(e);
        Comments.removeRatingCtrl( commentData, 'up' );

        let obj = this._originData.find( item => item.id === commentData.id );
        obj.rating +=1;

        localStorage.setItem('data', JSON.stringify(this._originData));

        this.initTree();
	}


    /**
	 * Уменьшение рейтинга
     * @param e
     */
    ratingDown(e){
        let commentData = this.findComment(e);
        Comments.removeRatingCtrl( commentData, 'down' );

        let obj = this._originData.find( item => item.id === commentData.id );
        obj.rating -=1;

        localStorage.setItem('data', JSON.stringify(this._originData));

        this.initTree();
	}


    /**
     *
     * @param e
     * @param sortType
     */
    sortComments(e, sortType){
        e.preventDefault();

        switch(sortType){
            case VIEW_MODS.DATE:
                this._dateReverse = !this._dateReverse;
                break;
            case VIEW_MODS.RATING:
                this._ratingReverse = !this._ratingReverse;
                break;
        }

        this._viewType = sortType;

        this.initTree();
    }
}