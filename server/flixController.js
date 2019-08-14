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
}