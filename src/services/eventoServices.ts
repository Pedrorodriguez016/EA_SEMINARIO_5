import Evento, { IEvento } from '../models/evento';
import Usuario, {IUsuario} from '../models/usuario';
export const createEvento = async (data: IEvento) => {
  const ev = new Evento(data);
  return await ev.save();
};

//export const getAllEventos = async () => {
//  return await Evento.find().sort({ createdAt: -1 });
//};


export const añadirUsuarioApuntado = async (eventoId: string, usuarioId: string) => {
  
  const evento = await Evento.findById(eventoId);
  if (!evento) throw new Error('Evento no encontrado');
  
  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) throw new Error('Usuario no encontrado');

  const yaApuntado = evento.apuntados.some(
    id => id.toString() === usuarioId
  );
  if (yaApuntado)  throw new Error('El usuario ya está apuntado a este evento');

  if (evento.capacidadMaxima && evento.apuntados.length >= evento.capacidadMaxima) throw new Error('El evento ha alcanzado su capacidad máxima');

  evento.apuntados.push(usuario._id);
  return await evento.save();
};

// Quitar un usuario de la lista de apuntados de un evento
export const quitarUsuarioApuntado = async (eventoId: string, usuarioId: string) => {
  const evento = await Evento.findById(eventoId);
  if (!evento) throw new Error('Evento no encontrado');

  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) throw new Error('Usuario no encontrado');

  if (!evento.apuntados.some(id => id.toString() === usuarioId)) {
    throw new Error('El usuario no está apuntado a este evento');
  }

 evento.apuntados = evento.apuntados.filter(
  id => id.toString() !== usuarioId
);
  return await evento.save();
};


//getAllEventos
export const getAllEventos = async () => {
  return await Evento.find();
};


export const getEventoById = async (id: string) => {
  return await Evento.findById(id);
};

export const updateEvento = async (id: string, data: Partial<IEvento>) => {
  return await Evento.findByIdAndUpdate(id, data, { new: true });
}

export const deleteEvento = async (id: string) => {
  return await Evento.deleteOne({ _id: id });
};
