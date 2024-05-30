const express = require('express')
const  cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");

const port = 3000


app.post("/todo", async function(req,res){
   const createPayload = req.body;
   const parsedPayload = createTodo.safeParse(createPayload)

   if(!parsedPayload.success){
    res.status(411).json({
        msg:"you sent the wrong inputs"
    })
    return 
   }
   // put it in mongodb 

   await todo.create({
    title:createPayload.title,
    description :createPayload.description,
    completed : false
   })

   res.json({
    msg:"tood created successfully"
   })

})

app.get("/todos",async function(req,res){
   
   const todos =  await todo.find({})
   res.json({
       todos : todos
   })
})

app.put("/completed", async function(req,res){
      const updatePaload = req.body;
      const parsedPayload = updateTodo.safeParse(updatePaload);

      if(!parsedPayload.success){
        res.status(411).json({
            msg: "you sent the wrong inputs"
        })
        return 
      }

      await todo.findByIdAndUpdate({
        _id: req.body.id
    }, {
      completed: true  
    })

    res.json({
        msg: "Todo marked as completed"
    })
})

app.listen(3000)