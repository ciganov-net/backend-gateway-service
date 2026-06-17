import {
	GetEventsRequest_SortBy,
	OddServiceClient
} from '@ciganov/contracts/dist/gen/odd'
import { convertEnum, dateToProto } from '@ciganov/core'
import { Inject, Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

import {
	CreateCategoryRequest,
	CreateEventRequest,
	CreateOutcomeRequest,
	GetEventsQuery
} from './dto'

@Injectable()
export class OddsClientGrpc {
	private oddsService: OddServiceClient
	public constructor(
		@Inject('ODDS_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.oddsService = this.client.getService<OddServiceClient>('OddService')
	}

	public getCategories() {
		return this.oddsService.getCategories({})
	}

	public getCategory(id: string) {
		return this.oddsService.getCategory({
			id
		})
	}

	public createCategory(request: CreateCategoryRequest) {
		return this.oddsService.createCategory(request)
	}

	public getEvents(request: GetEventsQuery) {
		return this.oddsService.getEvents({
			outcomeTypes: request.outcomeTypes ?? [],
			orderBy: convertEnum(GetEventsRequest_SortBy, request.orderBy),
			skip: request.skip,
			take: request.take,
			search: request.search,
			maxCoefficient: request.maxCoefficient,
			minCoefficient: request.minCoefficient
		})
	}

	public createEvent(request: CreateEventRequest) {
		return this.oddsService.createEvent({
			categoryId: request.categoryId,
			name: request.name,
			status: request.status,
			start: dateToProto(request.start),
			end: dateToProto(request.end)
		})
	}

	public getEvent(id: string) {
		return this.oddsService.getEvent({ id })
	}

	public getEventByCategory(categoryId: string) {
		return this.oddsService.getEventsByCategory({ categoryId })
	}

	public switchEventLiveState(id: string) {
		return this.oddsService.switchEventLiveState({ id })
	}

	public createOutcome(request: CreateOutcomeRequest) {
		return this.oddsService.createOutcome(request)
	}

	public getOutcomeByEvent(eventId: string) {
		return this.oddsService.getOutcomeByEvent({ eventId })
	}

	public getRandomEvents(randomCount: number) {
		return this.oddsService.getRandomEvents({ randomCount })
	}
}
