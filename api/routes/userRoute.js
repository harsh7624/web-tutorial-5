const express = require("express");

const userobj = require("../database/users");
const { v4: uuidv4 } = require('uuid');


const router = express.Router();

router.get("" , (req,res) => {
    try {
        if(userobj && userobj.length > 0){
            console.log("userobj: "+userobj);
            return res.status(200).json({message : "Users retrieved", success: true, users:userobj })
        } else {
            return res.status(200).json({error : "No users exist", success: true, users: [] })
        }
    } catch (err){
        return res.status(500).json({message : "Internal server error", success: false })
    }


})

router.get("/user/:id" , (req,res) => {

    try {
        let flag = false;
        if(req.params.id){
            userobj.map(function (user){
                if(req.params.id == user.id) {
                    flag = true;
                    return res.status(200).json({message : "User updated", success: true, user: user })
                }
            })
        } else {
            return res.status(400).json({message : "No id found", success: false })
        }
        if(!flag){
            return res.status(200).json({message : "No user found with given id", success: true, user: {} })
        }
    } catch (err){
        return res.status(500).json({message : "Internal server error", success: false });
    }
    // return res.status(200).json({message : "Users retrieved", success: true, users:userobj })
})

router.put("/update/:id" , (req,res) => {
    console.log("req",req.params.id);
    console.log("req.body" + req.body.email);
    let flag = false;
    try{
        if(req && req.body && req.params.id){

            userobj.map(function (user){
                if(user.id == req.params.id){
                    flag = true;
                    if(req.body.email){
                        user.email = req.body.email;
                    }
                    if(req.body.firstName){
                        user.firstName = req.body.firstName;
                    }
                    console.log(user);
                    // userobj.concat(user);

                    console.log("useobjg" , userobj);

                    return res.status(200).json({message : "User updated", success: true })
                }
            })
            if(!flag){
                return res.status(200).json({error : "User with id does not exist", success: false })
            }
        }


    } catch (err){
        return res.status(500).json({message : "Internal server error", success: false });
    }

})

router.post("/add" , (req,res) => {
    console.log("req",req.params.id);
    console.log("req",req.body.email);
    console.log("req",req.body.firstname);

    try{
        console.log("LINE 89");
        let string  = uuidv4();
        console.log("string: "+string);
        if(req && req.body && req.body.email && req.body.firstname){
            let temp = {
                "id": uuidv4(),
                "email": req.body.email,
                "firstname": req.body.firstname
            }
            userobj.push(temp);

            userobj.map(function (user){
                console.log("asfd: ",user);
            })
            return res.status(200).json({message : "User added", success: true });
        } else {
            return res.status(400).json({message : "FirstName or email missing ", success: true })
        }

    } catch (err){
        return res.status(500).json({message : "Internal server error", success: false });
    }


})



module.exports = router;

