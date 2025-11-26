import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.organisation.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch organisations' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Id has no value' });
  }

  try {
    const data = await prisma.organisation.findUnique({
      where: {
        id
      }
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch organisation' });
  }
};


export const createRecord = async (req: Request, res: Response) => {

  const { name, address, zipcode, city, country } = req.body

  if (!name || !address || !zipcode || !city || !country) {
    return res.status(400).json({ error: 'All data is required' });
  }

  try {
    const data = await prisma.organisation.create({
      data: { 
        name,
        address,
        zipcode: Number(zipcode),
        city,
        country
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
  const { name, address, zipcode, city, country } = req.body

  if (!id) {
    return res.status(400).json({ error: 'Id has no value' });
  }

  if (!name || !address || !zipcode || !city || !country) {
    return res.status(400).json({ error: 'All data is required' });
  }

  try {
    const data = await prisma.organisation.update({
      where: { id },
      data: {
        name,
        address,
        zipcode: Number(zipcode),
        city,
        country
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
    const data = await prisma.organisation.delete({
      where: { id }
    })
    res.status(200).json({ message: 'Record deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete record' });
  }
}