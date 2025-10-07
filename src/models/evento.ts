import mongoose, { Types } from "mongoose";


// Interface del documento Evento
export interface IEvento extends Document {
  titulo: string;
  descripcion: string;
  schedule: string;
  adress: string;
  capacidadMaxima?: number;
  apuntados: mongoose.Types.ObjectId[]; 
}
const eventoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    schedule: { type: String, required: true, trim: true }, // p.ej. "16:30 - 17:30"
    address: { type: String, trim: true }    ,
    capacidadMaxima: { type: Number, min: 1 },
    apuntados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
   
  },
  { timestamps: false, versionKey: false }
);

export interface IEvento {
  _id: Types.ObjectId;
  name: string;
  schedule: string;
  address?: string;
}

const Evento = mongoose.model('Evento', eventoSchema);
export default Evento;
