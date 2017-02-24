document.addEventListener('DOMContentLoaded', () => { /** Wrapping parent for the overall code **/
	const form = document.querySelector('.new-item');
	const container = document.querySelector('.container-items');

	const filterLabel = document.createElement('label');
	const filterCheckbox = document.createElement('input');

	filterCheckbox.type = 'checkbox';

	filterLabel.textContent = 'Hide Completed';
	filterLabel.appendChild(filterCheckbox);

	document.querySelector('main').insertBefore(filterLabel, form);

	const items = JSON.parse(localStorage.getItem('items')) || []; /** Allows local to save content on website — unless browser is reset **/

	const filterItems = (e) => {
		const allItems = document.querySelector('.container-items').children;
		const isChecked = e.target.checked;

		for (const item of allItems) {
				if (isChecked) {
					if (item.classList.contains('done')) {
						item.style.display = 'none';
				} else {
					item.style.display = '';
				}
			} else {
				item.style.display = '';
			}
		}
	};

	filterCheckbox.addEventListener('change', filterItems);


	const enterCheck = (e) => {
		const input = e.target; /** Research what "target" means**/

		if (e.keyCode === 13) {
			save(input.nextSibling, input.parentNode);
		}
	};

	const edit = (button, item) => {
		const textContainer = item.firstElementChild; /** New "DOM" property, ignore any text, and will grab first HTML elemnt **/
		const editInput = document.createElement('input');

		editInput.type = 'text'; /** The browser default is "text", but setting it here allows some future-proofing **/
		editInput.value = textContainer.textContent;
		editInput.addEventListener('keyup', enterCheck); /** Makes it so when a user presses "enter" it saves**/

		item.insertBefore(editInput, textContainer);
		item.removeChild(textContainer);

		button.classList.remove('edit');
		button.classList.add('save');
		button.innerHTML = '&#10004;';
	};

	const save = (button, item) => {
		const input = item.querySelector('input');
			const textContainer = document.createElement('span');

			textContainer.textContent = input.value;
			item.insertBefore(textContainer, input);
			item.removeChild(input);

			button.classList.remove('save');
			button.classList.add('edit');
			button.innerHTML = '&#9998;';
	};

	const editItem = (e) => {
		const button = e.target;
		const item = button.parentNode;

		if (button.classList.contains('edit')) {
			edit(button, item);
		} else if (button.classList.contains('save')) {
			save(button, item);
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

	const toggleCompletion = (e) => {
		const checkbox = e.target;
		const isChecked = checkbox.checked; /** "is" indicates that it will be a boolean and be true or false **/
		const item = checkbox.parentNode.parentNode;

		item.classList.toggle('done', isChecked);
	};

	const addItem = (e) => { /** Putting everything in this function addItem allows it to be scalable instead of needing to copy and past to repeat**/
		e.preventDefault();

		const input = form.querySelector('[name="item"]');
		const newItem = document.createElement('p');
		const text = input.value;
		const textContainer = document.createElement('span');
		const removeBtn = newButton('remove');
		const editBtn = newButton('edit');
		const label = document.createElement('label');
		const checkbox = document.createElement('input');

		checkbox.type = 'checkbox';
		checkbox.addEventListener('change', toggleCompletion);

		label.textContent = 'Done';
		label.appendChild(checkbox);

		textContainer.textContent = text; 
		newItem.appendChild(textContainer);
		newItem.appendChild(editBtn);
		newItem.appendChild(removeBtn);
		newItem.appendChild(label);

		container.appendChild(newItem);

		input.value = null; /** Could put an empty string, but this makes it possible to produce a list item with a unique name **/

		const storedItem = {
			text, 
			done: false,
		};
		items.push(storedItem);
		localStorage.setItem('items', JSON.stringify(items));
	};

	form.addEventListener('submit', addItem);
});
