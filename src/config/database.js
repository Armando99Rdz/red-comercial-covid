import mongoose from "mongoose";
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.DB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
).then( db => {
  console.log('DB Connected Succesfuly');
}).catch( err => {
  console.log(err);
});

mongoose.set('useFindAndModify', false);