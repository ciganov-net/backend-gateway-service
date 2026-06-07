import { protoToDate } from '@ciganov/core'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query
} from '@nestjs/common'
import {
	ApiExtraModels,
	ApiOkResponse,
	ApiOperation,
	ApiQuery
} from '@nestjs/swagger'
import { lastValueFrom } from 'rxjs'

import { Protected } from '@/shared/decorators'

import {
	CategoryResponse,
	CreateCategoryRequest,
	CreateCategoryResponse,
	CreateEventRequest,
	CreateEventResponse,
	CreateOutcomeRequest,
	CreateOutcomeResponse,
	EventResponse,
	GetEventsQuery,
	GetRandomEventsRequest,
	OutcomeResponse,
	SwitchEventStateResponse
} from './dto'
import { OddsClientGrpc } from './odds.grpc'

@Controller('odds')
export class OddsController {
	constructor(private readonly client: OddsClientGrpc) {}

	@ApiOperation({
		summary: 'Get categories',
		description: 'Get all event categories'
	})
	@ApiOkResponse({
		type: [CategoryResponse]
	})
	@Protected()
	@Get('categories')
	@HttpCode(HttpStatus.OK)
	async getCategories(): Promise<CategoryResponse[]> {
		const response = await lastValueFrom(this.client.getCategories())
		return response?.categories
	}

	@ApiOperation({
		summary: 'Get category',
		description: 'Get event category by id'
	})
	@ApiOkResponse({
		type: CategoryResponse
	})
	@Protected()
	@Get('category/:id')
	@HttpCode(HttpStatus.OK)
	async getCategory(@Param('id') id: string): Promise<CategoryResponse> {
		const response = await lastValueFrom(this.client.getCategory(id))
		return response?.category
	}

	@ApiOperation({
		summary: 'Create category',
		description: 'Create event category'
	})
	@ApiOkResponse({
		type: CreateCategoryResponse
	})
	@Protected()
	@Post('category')
	@HttpCode(HttpStatus.OK)
	async createCategory(
		@Body() dto: CreateCategoryRequest
	): Promise<CreateCategoryResponse> {
		return await lastValueFrom(this.client.createCategory(dto))
	}

	@ApiOperation({
		summary: 'Create event',
		description: 'Create event'
	})
	@ApiOkResponse({
		type: CreateEventResponse
	})
	@Protected()
	@Post('event')
	@HttpCode(HttpStatus.OK)
	async createEvent(
		@Body() dto: CreateEventRequest
	): Promise<CreateEventResponse> {
		return await lastValueFrom(this.client.createEvent(dto))
	}

	@ApiOperation({
		summary: 'Get events',
		description: 'Get all events'
	})
	@ApiOkResponse({
		type: [EventResponse]
	})
	@Protected()
	@Get('events')
	@HttpCode(HttpStatus.OK)
	async getEvents(@Query() query: GetEventsQuery): Promise<EventResponse[]> {
		const response = await lastValueFrom(this.client.getEvents(query))
		return response.events.map(value => ({
			id: value.id,
			categoryId: value.categoryId,
			isLive: value.isLive,
			name: value.name,
			outcomes: value.outcomes,
			status: value.status,
			start: protoToDate(value.start),
			end: protoToDate(value.end),
			badgeColor: value.badgeColor,
			categoryTitle: value.categoryTitle
		}))
	}

	@ApiOperation({
		summary: 'Get event',
		description: 'Get event by id'
	})
	@ApiOkResponse({
		type: EventResponse
	})
	@Protected()
	@Get('event/:id')
	@HttpCode(HttpStatus.OK)
	async getEvent(@Param('id') id: string): Promise<EventResponse> {
		const response = await lastValueFrom(this.client.getEvent(id))
		return {
			id: response.event.id,
			name: response.event.name,
			categoryId: response.event.categoryId,
			isLive: response.event.isLive,
			status: response.event.status,
			outcomes: response.event.outcomes,
			start: protoToDate(response.event.start),
			end: protoToDate(response.event.end),
			badgeColor: response.event.badgeColor,
			categoryTitle: response.event.categoryTitle
		}
	}

	@ApiOperation({
		summary: 'Get events by category',
		description: 'Get events by category'
	})
	@ApiOkResponse({
		type: [EventResponse]
	})
	@Protected()
	@Get('event/by-category/:id')
	@HttpCode(HttpStatus.OK)
	async getEventsByCategory(@Param('id') id: string): Promise<EventResponse[]> {
		const response = await lastValueFrom(this.client.getEventByCategory(id))
		return response?.events?.map(event => ({
			id: event.id,
			name: event.name,
			categoryId: event.categoryId,
			isLive: event.isLive,
			status: event.status,
			outcomes: event.outcomes,
			start: protoToDate(event.start),
			end: protoToDate(event.end),
			badgeColor: event.badgeColor,
			categoryTitle: event.categoryTitle
		}))
	}

	@ApiOperation({
		summary: 'Switch event state',
		description: 'Switch event state to another'
	})
	@ApiOkResponse({
		type: SwitchEventStateResponse
	})
	@Protected()
	@Get('event/switch/:id')
	@HttpCode(HttpStatus.OK)
	async switchEventState(
		@Param('id') id: string
	): Promise<SwitchEventStateResponse> {
		return await lastValueFrom(this.client.switchEventLiveState(id))
	}

	@ApiOperation({
		summary: 'Create outcome',
		description: 'Create outcome'
	})
	@ApiOkResponse({
		type: CreateOutcomeResponse
	})
	@Protected()
	@Post('outcome')
	@HttpCode(HttpStatus.OK)
	async createOutcome(
		@Body() dto: CreateOutcomeRequest
	): Promise<CreateOutcomeResponse> {
		return await lastValueFrom(this.client.createOutcome(dto))
	}

	@ApiOperation({
		summary: 'Get outcomes by event',
		description: 'Get outcomes by event id'
	})
	@ApiOkResponse({
		type: [OutcomeResponse]
	})
	@Protected()
	@Get('outcome/by-event/:id')
	@HttpCode(HttpStatus.OK)
	async getOutcomesByEventId(
		@Param('id') eventId: string
	): Promise<OutcomeResponse[]> {
		const response = await lastValueFrom(this.client.getOutcomeByEvent(eventId))
		return response?.outcomes
	}

	@ApiOperation({
		summary: 'Get random events',
		description: 'Get random events by count'
	})
	@ApiOkResponse({
		type: [EventResponse]
	})
	@Protected()
	@Get('event/random/:randomCount')
	@HttpCode(HttpStatus.OK)
	async getRandomEvents(
		@Param('randomCount') randomCount: number
	): Promise<EventResponse[]> {
		const response = await lastValueFrom(
			this.client.getRandomEvents(randomCount)
		)
		return response.events.map(event => ({
			id: event.id,
			name: event.name,
			categoryId: event.categoryId,
			isLive: event.isLive,
			status: event.status,
			outcomes: event.outcomes,
			start: protoToDate(event.start),
			end: protoToDate(event.end),
			badgeColor: event.badgeColor,
			categoryTitle: event.categoryTitle
		}))
	}
}
