const express = require('express');
const app = express();
const path = require('path');
const Sequelize = require('sequelize');
const {UUID, UUIDV4, STRING} = Sequelize;

app.use(express.json())
app.use('/dist', express.static('dist'));
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 3000;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers-choice-react-redux')


app.get('/api/items',async(req,res,next) => {
  try{
    res.send(await Item.findAll())
  }
  catch(e){
    next(e);
  }
})

app.get('/api/items/:itemId',async(req,res,next) => {
  try{
    res.send(await Item.findAll({
      where: [
        {
          id: req.params.itemId
        }
      ]
    }
    ))
  }
  catch(e){
    next(e);
  }
})

app.post('/api/items',async(req,res,next)=>{
  try{
    const response = await Item.create(req.body);
    res.status(201).send(response)
  }
  catch(e){
    next(e)
  }
})

app.delete('/api/items/:id',async(req,res,next) => {
  try{
    const deleted = await Item.findByPk(req.params.id);
    deleted.destroy();
    res.sendStatus(204);
  }
  catch(e){
    next(e)
  }
})

const Item = conn.define('item',{
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING
    }
  }
)

const init = async()=> {
  try {
    await conn.sync({force:true})
    const [sugar, booger, cooker, looker, crooker] = await Promise.all([
      Item.create({name: 'sugar'}),
      Item.create({name: 'booger'}),
      Item.create({name: 'cooker'}),
      Item.create({name: 'looker'}),
      Item.create({name: 'crooker'}),
    ]);
    console.log('I think seeded?')
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(e){
    console.log(e)
  }
}

init();
