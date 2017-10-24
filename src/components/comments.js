export default class Comments{
	constructor(dom, data){

		this._data = data;
		this._dom = dom;

		data = Comments.transformData( data );

		data.forEach( comment => this.addComment( comment ) );
	}

    /**
	 * Метод преобразовывает массив для построения вложенности
     * @param data
     * @returns {Array}
     */
	static transformData(data){
        return Comments.rollDownData( Comments.setLevels( Comments.rollUpData(data) ) );
	}

    /**
	 * Сворачиваем список для построения дерева
     * @param arr
     * @returns {*}
     */
    static rollUpData(arr){
		arr.forEach( item => {

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
	 * Добавление комментария в DOM-дерево
     * @param data
     */
	addComment( data ){
		let newDiv = document.createElement('div');
		newDiv.className = 'comment';
		newDiv.id = data.id;
		newDiv.innerHTML =
			`<div class="comment__author">${data.author}:</div>` +
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

        newDiv.style.marginLeft = data._level * 50 + 'px';

        data.view = {
            block: newDiv,
            editBtn: newDiv.querySelector('.comment__edit'),
            removeBtn: newDiv.querySelector('.comment__remove'),
            replyBtn: newDiv.querySelector('.comment__reply'),
            rating: newDiv.querySelector('.comment__rating'),
            ratingDown: newDiv.querySelector('.comment__down'),
            ratingUp: newDiv.querySelector('.comment__up'),
            text: newDiv.querySelector('.comment__text')
        };


		data.editListener = (...args) => this.editComment(...args);
		data.removeListener = (...args) => this.removeComment(...args);
		data.replyListener = (...args) => this.replyComment(...args);
        data.ratingDownListener = (...args) => this.ratingDown(...args);
        data.ratingUpListener = (...args) => this.ratingUp(...args);

        data.view.editBtn.addEventListener('click', data.editListener);
        data.view.removeBtn.addEventListener('click', data.removeListener);
        data.view.replyBtn.addEventListener('click', data.replyListener);
        data.view.ratingDown.addEventListener('click', data.ratingDownListener);
        data.view.ratingUp.addEventListener('click', data.ratingUpListener);

		this._dom.appendChild(newDiv);
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
			newTextBlock.value = commentData.text;
		} else {
			// Замена <textarea> на <div> и сохраниене значения из <textarea>
			commentData.text = text.value;
			newTextBlock = document.createElement('div');
			newTextBlock.innerHTML = commentData.text;
		}

		newTextBlock.className = 'comment__text';

		block.removeChild(commentData.view.text);
		block.insertBefore(newTextBlock, block.children[1]);

        commentData.view.text = newTextBlock;
	}


    /**
	 * Удалить комментарий
     * @param e
     */
	removeComment(e){
		let commentData = this.findComment(e);

		let {editBtn, removeBtn, replyBtn, ratingDown, ratingUp, block} = commentData.view;

		// Ремувим хэндлеры, чтобы не висели в замыкании
        editBtn.removeEventListener('click', commentData.editListener);
        removeBtn.removeEventListener('click', commentData.removeListener);
        replyBtn.removeEventListener('click', commentData.replyListener);
        ratingDown.removeEventListener('click', commentData.ratingDownListener);
        ratingUp.removeEventListener('click', commentData.ratingUpListener);

        // Удаляем блок из DOM-дерева
		this._dom.removeChild( block );

		// Удаляем данные из модели
		this._data = this._data.filter( obj => obj !== commentData );
	}


    /**
     * Добавить комментарий
     * @param e
     */
	replyComment(e){
        console.log(this.findComment(e));
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
	}


    /**
	 * Уменьшение рейтинга
     * @param e
     */
    ratingDown(e){
        let commentData = this.findComment(e);
        Comments.removeRatingCtrl( commentData, 'down' );
	}

}