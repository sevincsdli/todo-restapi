const Todo = require("../models/todoSchema.js")

const todoAdd =async (req, res) => {
    const {name,description}=req.body
    try {
        const todoname = await Todo.findOne({name})
        if (todoname) {
            return res.status(400).json({
                success: false,
                message:"This todo already exsits"
            })
        }

        const todoAdd = new Todo({
            name: name,
            description:description
        })

        await todoAdd.save()
            .then(() => {
                return res.status(200).json({ message:"Todo added",todoAdd})
            })
            .catch((err) => {
                return res.status(400).json({
                    success: false,
                    message: "Todo can not saved " + err
                })
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Network: Todo can not saved ",error
        })
    }
}

const todoGetAll = async (req, res) => {
    const { page } = req.query
    const limit = 2
    const skip = Number(page - 1) * limit 
    try {
        const todoGetAll = await Todo.find({}).limit(limit).skip(skip)
        return res.status(200).json({
            success: true,
            data: todoGetAll
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Can not get all todo" ,error
        })
    }
}

const todoUpdate = async (req, res) => {
    const {name,description}=req.body
    const { id } = req.params
    try {
        const todoUpdate = await Todo.findByIdAndUpdate(id, { name, description } )
        if (todoUpdate) {
            return res.status(200).json({
                success: true,
                message: "Updated!"
            })
        }
        else return res.status(400).json({
            success: false,
            message: "can not updated"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "can not updated"
        })
    }
}

const todoDelete = async (req, res) => {
    const { id } = req.params
    
    try {
        const todoDelete = await Todo.findByIdAndDelete(id)
        if (todoDelete) {
            return res.status(200).json({
                success: true,
                message: "Todo deleted"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Can not deleted"
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Can not deleted " + error
        })
    }


}

const todoGet = async (req, res) => {
    try {
        

        const { id } = req.params
        const todoGet = await Todo.findById(id)
        if (todoGet) {
            return res.status(200).json(todoGet)
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Not find this todo"
            })
        }

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Network:Not find this todo"
        })
    }

}

module.exports = {
    todoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete,
    todoGet
}