const Book = require('../../models/books')
mongo = require('mongodb')
module.exports = function (router) {

    // POST: Get meeting note document...
    router.post('/book', function (req, res) {
        let note = new Book(req.body)
        note.save(function (err,note) {
            if (err) {
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })



    router.get('/',(req,res)=>{
        res.send(Date.now().toString());
    })


    router.put('/update/:id', function(req, res) {
        var bookId = req.params.id;
        Book.updateOne({ _id: new mongo.ObjectId(bookId)}, req.body, function (err, result) {
            if (err) return res.status(400).json(err)
            else return res.send(result);
        });
    });

    router.delete('/delete/:id', function (req, res) {
        var id = req.params.id;      
        Book.deleteOne({ _id: new mongo.ObjectId(id) }, function (err, result) {
            if (err) return res.status(400).json(err)
            else return res.send(result);

        });        
      });

    

    router.get('/popular',(req,res)=>{
        Book.find().collation({'locale':'en'}).sort({rating:-1}).then((err,result)=>{
            if (err) return res.status(400).json(err)
            if (s==null) {
                return res.status(400).json(err)
            }
            res.send(result);
        });
    })

    router.post

    router.get('/new',(req,res)=>{
        Book.find().collation({'locale':'en'}).sort({year:-1}).then((err,result)=>{
            if (err) return res.status(400).json(err)
            if (s==null) {
                return res.status(400).json(err)
            }
            res.send(result);
        });
    })
    router.get('/collection',(req,res)=>{
        Book.find().collation({'locale':'en'}).then((err,result)=>{
            if (err) return res.status(400).json(err)
            if (s==null) {
                return res.status(400).json(err)
            }
            res.send(result);
        });
    })
    router.get('/authors',(req,res)=>{
        Book.find().collation({'locale':'en'}).sort({"author":1}).then((err,result)=>{
            if (err) return res.status(400).json(err)
            if (s==null) {
                return res.status(400).json(err)
            }
            res.send(result);
        });
    })  
    
    router.get("/search/:id",(req,res)=>{
        Book.find(
            {$or:[
                {"author":{'$regex': req.params.id,$options:'i'}},
                {"title":{'$regex': req.params.id,$options:'i'}},
                {"year":{'$regex': req.params.id,$options:'i'}},
            ]}
        ).collation({'locale':'en'}).then((err,s)=>{
            if (s==null) {
                return res.status(400).json(err)
            }
            res.send(s);
        });
        
    })

    
}