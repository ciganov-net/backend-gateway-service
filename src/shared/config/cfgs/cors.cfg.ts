import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ConfigService } from '@nestjs/config'

export function corsCfg(configService: ConfigService): CorsOptions {
	return {
		//TODO: remove origin true after test
		credentials: true,
		origin: true
	}
}
