module.exports = {
    findFlix: async (req, res) => {
        const db = req.app.get("db");
        const flixList= await db.find_flix();
        res.status(200).send(flixList);
    },
    createFlix: async(req, res, next) => {
        console.log(req.body)
        const { flix_title, flix_image, flix_info, flix_priority } = req.body
        const {user_id} = req.session.user
        const db = req.app.get('db')
        const flixToAdd = await db.create_flix([user_id, flix_title, flix_info, flix_image, flix_priority])
        res.status(200).send(flixToAdd)
    },
    deleteFlix:(req, res) => {
        const db = req.app.get('db')
        const { id } = req.params;
        db.delete_flix(id).then (result => {
            res.status(200).send(result)
        }).catch(err => {
            console.log(err)
            res.status(400).send('you done messed up A-A-RON')
        })
      },
    updateFlix: async (req,res) => {
        try{const { flix_title, flix_info, flix_image } = req.body
        const { id } = req.params;
        const db = req.app.get('db')
        const flixToUpdate = await db.update_flix([flix_title, flix_info, flix_image, id])
        res.status(200).send(flixToUpdate)
    }
        catch
            {
                res.status(400).send('messed up while attempting to edit')
        }
        
    }
}