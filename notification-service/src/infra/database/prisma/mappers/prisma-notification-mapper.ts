import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
   static toPrisma(notification: Notification) {
      return {
         id: notification.id,
         content: notification.content.value,
         category: notification.category,
         recipientId: notification.recipientId,
         readAt: notification.readAt,
         createdAt: notification.createdAt,
         canceledAt: notification.canceledAt,
      };
   }

   static toDomain(rawNotification: RawNotification): Notification {
      return new Notification(
         {
            category: rawNotification.category,
            content: new Content(rawNotification.content),
            recipientId: rawNotification.recipientId,
            readAt: rawNotification.readAt,
            canceledAt: rawNotification.canceledAt,
            createdAt: rawNotification.createdAt,
         },
         rawNotification.id,
      );
   }
}
