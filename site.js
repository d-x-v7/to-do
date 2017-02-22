document.addEventListener('DOMContentLoaded', () => { /** Wrapping parent for the overall code **/
	const form = document.querySelector('.new-item');
	const container = document.querySelector('.container-items');

	const editItem = (e) => {
		const button = e.target;
		const item = button.parentNode;

		if (button.classList.contains('edit')) {
			const textContainer = item.firstElementChild; /** New "DOM" property, ignore any text, and will grab first HTML elemnt **/
			const editInput = document.createElement('input');

			editInput.type = 'text'; /** The browser default is "text", but setting it here allows some future-proofing **/
			editInput.value = textContainer.textContent;

			item.insertBefore(editInput, textContainer);
			item.removeChild(textContainer);

			button.classList.remove('edit');
			button.classList.add('save');
			button.innerHTML = '&#10004;';
		} else if (button.classList.contains('save')) {
			const input = item.querySelector('input');
			const textContainer = document.createElement('span');

			textContainer.textContent = input.value;
			item.insertBefore(textContainer, input);
			item.removeChild(input);

			button.classList.remove('save');
			button.classList.add('edit');
			button.innerHTML = '&#9998;';
		} 
	};

	const newButton = (type) => {
		const button = document.createElement('button');
		let btnHTML = null;
		let btnClass = null;
		let btnEvent = null;

		switch (type) {
		case 'edit':
			btnHTML = '&#9998;';
			btnClass = 'edit';
			btnEvent = editItem;
			break;

			case 'remove':
				btnHTML = '&#10006;';
				btnClass = 'remove';
				btnEvent = removeItem;
				break;
		}

		button.innerHTML = btnHTML;
		button.classList.add(btnClass);
		button.addEventListener('click', btnEvent);

		return button;
	};

	const removeItem = (e) => {
		const item = e.target.parentNode;

		container.removeChild(item); /** Removes the "Child" and allows the "X" to remove the item **/
	};

	const addItem = (e) => { /** Putting everything in this function addItem allows it to be scalable instead of needing to copy and past to repeat**/
		e.preventDefault();

		const input = form.querySelector('[name="item"]');
		const newItem = document.createElement('p');
		const text = input.value;
		const textContainer = document.createElement('span');
		const removeBtn = newButton('remove');
		const editBtn = newButton('edit');

		textContainer.textContent = text; 
		newItem.appendChild(textContainer);
		newItem.appendChild(editBtn);
		newItem.appendChild(removeBtn);

		container.appendChild(newItem);

		input.value = null; /** Could put an empty string, but this makes it possible to produce a list item with a unique name **/
	};

	form.addEventListener('submit', addItem);
});
