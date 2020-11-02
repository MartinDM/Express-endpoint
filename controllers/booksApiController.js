function booksApiController(Book) {
 
  // Revealing module pattern
  function post(req, res) {
    const book = new Book(req.body);
    if (!req.body.title){
      res.status(400)
      return res.send('Title is required')
    }
    book.save();
    // 'Created' status
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    const query = {};
    if( req.query.genre ) {
        query.genre = req.query.genre;
    }
    Book.find( query, (err, books) => {
        if (err) {
            return res.send(err)
        }
        const returnedBooks = books.map( (book) => {
          const newBook = book.toJSON();
          newBook.links = {};
          // Provide a link to the id of the book result
          newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
          return newBook;
        });
        return res.json(returnedBooks);
    });
  };
  // Expose these functions to the app
  return { post, get };
}

module.exports = booksApiController;