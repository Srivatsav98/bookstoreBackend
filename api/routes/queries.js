const Standup = require('../../models/books')

module.exports = function (router) {

    // POST: Get meeting note document...
    router.post('/book', function (req, res) {
        let note = new Standup(req.body)
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

    router.get('/popular',(req,res)=>{
        Standup.find().collation({'locale':'en'}).sort({rating:-1}).then((err,result)=>{
            if (err) return res.status(400).json(err)
            if (s==null) {
                return res.status(400).json(err)
            }
            res.send(result);
        });
    })

    router.get('/new',(req,res)=>{
        Standup.find().collation({'locale':'en'}).sort({year:-1}).then((err,result)=>{
            if (err) return res.status(400).json(err)
            if (s==null) {
                return res.status(400).json(err)
            }
            res.send(result);
        });
    })
    router.get('/collection',(req,res)=>{
        Standup.find().collation({'locale':'en'}).then((err,result)=>{
            if (err) return res.status(400).json(err)
            if (s==null) {
                return res.status(400).json(err)
            }
            res.send(result);
        });
    })
    router.get('/authors',(req,res)=>{
        Standup.find().collation({'locale':'en'}).sort({"author":1}).then((err,result)=>{
            if (err) return res.status(400).json(err)
            if (s==null) {
                return res.status(400).json(err)
            }
            res.send(result);
        });
    })  
    
    router.get("/:id",(req,res)=>{
        Standup.find(
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