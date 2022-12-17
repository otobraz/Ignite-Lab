import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NotificationsRepository } from '@application/repository/notifications-repository';
import { PrimaNotificationsRepository } from './prisma/repositories/prima-notifications-repository';

@Module({
   providers: [PrismaService, { provide: NotificationsRepository, useClass: PrimaNotificationsRepository }],
   exports: [NotificationsRepository],
})
export class DatabaseModule {}
