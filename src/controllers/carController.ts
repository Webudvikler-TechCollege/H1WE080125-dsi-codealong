import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.car.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Id has no value' });
  }

  try {
    const data = await prisma.car.findUnique({
      where: {
        id
      }
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};


export const createRecord = async (req: Request, res: Response) => {

  const { category, brand, model, year, price, fueltype } = req.body

  if (!category || !brand || !model || !year || !price || !fueltype) {
    return res.status(400).json({ error: 'All data is required' });
  }

  try {
    const data = await prisma.car.create({
      data: {
        category,
        brand,
        model,
        year: Number(year),
        price,
        fueltype
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
  const { category, brand, model, year, price, fueltype } = req.body

  if (!id) {
    return res.status(400).json({ error: 'Id has no value' });
  }

  if (!category || !brand || !model || !year || !price || !fueltype) {
    return res.status(400).json({ error: 'All data is required' });
  }

  try {
    const data = await prisma.car.update({
      where: { id },
      data: {
        category,
        brand,
        model,
        year: Number(year),
        price,
        fueltype
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
    const data = await prisma.car.delete({
      where: { id }
    })
    res.status(200).json({ message: 'Record deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete record' });

  }

}