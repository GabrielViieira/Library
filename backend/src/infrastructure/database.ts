import mongoose from 'mongoose'

export async function connectDB() {
   await mongoose.connect(process.env.MONGODB_URL!)
      .then(() => console.log("Conectado ao MongoDB"))
      .catch((err) => console.error(err))
}