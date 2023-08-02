import { expect, test } from '@playwright/test';

test('successful login redirects to the homepage', async ({ page }) => {
  // arrange
  await page.goto('http://localhost:5173/login/');

  // act, fill out the form with a valid login
  await page.getByPlaceholder('Email').fill('joey.test123@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('joey.test123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // assert
  await page.waitForURL('http://localhost:5173/');
  expect(page.getByText('conduit')).not.toBeUndefined();
  expect(
    page.getByText('A place to share your knowledge.')
  ).not.toBeUndefined();
});

test('invalid login attempts display error messages', async ({ page }) => {
  // arrange, verify no error messages
  await page.goto('http://localhost:5173/login/');
  await expect(page.locator('.error-messages')).toHaveCount(1);
  await expect(page.locator('.error-messages')).toHaveText(['']);

  // act, fill out the form with a valid login
  await page.getByPlaceholder('Email').fill('joey.test123@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('not my password');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // assert, verify no redirect with error messages
  expect(page.url()).toBe('http://localhost:5173/login/');
  await expect(page.locator('.error-messages')).toHaveCount(1);
  await expect(page.locator('.error-messages')).toHaveText([
    'email or password is invalid',
  ]);
});
