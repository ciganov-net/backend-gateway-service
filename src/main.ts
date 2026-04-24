import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import { AppModule } from './core/app.module'
import { corsCfg, swaggerCfg } from './shared/config'
import { GrpcFilter } from './shared/filters'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)

	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))
	app.enableCors(corsCfg(config))
	app.useGlobalFilters(new GrpcFilter())

	swaggerCfg(app)

	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
