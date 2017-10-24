const someCommentTemplate =
			'<div class="comment__author"></div>'+
			'<div class="comment__text"></div>'+
			'<div class="comment__controls">'+
				'<div class="comment__edit"></div>'+
				'<div class="comment__remove"></div>'+
			'</div>';


export default class Comments{
	constructor(dom, data){

		this._data = data;
		this._dom = dom;

		data.forEach( comment => this.addComment( comment ) );
	}

	get data(){
		return this._data;
	}


	view(){

	}


	addComment( data ){

		let newDiv = document.createElement('div');
		newDiv.className = 'comment';
		newDiv.id = data.id;
		newDiv.innerHTML =
			`<div class="comment__author">${data.author}</div>` +
			`<div class="comment__text">${data.text}</div>` +
			'<div class="comment__controls">'+
				'<div class="comment__edit">edit</div>'+
				'<div class="comment__remove">remove</div>'+
			'</div>';

		let editBtn = newDiv.querySelector('.comment__edit');
		let removeBtn = newDiv.querySelector('.comment__remove');
		let text = newDiv.querySelector('.comment__text');


		data.editListener = (...args)=>{
			this.editComment(...args);
		};
		data.removeListener = (...args)=>{
			this.removeComment(...args);
		};

		editBtn.addEventListener('click', data.editListener);
		removeBtn.addEventListener('click', data.removeListener);

		data.view = {
			block: newDiv,
			editBtn,
			removeBtn,
			text
		};

		this._dom.appendChild(newDiv);
	}


	editComment(e){
		let commentData = this.findComment(e);

		commentData.editStatus = !commentData.editStatus;

		commentData.view.editBtn.innerHTML = commentData.editStatus ? 'save' : 'edit';

		let textBlock;
		if(commentData.editStatus){
			textBlock = document.createElement('textarea');
			textBlock.value = commentData.text;
		} else {
			commentData.text = commentData.view.text.value;
			textBlock = document.createElement('div');
			textBlock.innerHTML = commentData.text;
		}

		textBlock.className = 'comment__text';

		commentData.view.block.removeChild(commentData.view.text);
		commentData.view.block.insertBefore(textBlock, commentData.view.block.children[1]);

		commentData.view.text = textBlock;
	}



	removeComment(e){
		let commentData = this.findComment(e);

		commentData.view.editBtn.removeEventListener('click', commentData.editListener);
		commentData.view.removeBtn.removeEventListener('click', commentData.removeListener);

		this._dom.removeChild( commentData.view.block );

		this._data = this._data.filter( obj => obj !== commentData );
	}


	findComment(e){
		let commentDiv = e.path.filter( node => node.className === 'comment' )[0];
		let commentData = this.data.filter( obj => obj.view.block === commentDiv )[0];

		return commentData;
	}
}