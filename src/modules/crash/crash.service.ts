import { Injectable } from '@nestjs/common'

@Injectable()
export class CrashService {
	public generateCoef(
		minMultiplier: number = 1.0,
		houseEdge: number = 0.05
	): number {
		const r = Math.random()
		const finalCoef = Math.max(minMultiplier, r * 5.5 + 1.0 - houseEdge)
		return Math.floor(finalCoef * 100) / 100
	}
}
