import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowList = ['http://localhost:3000'];

  const corsOptionsDelegate = (req: Request, callback: any) => {
    const origin = req.headers['origin']; 
    const corsOptions = {
      origin: !origin || allowList.includes(origin),
      credentials: true,
    };
    callback(null, corsOptions);
  };
  //enable cors
  app.enableCors(corsOptionsDelegate);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
