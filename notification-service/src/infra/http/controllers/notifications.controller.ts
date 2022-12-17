import { Controller, Post } from '@nestjs/common';
import { Body, Get, Param, Patch } from '@nestjs/common/decorators';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
   // constructor(private readonly prisma: PrismaService) {}

   constructor(
      private sendNotification: SendNotification,
      private cancelNotification: CancelNotification,
      private readNotification: ReadNotification,
      private unreadNotification: UnreadNotification,
      private countRecipientNotifications: CountRecipientNotifications,
      private getRecipientNotifications: GetRecipientNotifications,
   ) {}

   @Patch(':id/cancel')
   async cancel(@Param('id') id: string) {
      await this.cancelNotification.execute({ notificationId: id });
   }

   @Get('count/from/:recipientId')
   async countFromRecipient(@Param('recipientId') id: string) {
      const { count } = await this.countRecipientNotifications.execute({ recipientId: id });
      return count;
   }

   @Get('from/:recipientId')
   async getFromRecipient(@Param('recipientId') id: string) {
      const { notifications } = await this.getRecipientNotifications.execute({ recipientId: id });
      return {
         notifications: notifications.map(NotificationViewModel.toHttp),
      };
   }

   @Patch(':id/read')
   async read(@Param('id') id: string) {
      console.log(id);
      await this.readNotification.execute({ notificationId: id });
   }

   @Patch(':id/unread')
   async unread(@Param('id') id: string) {
      await this.unreadNotification.execute({ notificationId: id });
   }

   @Post()
   async create(@Body() body: CreateNotificationBody) {
      const { recipientId, content, category } = body;

      const { notification } = await this.sendNotification.execute({ recipientId, content, category });

      return { notification: NotificationViewModel.toHttp(notification) };
   }
}
