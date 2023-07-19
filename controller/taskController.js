const db=require('../model/dbConnection')
const Task=db.tasks

exports.showAllTask=async (req,res)=>{
    const tasks=await Task.findAll()
    res.render('some',{tasks:tasks})
}

exports.addTask=async (req,res)=>{
    const{task,dueDate}=req.body
    // const formattedDueDate=new Date(dueDate).toString()
    const data={
        task:task,
        due_date:new Date(dueDate).toString()
    }
    if(new Date(dueDate)<new Date()){
        data.status="Missed"
    }
    await Task.create(data)
    res.redirect('/')
}

exports.showMissedTask= async (req,res)=>{
    const tasks=await Task.findAll({
        where:{
            status:"Missed",
        }
    })
    res.render('some',{tasks:tasks})
}

exports.showPendingTask= async (req,res)=>{
    const tasks=await Task.findAll({
        where:{
            status:"Pending",
        }
    })
    res.render('some',{tasks:tasks})
}

exports.showCompletedTask= async (req,res)=>{
    const tasks=await Task.findAll({
        where:{
            status:"Completed",
        }
    })
    res.render('some',{tasks:tasks})
}

exports.completeTask=async (req,res)=>{
    const taskId=req.params.taskId
    const completeTask=await Task.update({
        status:"Completed"
    },{
        where:{
            id:taskId
        }
    })

    res.redirect('/')
}

exports.deleteTask=async (req,res)=>{
    const taskId=req.params.taskId
    const deleteTask=await Task.destroy({
        where:{
            id:taskId
        }
    })
    res.redirect('/')
}