import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function swaggerCfg(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('Ciganov.net')
		.setDescription('Insane betting service with best odds')
		.setVersion('1.0')
		.setContact(
			'Zabrodin Vadim, Abramov Vadim, Vyukov Yaroslav, Siviy Dmitry, Okunev Kirill',
			'https://ciganov.net',
			'ciganov-net@gmail.com'
		)
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('/docs', app, document, {
		jsonDocumentUrl: 'openapi.json',
		yamlDocumentUrl: 'openapi.yaml'
	})
}
