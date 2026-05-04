import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '@/modules/auth/auth.module'

import { AppController } from './app.controller'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [],
			envFilePath: [
				`.env.${process.env.NODE_ENV}.local`,
				`.env.${process.env.NODE_ENV}`,
				'.env'
			]
		}),
		AuthModule
	],
	providers: [AppController]
})
export class AppModule {}
