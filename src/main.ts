import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import { AppModule } from './core/app.module'
import './observability/tracing'
import { corsCfg, swaggerCfg } from './shared/config'
import { GrpcFilter } from './shared/filters'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)

	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			forbidNonWhitelisted: true
		})
	)
	app.enableCors(corsCfg(config))
	app.useGlobalFilters(new GrpcFilter())

	swaggerCfg(app)

	const port = config.getOrThrow<number>('HTTP_PORT')
	const host = config.getOrThrow<string>('HTTP_HOST')

	await app.listen(port)

	console.log(`🚀 Gateway started: ${host}:${port}`)
	console.log(`📚 Swagger: ${host}:${port}/docs`)
}
bootstrap()
