import { NotificationNotFoundError } from '@application/use-cases/errors/notification-not-found-error';
import { ReadNotification } from '@application/use-cases/read-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@factories/notification-factory';

describe('Read notification', () => {
   it('should be able to read a notification', async () => {
      const notificationsRepository = new InMemoryNotificationsRepository();
      const readNotification = new ReadNotification(notificationsRepository);

      const notification = makeNotification();

      await notificationsRepository.create(notification);

      await readNotification.execute({
         notificationId: notification.id,
      });

      expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
   });

   it('should not be able to read a non existing notification', async () => {
      const notificationsRepository = new InMemoryNotificationsRepository();
      const readNotification = new ReadNotification(notificationsRepository);

      expect(() => readNotification.execute({ notificationId: 'fake id' })).rejects.toThrow(NotificationNotFoundError);
   });
});
