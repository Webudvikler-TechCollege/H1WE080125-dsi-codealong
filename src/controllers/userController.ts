import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Id has no value' });
  }

  try {
    const data = await prisma.user.findUnique({
      where: {
        id
      }
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


export const createRecord = async (req: Request, res: Response) => {

  const { name, email, organisationId } = req.body

  if (!name || !email || !organisationId ) {
    return res.status(400).json({ error: 'All data is required' });
  }

  try {
    const data = await prisma.user.create({
      data: { 
        name,
        email,
        organisationId: Number(organisationId)
      }
    })

    return res.status(201).json(data);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { name, email, organisationId } = req.body

  if (!id) {
    return res.status(400).json({ error: 'Id has no value' });
  }

  if (!name || !email || !organisationId) {
    return res.status(400).json({ error: 'All data is required' });
  }

  try {
    const data = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        organisationId: Number(organisationId)
      }
    })
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Id has no value' });
  }

  try {
    const data = await prisma.user.delete({
      where: { id }
    })
    res.status(200).json({ message: 'Record deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete record' });
  }
}