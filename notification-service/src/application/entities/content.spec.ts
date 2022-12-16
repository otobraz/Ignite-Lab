import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content("You've gotten a new friend request");

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('You')).toThrow();
  });

  it('should not be able to create a notification content with with more than characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
