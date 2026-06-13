import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { RabbitmqModule } from '@/infrastructure/rabbitmq/rabbitmq.module'
import { AccountsModule } from '@/modules/accounts/accounts.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { BalancesModule } from '@/modules/balances/balances.module'
import { BetsModule } from '@/modules/bets/bets.module'
import { BonusesModule } from '@/modules/bonuses/bonuses.module'
import { CrashModule } from '@/modules/crash/crash.module'
import { OddsModule } from '@/modules/odds/odds.module'
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
		RabbitmqModule,
		AuthModule,
		AccountsModule,
		UsersModule,
		BalancesModule,
		BetsModule,
		OddsModule,
		BonusesModule,
		CrashModule
	],
	controllers: [AppController]
})
export class AppModule {}
