const {userModal, bookModal} = require("../modals");

//dto
const IssuedBook = require("../dto/book-dto");

exports.getAllBooks  = async (req, res) => { 
    const books =  await bookModal.find();
    if(books.length === 0){
        return res.status(404).json({
            success: false,
            message: "No books available"
        })
    }
    return res.status(200).json({
        success: true,
        data: books
    })
}

exports.getSingleBookId = async (req, res) => { 
    const {id} = req.params;
    const book = await bookModal.findById(id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: "Not present"
        })

        return res.status(200).json({
            success: true,
            data: book
        })
    }

}

exports.getAllIssuedBooks = async (req, res) => {
    const users = await userModal.find({
        issuedBook: {$exists: true},
    }).populate("issuedBook");

    const issuedBooks = users.map((each) => new IssuedBook(each))
    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message: "Not present"
        })

        return res.status(200).json({
            success: true,
            data: issuedBooks
        })
    }
}

exports.addNewBook = async (req, res) => {
    const {data} = req.body;

    if(!data){
        return res.status(404).json({
            success: false,
            message: "No Data, Kindly add the book details"
        })
    }
    await bookModal.create(data);

    const allBooks = await bookModal.find();
   
    return res.status(200).json({
        success: true,
        data: allBooks
    })
}

exports.updateBookById = async (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const updateBook = await bookModal.findOneAndUpdate({
        _id: id,
    } ,
     data, {
        new: true, 
    })   
    return res.status(200).json({
        success: true,
        data: updateBook
    })

}

//below APIs are exported separately
// module.exports = {getAllBooks, getSingleBookId }


// exports.getAllBooks = () => { }
// exports.getSingleBookId = () => { }