const router = require("express").Router();
const { Blogpost } = require("../../models");
const authorize = require("../../utils/authorize");

router.post("/", authorize, async (req, res) => {
   const body = req.body;
   try {
     const post = await Blogpost.create({
       ...body,
       userID: req.session.user_id
     });
     res.status(200).json(post);
   } catch (err) {
     res.status(400).json(err);
   }
});

router.get('/:id', async (req, res) => {

   try {
      const postData = await Blogpost.findOne({
        where: {
          id: req.params.id,
        },
      });

      res.json(postData);


} catch (err) {
   res.status(500).json(err);
 }
});

router.put('/:id', authorize, (req, res) => {
   try { const updated = Blogpost.update({
         ...req.body,
         userID: req.session.user_id
      }, 
      {
         where: {
      id: req.params.id},
   });
   if (!updated) {
      res.status(404).json({
        message: `You're really trying to break me!`,
      });
      return;
    }
    res.status(200).json(updated);
} catch (err) {
   res.status(500).json(err);
 }
});

router.delete("/:id", authorize, async (req, res) => {
   try {
     const baleeted = await Blogpost.destroy({
       where: {
         id: req.params.id,
       },
     });
     if (!baleeted) {
       res.status(404).json({
         message: `You're really trying to break me!`,
       });
       return;
     }
     res.status(200).json(baleeted);
   } catch (err) {
     res.status(500).json(err);
   }
});

module.exports = router;