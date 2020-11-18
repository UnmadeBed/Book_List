// Book constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
	const list = document.getElementById('book-list');
	// Create element
	const row = document.createElement('tr');
	// Insert cols
	row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

	list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function(message, className) {
	// Create div
	const div = document.createElement('div');
	// Add classes
	div.className = `alert ${className}`;
	// Add text
	div.appendChild(document.createTextNode(message));
	// Get parent
	const container = document.querySelector('.container');
	// Get form
	const form = document.querySelector('#book-form');
	// Insert alert
	container.insertBefore(div, form);

	// time out after 3 secs
	setTimeout(function() {
		document.querySelector('.alert').remove();
	}, 3000);
};

// Clear fields
UI.prototype.clearFields = function() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
};

// Event listeners
document.getElementById('book-form').addEventListener('submit', function(e) {
	// Get form values from submit
	const title = document.getElementById('title').value,
		author = document.getElementById('author').value,
		isbn = document.getElementById('isbn').value;

	// Instantiate book
	const book = new Book(title, author, isbn);

	// Instantiate UI object
	const ui = new UI();

	// Validate
	if (title === '' || author === '' || isbn === '') {
		// Error alert
		ui.showAlert('Please fill in all fields', 'error');
	} else {
		// Add book to list
		ui.addBookToList(book);
		// Show success
		ui.showAlert('Book added!', 'success');
		// Clear fields
		ui.clearFields();
	}

	e.preventDefault();
});
