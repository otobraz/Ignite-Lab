import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repository/notifications-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrimaNotificationsRepository implements NotificationsRepository {
   constructor(private prismaService: PrismaService) {}

   async findById(notificationId: string): Promise<Notification | null> {
      const notification = await this.prismaService.notification.findUnique({ where: { id: notificationId } });

      if (!notification) return null;

      return PrismaNotificationMapper.toDomain(notification);
   }

   async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
      const notifications = await this.prismaService.notification.findMany({
         where: { recipientId: recipientId },
      });

      return notifications.map(PrismaNotificationMapper.toDomain);
      // return notifications.map((notifications) => PrismaNotificationMapper.toDomain(notifications));
   }

   async countManyByRecipientId(recipientId: string): Promise<number> {
      const count = await this.prismaService.notification.count({ where: { recipientId } });
      return count;
   }

   async create(notification: Notification): Promise<void> {
      const rawNotification = PrismaNotificationMapper.toPrisma(notification);

      await this.prismaService.notification.create({
         data: rawNotification,
      });
   }

   async save(notification: Notification): Promise<void> {
      const rawNotification = PrismaNotificationMapper.toPrisma(notification);
      console.log(rawNotification);
      await this.prismaService.notification.update({
         where: { id: rawNotification.id },
         data: rawNotification,
      });
   }
}
1;
