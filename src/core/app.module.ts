import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AccountsModule } from '@/modules/accounts/accounts.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { BalancesModule } from '@/modules/balances/balances.module'
import { BetsModule } from '@/modules/bets/bets.module'
import { UsersModule } from '@/modules/users/users.module'
import { ObservabilityModule } from '@/observability/observability.module'

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
		ObservabilityModule,
		AuthModule,
		AccountsModule,
		UsersModule,
		BalancesModule,
		BetsModule
	],
	controllers: [AppController]
})
export class AppModule {}
