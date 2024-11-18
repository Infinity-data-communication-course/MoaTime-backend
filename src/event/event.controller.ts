import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EventService } from './event.service';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { EventDto } from './dto/event.dto';
import { UserBaseInfo } from 'src/auth/type/user-base-info.type';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { InviteUserPayload } from './payload/invite-user-to-event.payload';
import { CreateEventPayload } from './payload/create-event.payload';

@Controller('event')
@ApiTags('Event API')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '이벤트를 생성합니다' })
  @ApiCreatedResponse({ type: EventDto })
  async createEvent(
    @Body() payload: CreateEventPayload,
    @CurrentUser() user: UserBaseInfo,
  ): Promise<EventDto> {
    return this.eventService.createEvent(payload, user);
  }

  @Post(':eventId/invite')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저를 이벤트에 초대합니다.' })
  @HttpCode(204)
  @ApiNoContentResponse()
  async inviteUser(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() payload: InviteUserPayload,
    @CurrentUser() host: UserBaseInfo,
  ): Promise<void> {
    return this.eventService.inviteUser(eventId, payload.userId, host);
  }

  @Patch(':eventId/join')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '이벤트에 참여합니다.(초대 수락)' })
  @HttpCode(204)
  @ApiNoContentResponse()
  async joinEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @CurrentUser() user: UserBaseInfo,
  ): Promise<void> {
    return this.eventService.joinEvent(eventId, user);
  }

  @Patch(':eventId/refuse')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '이벤트 참여를 거절합니다.(초대 거절)' })
  @HttpCode(204)
  @ApiNoContentResponse()
  async refuseEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @CurrentUser() user: UserBaseInfo,
  ): Promise<void> {
    return this.eventService.refuseEvent(eventId, user);
  }

  @Delete(':eventId/exit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '이벤트에서 나가거나 이벤트 초대를 삭제합니다.' })
  @HttpCode(204)
  @ApiNoContentResponse()
  async exitEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @CurrentUser() user: UserBaseInfo,
  ): Promise<void> {
    return this.eventService.exitEvent(eventId, user);
  }

  @Delete(':eventId/delete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'host가 이벤트를 삭제합니다.' })
  @HttpCode(204)
  @ApiNoContentResponse()
  async deleteEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @CurrentUser() host: UserBaseInfo,
  ): Promise<void> {
    return this.eventService.deleteEvent(eventId, host);
  }
}
