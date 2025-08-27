import { Request, Response } from 'express';
import { prisma } from '../db';
import { Product, Category } from '../types';

export const addProduct = async (req: Request, res: Response) => {
  const { name, category, description, price, images, stock }: Product = req.body;

  if (!name || !category || !description || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const product = await prisma.product.create({
      data: {
        id: require('crypto').randomUUID(),
        name,
        category,
        description,
        price,
        images: images || [],
        stock: stock ?? 0,
      },
    });
    res.status(201).json({ message: 'Product added', id: product.id });
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: (error as Error).message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, description, price, images,stock }: Partial<Product> = req.body;

  try {
    const data: Partial<Product> = {};
    if (name) data.name = name;
    if (category) data.category = category;
    if (description) data.description = description;
    if (price) data.price = price;
    if (images) data.images = images;
    if (stock) data.stock = stock;
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const product = await prisma.product.update({
      where: { id },
      data,
    });
    res.json({ message: 'Product updated' });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(500).json({ error: 'Database error', details: (error as Error).message });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id },
    });
    res.json({ message: 'Product removed' });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(500).json({ error: 'Database error', details: (error as Error).message });
  }
};

export const searchProductsByCategory = async (req: Request, res: Response) => {
  const { category, name, limit = '10', skip = '0' } = req.query;

  // Validate limit and skip
  if (typeof limit !== 'string' || isNaN(parseInt(limit)) || parseInt(limit) < 0) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }
  if (typeof skip !== 'string' || isNaN(parseInt(skip)) || parseInt(skip) < 0) {
    return res.status(400).json({ error: 'Invalid skip parameter' });
  }

  try {
    if (name && category) {
      // Combined search with case-insensitive name using raw query
      const products = await prisma.$queryRaw`
        SELECT * FROM Product
        WHERE category = ${category}
        AND LOWER(name) LIKE LOWER(${`%${name}%`})
        LIMIT ${parseInt(limit)}
        OFFSET ${parseInt(skip)}
      `;
      return res.json(products);
    } else if (name) {
      // Name-only search with case-insensitive
      const products = await prisma.$queryRaw`
        SELECT * FROM Product
        WHERE LOWER(name) LIKE LOWER(${`%${name}%`})
        LIMIT ${parseInt(limit)}
        OFFSET ${parseInt(skip)}
      `;
      return res.json(products);
    } else if (category) {
      // Category-only search
      if (!['Laptops', 'Desktops', 'Accessories'].includes(category as string)) {
        return res.status(400).json({ error: 'Invalid category' });
      }
      const products = await prisma.product.findMany({
        where: { category: category as Category },
        take: parseInt(limit),
        skip: parseInt(skip),
      });
      return res.json(products);
    } else {
      // No filters, return all products with pagination
      const products = await prisma.product.findMany({
        take: parseInt(limit),
        skip: parseInt(skip),
      });
      return res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: (error as Error).message });
  }
};