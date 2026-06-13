import { Injectable } from '@nestjs/common'

@Injectable()
export class CrashService {
	public generateCoef(
		minMultiplier: number = 1.0,
		houseEdge: number = 0.05
	): number {
		const r = Math.random()
		const rawCoef = (1 - houseEdge) / (1 - r)
		const finalCoef = Math.max(minMultiplier, rawCoef)
		return Math.floor(finalCoef * 100) / 100
	}
}
