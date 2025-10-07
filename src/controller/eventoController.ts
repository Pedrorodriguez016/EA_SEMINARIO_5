import { Request, Response } from 'express';
import {
  createEvento,
  getAllEventos,
  getEventoById,
  updateEvento,
  deleteEvento,
  añadirUsuarioApuntado,
  quitarUsuarioApuntado
  
} from '../services/eventoServices';

export const createEventoHandler = async (req: Request, res: Response) => {
  try {
    const data = await createEvento(req.body);
    res.json(data); // si quieres 201: res.status(201).json(data)
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const añadirUsuarioApuntadoHandler = async (req: Request, res: Response) => {
  try {
    const { eventoId, usuarioId } = req.params;
    const evento = await añadirUsuarioApuntado(eventoId, usuarioId);
    
    res.status(200).json({
      success: true,
      message: 'Usuario añadido al evento correctamente',
      data: {
        eventoId: evento._id,
        usuarioId: usuarioId,
        titulo: evento.name,
        numeroApuntados: evento.apuntados.length,
        capacidadMaxima: evento.capacidadMaxima
      }
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const quitarUsuarioApuntadoHandler = async (req: Request, res: Response) => {
  try {
    const { eventoId, usuarioId } = req.params;
    const evento = await quitarUsuarioApuntado(eventoId, usuarioId);
    
    res.status(200).json({
      success: true,
      message: 'Usuario eliminado del evento correctamente',
      data: {
        eventoId: evento._id,
        titulo: evento.name,
        numeroApuntados: evento.apuntados.length,
        capacidadMaxima: evento.capacidadMaxima
      }
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const getAlleventoHandler = async (_req: Request, res: Response) => {
  try {
    const data = await getAllEventos();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventoByIdHandler = async (req: Request, res: Response) => {
  try {
    const data = await getEventoById(req.params.id);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEventoHandler = async (req: Request, res: Response) => {
  try {
    const data = await updateEvento(req.params.id, req.body);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEventoHandler = async (req: Request, res: Response) => {
  try {
    const data = await deleteEvento(req.params.id);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
