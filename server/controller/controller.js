var userdb = require('../model/model');

// create and save new user
exports.create = (req, res)=>{
    //validate the request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    //new user
    const user = new userdb({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        membership: req.body.membership,
        membershipvalidupto: req.body.membershipvalidupto,
    });

    //save user to the database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while saving your data"
            });
        });
}

//retrieve and return all users/ retrieve and return single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id
        userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Member not found with the id "+id})
                }
                else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error occured while finding the member with id "+id})
            })
    }
    else{
        userdb.find()
        .then(user =>{
            res.send(user);
        })
        .catch(err =>{
            res.status(500).send({message:err.message || "Error occured while retriving information"});
        })
    }
}

//update a new identified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "Data to be updated cannot be empty"})
    }

    const id = req.params.id

    userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data =>{
        if(!data){
            res.status(404).send({message: `Cannot update member with id ${id}, user not found`})
        }
        else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message:"Error updating information"})
    })
}

//delete a user with specified user id
exports.delete = (req,res)=>{
    const id = req.params.id
    userdb.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message:`Couldn't find user with ${id}, id may be wrong`})
            }
            else{
                res.send({message:"Data deleted successfully"})
            }
        })
        .catch(err =>{
            res.status(500).send({message:`Couldn't find the user with ${id}`})
        })
}