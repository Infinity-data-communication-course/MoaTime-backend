import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { UserBaseInfo } from 'src/auth/type/user-base-info.type';
import { CheckEmailExistPayload } from './payload/check-email-exist.payload';
import { UserDto } from './dto/user.dto';

@Controller('user')
@ApiTags('User API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiOperation({ summary: '유저 탈퇴' })
  @ApiNoContentResponse()
  async deleteUser(@CurrentUser() user: UserBaseInfo): Promise<void> {
    return this.userService.deleteUser(user.id);
  }

  @Post('check-email')
  @ApiOperation({ summary: '이메일로 계정 존재 여부 체크' })
  @ApiOkResponse({ type: Boolean })
  async checkEmailExist(
    @Body() payload: CheckEmailExistPayload,
  ): Promise<boolean> {
    return this.userService.checkEmailExist(payload.email);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiOkResponse({ type: UserDto })
  async getUser(@CurrentUser() user: UserBaseInfo): Promise<UserDto> {
    return this.userService.getUser(user.id);
  }
}
