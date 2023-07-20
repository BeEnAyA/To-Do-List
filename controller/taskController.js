const db=require('../model/dbConnection')
const Task=db.tasks

exports.showAllTask=async (req,res)=>{
    console.log(req.user.picture)
    const tasks=await Task.findAll({
        where:{
            userId:req.user.id,
        },
        order: [['due_date', 'ASC']]
      })
    res.render('some',{tasks:tasks,user:req.user})
}

exports.addTask=async (req,res)=>{
    const{task,dueDate}=req.body
    const data={
        task:task,
        due_date:new Date(dueDate).toString(),
        userId:req.user.id,
    }
    if(new Date(dueDate)<new Date()){
        data.status="Missed"
    }
    await Task.create(data)
    res.redirect('/todo/all')
}

exports.showMissedTask= async (req,res)=>{
    const tasks = await Task.findAll({
        where: {
        userId:req.user.id,
        status: "Missed",
        },
        order: [['due_date', 'ASC']],
      });
    res.render('some',{tasks:tasks,user:req.user})
}

exports.showPendingTask= async (req,res)=>{
    const tasks=await Task.findAll({
        where:{
            userId:req.user.id,
            status:"Pending",
        },
        order: [['due_date', 'ASC']],
    })
    res.render('some',{tasks:tasks,user:req.user})
}

exports.showCompletedTask= async (req,res)=>{
    const tasks=await Task.findAll({
        where:{
            userId:req.user.id,
            status:"Completed",
        },
        order: [['due_date', 'ASC']],
    })
    res.render('some',{tasks:tasks,user:req.user})
}

exports.completeTask=async (req,res)=>{
    const taskId=req.params.taskId
    const completeTask=await Task.update({
        userId:req.user.id,
        status:"Completed"
    },{
        where:{
            id:taskId
        }
    })

    res.redirect('/todo/all')
}

exports.deleteTask=async (req,res)=>{
    const taskId=req.params.taskId
    const deleteTask=await Task.destroy({
        where:{
            userId:req.user.id,
            id:taskId
        }
    })
    res.redirect('/todo/all')
}
exports.googleLogin=(req,res)=>{
    
    console.log('see above')
    res.render('index')
}

exports.googleLogout=(req,res)=>{
    req.logOut((err) => {
        if (err) {
          console.error('Error while logging out:', err);
        }
        res.redirect('/');
      });
}

