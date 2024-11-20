// index.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.get('/products', async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// ... other CRUD operations

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.post('/products', async (req: Request, res: Response) => {
    const { name, description, variants, collections } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        variants: {
          create: variants,
        },
        collections: {
          connect: collections,
        },
      },
    });
    res.json(product);
  });

  app.get('/products/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(product);
  });

  app.put('/products/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, variants, collections } = req.body;
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        variants: {
          // Update or create variants
        },
        collections: {
          // Connect or disconnect collections
        },
      },
    });
    res.json(product);
  });

  app.delete('/products/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.sendStatus(204);
  });