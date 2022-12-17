import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFoundError } from '@application/use-cases/errors/notification-not-found-error';
import { makeNotification } from '@factories/notification-factory';
import { UnreadNotification } from '@application/use-cases/unread-notification';

describe('Unread notification', () => {
   it('should be able to Unread a notification', async () => {
      const notificationsRepository = new InMemoryNotificationsRepository();
      const unreadNotification = new UnreadNotification(notificationsRepository);

      const notification = makeNotification({ readAt: new Date() });

      await notificationsRepository.create(notification);

      await unreadNotification.execute({
         notificationId: notification.id,
      });

      expect(notificationsRepository.notifications[0].readAt).toEqual(null);
   });

   it('should not be able to Unread a non existing notification', async () => {
      const notificationsRepository = new InMemoryNotificationsRepository();
      const unreadNotification = new UnreadNotification(notificationsRepository);

      expect(() => unreadNotification.execute({ notificationId: 'fake id' })).rejects.toThrow(NotificationNotFoundError);
   });
});
